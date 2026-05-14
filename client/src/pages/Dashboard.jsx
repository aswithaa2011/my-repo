import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../hooks/useAuth';
import { 
  FaPlus, FaSearch, FaFilter, FaSort, FaEye, FaPencilAlt, 
  FaTrash, FaTimes, FaProjectDiagram, FaCheckCircle, 
  FaSync, FaUsers, FaBell, FaChevronRight 
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, ongoing: 0, byCategory: [] });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: 'All', status: 'All', priority: 'All' });
  const [sort, setSort] = useState({ field: 'createdAt', order: 'desc' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'SRE',
    techStack: [],
    status: 'Planning',
    priority: 'Medium',
    clientName: '',
    imageUrl: '',
    startDate: '',
    endDate: ''
  });
  const [techInput, setTechInput] = useState('');

  const fetchProjects = async () => {
    try {
      const params = {
        page,
        limit: 6,
        search,
        category: filters.category,
        status: filters.status,
        sort: sort.field,
        order: sort.order
      };
      const res = await axios.get('/api/projects', { params });
      setProjects(res.data.projects);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/projects/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, [page, search, filters, sort]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTechInput = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!formData.techStack.includes(techInput.trim())) {
        setFormData({ ...formData, techStack: [...formData.techStack, techInput.trim()] });
      }
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    setFormData({ ...formData, techStack: formData.techStack.filter(t => t !== tech) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await axios.put(`/api/projects/${editingProject._id}`, formData);
      } else {
        await axios.post('/api/projects', formData);
      }
      setIsDrawerOpen(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
      fetchStats();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (project) => {
    const confirm = window.prompt(`Type "${project.title}" to confirm deletion:`);
    if (confirm === project.title) {
      try {
        await axios.delete(`/api/projects/${project._id}`);
        fetchProjects();
        fetchStats();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'SRE',
      techStack: [],
      status: 'Planning',
      priority: 'Medium',
      clientName: '',
      imageUrl: '',
      startDate: '',
      endDate: ''
    });
    setEditingProject(null);
  };

  const openDrawer = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        techStack: project.techStack,
        status: project.status,
        priority: project.priority || 'Medium',
        clientName: project.clientName || '',
        imageUrl: project.imageUrl || '',
        startDate: project.startDate ? project.startDate.split('T')[0] : '',
        endDate: project.endDate ? project.endDate.split('T')[0] : ''
      });
    } else {
      resetForm();
    }
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r border-border-glow hidden lg:flex flex-col">
        <div className="p-6 border-b border-border-glow">
          <p className="text-xs font-black tracking-widest text-accent-green uppercase">Admin Suite</p>
          <h2 className="text-xl font-bold text-white">MaViSolution</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: 'home', name: 'Dashboard', icon: <FaProjectDiagram /> },
            { id: 'projects', name: 'Projects', icon: <FaSync /> },
            { id: 'users', name: 'Users', icon: <FaUsers /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-accent-blue/10 text-white border-l-4 border-accent-blue shadow-[0_0_15px_rgba(79,142,247,0.1)]' 
                  : 'text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="font-bold tracking-wide">{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-border-glow flex items-center gap-3">
          <img src={user?.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-accent-blue" />
          <div className="truncate">
            <p className="text-sm font-bold text-white truncate">{user?.fullName}</p>
            <p className="text-xs text-text-secondary uppercase">Administrator</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight capitalize">{activeTab} Overview</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-text-secondary hover:text-white transition-colors">
              <FaBell size={20} />
            </button>
            <button 
              onClick={() => openDrawer()}
              className="flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/80 text-white px-6 py-2 rounded font-black tracking-widest text-xs uppercase transition-all shadow-lg"
            >
              <FaPlus /> Quick Add
            </button>
          </div>
        </header>

        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Projects', value: stats.total, color: 'text-accent-blue', icon: <FaProjectDiagram /> },
                { label: 'Completed', value: stats.completed, color: 'text-accent-green', icon: <FaCheckCircle /> },
                { label: 'Ongoing', value: stats.ongoing, color: 'text-warning', icon: <FaSync /> },
                { label: 'Total Users', value: '12', color: 'text-accent-purple', icon: <FaUsers /> }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-xl border border-border-glow">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg bg-white/5 ${stat.color}`}>{stat.icon}</div>
                  </div>
                  <p className="text-4xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Projects */}
            <div className="glass-card rounded-xl border border-border-glow overflow-hidden">
              <div className="p-6 border-b border-border-glow flex justify-between items-center">
                <h3 className="font-black text-white uppercase tracking-widest text-sm">Recent Projects</h3>
                <button onClick={() => setActiveTab('projects')} className="text-xs font-bold text-accent-blue flex items-center gap-1">
                  View All <FaChevronRight />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-text-secondary text-xs uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-glow">
                    {projects.slice(0, 5).map(p => (
                      <tr key={p._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{p.title}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{p.category}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                            p.status === 'Completed' ? 'border-accent-green/30 text-accent-green bg-accent-green/10' :
                            p.status === 'Ongoing' ? 'border-warning/30 text-warning bg-warning/10' :
                            'border-text-secondary/30 text-text-secondary bg-text-secondary/10'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => openDrawer(p)} className="text-accent-blue hover:text-white transition-colors">
                            <FaPencilAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full bg-bg-secondary border border-border-glow rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-accent-blue"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="bg-bg-secondary border border-border-glow rounded-lg px-4 py-3 text-white text-sm"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="All">All Categories</option>
                  <option value="SRE">SRE</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cloud">Cloud</option>
                </select>
                <select 
                  className="bg-bg-secondary border border-border-glow rounded-lg px-4 py-3 text-white text-sm"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="All">All Status</option>
                  <option value="Planning">Planning</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="glass-card rounded-xl border border-border-glow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-text-secondary text-xs uppercase tracking-widest font-black">
                    <tr>
                      <th className="px-6 py-5">Project Details</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5">Priority</th>
                      <th className="px-6 py-5">Client</th>
                      <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-glow">
                    {projects.map(p => (
                      <tr key={p._id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-5">
                          <p className="font-black text-white group-hover:text-accent-blue transition-colors">{p.title}</p>
                          <p className="text-xs text-text-secondary mt-1">{p.category} • {p.techStack.slice(0, 3).join(', ')}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                            p.status === 'Completed' ? 'border-accent-green/30 text-accent-green bg-accent-green/10' :
                            p.status === 'Ongoing' ? 'border-warning/30 text-warning bg-warning/10' :
                            'border-text-secondary/30 text-text-secondary bg-text-secondary/10'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                            p.priority === 'Critical' ? 'border-danger/30 text-danger bg-danger/10' :
                            p.priority === 'High' ? 'border-orange-500/30 text-orange-500 bg-orange-500/10' :
                            'border-accent-blue/30 text-accent-blue bg-accent-blue/10'
                          }`}>
                            {p.priority || 'Medium'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-text-secondary">{p.clientName || 'Internal'}</td>
                        <td className="px-6 py-5 text-right space-x-3">
                          <button onClick={() => openDrawer(p)} className="text-text-secondary hover:text-accent-blue transition-colors"><FaPencilAlt /></button>
                          <button onClick={() => handleDelete(p)} className="text-text-secondary hover:text-danger transition-colors"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded font-black text-xs transition-all ${
                    page === i + 1 ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20' : 'bg-bg-secondary text-text-secondary hover:bg-white/5'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Slide-in Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="relative w-full max-w-xl bg-bg-secondary shadow-2xl h-full flex flex-col animate-slide-in">
            <div className="p-8 border-b border-border-glow flex justify-between items-center bg-bg-primary">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                {editingProject ? 'Edit Project' : 'New Project'}
              </h3>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-text-secondary hover:text-white">
                <FaTimes size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Project Title</label>
                  <input 
                    name="title" required value={formData.title} onChange={handleInputChange}
                    className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Description</label>
                  <textarea 
                    name="description" required rows="4" value={formData.description} onChange={handleInputChange}
                    className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none">
                      <option>SRE</option><option>DevOps</option><option>Cloud</option><option>Automation</option><option>Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleInputChange} className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none">
                      <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none">
                    <option>Planning</option><option>Ongoing</option><option>Completed</option><option>On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Tech Stack (Press Enter)</label>
                  <input 
                    placeholder="e.g. Kubernetes" onKeyDown={handleTechInput} value={techInput} onChange={(e) => setTechInput(e.target.value)}
                    className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.techStack.map(t => (
                      <span key={t} className="flex items-center gap-2 bg-accent-blue/10 text-accent-blue border border-accent-blue/20 px-3 py-1 rounded text-xs font-bold">
                        {t} <FaTimes className="cursor-pointer" onClick={() => removeTech(t)} />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Client Name</label>
                    <input name="clientName" value={formData.clientName} onChange={handleInputChange} className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-text-secondary uppercase tracking-widest mb-2">Image URL</label>
                    <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white outline-none" />
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-border-glow flex gap-4">
                <button type="submit" className="flex-grow bg-accent-blue py-4 rounded-lg font-black text-white uppercase tracking-widest shadow-lg shadow-accent-blue/20 hover:scale-[1.02] transition-all">
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
