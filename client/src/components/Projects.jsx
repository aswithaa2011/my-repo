import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['All', 'Web', 'Mobile', 'Cloud', 'AI/ML', 'DevOps']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web',
    techStack: '',
    status: 'Ongoing',
    clientName: '',
    imageUrl: ''
  });

  const fetchProjects = async () => {
    try {
      const url = activeCategory === 'All' 
        ? 'http://localhost:5000/api/projects' 
        : `http://localhost:5000/api/projects?category=${activeCategory}`;
      const res = await axios.get(url);
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingId(project._id);
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        techStack: project.techStack.join(', '),
        status: project.status,
        clientName: project.clientName,
        imageUrl: project.imageUrl
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        category: 'Web',
        techStack: '',
        status: 'Ongoing',
        clientName: '',
        imageUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/projects/${editingId}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/projects', payload);
      }
      closeModal();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Check console for details.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Ongoing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'On Hold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="projects" className="py-20 bg-brand-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-2">Portfolio</h2>
            <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Projects & Services
            </p>
          </div>
          <button 
            onClick={() => openModal()} 
            className="mt-6 md:mt-0 flex items-center gap-2 bg-brand-accent hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-lg shadow-brand-accent/30"
          >
            <FaPlus /> Add New Project
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                activeCategory === cat 
                  ? 'bg-brand-accent text-white border-brand-accent' 
                  : 'bg-transparent text-gray-400 border-gray-700 hover:border-brand-accent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-[#070b1f] rounded-xl border border-gray-800">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project._id} className="bg-[#070b1f] rounded-xl border border-gray-800 overflow-hidden hover:border-brand-accent/50 transition-all group flex flex-col">
                <div className="h-48 bg-gray-800 overflow-hidden relative">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-brand-navy">No Image Available</div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => openModal(project)} className="p-2 bg-brand-navy/80 hover:bg-brand-accent text-white rounded-full backdrop-blur transition-colors">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="p-2 bg-brand-navy/80 hover:bg-red-500 text-white rounded-full backdrop-blur transition-colors">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{project.category}</span>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">{project.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs bg-brand-navy border border-gray-700 text-gray-300 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.clientName && (
                    <div className="pt-4 border-t border-gray-800 mt-auto">
                      <p className="text-sm text-gray-400">Client: <span className="text-white font-medium">{project.clientName}</span></p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-brand-navy border border-gray-800 rounded-xl w-full max-w-2xl shadow-2xl relative my-8">
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Project Title*</label>
                    <input required name="title" value={formData.title} onChange={handleInputChange} type="text" className="w-full bg-[#070b1f] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Description*</label>
                    <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-[#070b1f] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Category*</label>
                    <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#070b1f] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent">
                      <option value="Web">Web</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Cloud">Cloud</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-[#070b1f] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent">
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="On Hold">On Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Client Name</label>
                    <input name="clientName" value={formData.clientName} onChange={handleInputChange} type="text" className="w-full bg-[#070b1f] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                    <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} type="text" className="w-full bg-[#070b1f] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Tech Stack (comma separated)</label>
                    <input name="techStack" value={formData.techStack} onChange={handleInputChange} type="text" placeholder="React, Node.js, MongoDB" className="w-full bg-[#070b1f] border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent" />
                  </div>
                </div>
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
                  <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md font-medium text-gray-300 hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 rounded-md font-medium text-white bg-brand-accent hover:bg-blue-600 transition-colors shadow-lg shadow-brand-accent/20">
                    {editingId ? 'Update Project' : 'Save Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
