import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories] = useState(['All', 'SRE', 'DevOps', 'Cloud', 'Automation', 'Security']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const url = activeCategory === 'All' 
        ? '/api/projects' 
        : `/api/projects?category=${activeCategory}`;
      const res = await axios.get(url);
      // Backend returns { projects, total, ... }
      setProjects(res.data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 bg-bg-primary min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-accent-blue/30 bg-accent-blue/10 text-accent-blue text-[10px] font-black uppercase tracking-widest mb-4">
            Infrastructure Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-8">
            Recent <span className="text-accent-blue">Deployments</span>
          </h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                    ? 'bg-accent-blue text-white border-accent-blue shadow-[0_0_15px_rgba(46,124,246,0.3)]' 
                    : 'bg-transparent text-text-secondary border-border-glow hover:border-accent-blue hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-text-secondary font-bold tracking-widest text-xs uppercase">Synchronizing Data...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-3xl border border-border-glow">
            <p className="text-text-secondary text-lg font-medium">No active deployments found in this sector.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <Link to={`/projects/${project._id}`} key={project._id} className="glass-card rounded-3xl border border-border-glow overflow-hidden hover:border-accent-blue/50 transition-all group flex flex-col">
                <div className="h-56 bg-bg-secondary overflow-hidden relative">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary/20 bg-bg-secondary">
                      <FaRocket size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-bg-primary/80 backdrop-blur text-[10px] font-black uppercase text-accent-cyan tracking-widest rounded-full border border-border-glow">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      project.status === 'Completed' ? 'border-success/30 text-success bg-success/10' : 'border-warning/30 text-warning bg-warning/10'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{project.priority || 'Medium'} Priority</span>
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-accent-blue transition-colors uppercase tracking-tight">{project.title}</h3>
                  <p className="text-text-secondary text-sm mb-6 flex-grow line-clamp-3 font-medium leading-relaxed">{project.description}</p>
                  
                  <div className="pt-6 border-t border-border-glow mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] font-bold bg-white/5 border border-border-glow text-text-secondary px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[10px] font-bold text-text-secondary px-2 py-1">+{project.techStack.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
