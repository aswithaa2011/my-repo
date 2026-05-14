import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${id}`);
        setProject(res.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="pt-32 text-center text-white">Loading project details...</div>;
  if (!project) return <div className="pt-32 text-center text-danger">Project not found</div>;

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
      <Link to="/" className="text-accent-blue hover:text-accent-cyan mb-8 inline-block">&larr; Back to Portfolio</Link>
      
      <div className="glass-card overflow-hidden rounded-xl">
        {project.imageUrl && (
          <div className="w-full h-80 bg-bg-secondary relative">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-10">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-semibold">{project.category}</span>
            <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm">{project.status}</span>
            <span className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-full text-sm">{project.priority} Priority</span>
          </div>
          
          <h1 className="text-4xl font-extrabold text-white mb-6">{project.title}</h1>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 whitespace-pre-wrap">{project.description}</p>
          
          <div className="border-t border-border-glow pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-bg-primary border border-gray-700 text-gray-300 rounded-md text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {project.clientName && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Client</h3>
                <p className="text-white text-lg">{project.clientName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
