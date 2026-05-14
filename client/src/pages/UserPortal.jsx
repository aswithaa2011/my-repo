import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaLock, FaCheckCircle, FaRocket, FaClock } from 'react-icons/fa';

const UserPortal = () => {
  const { user, setUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [profileData, setProfileData] = useState({ fullName: user?.fullName || '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const res = await axios.get('/api/projects?limit=3');
        setProjects(res.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchUserProjects();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Logic for profile update endpoint would go here
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-blue/20 to-accent-cyan/20 border border-border-glow p-10 md:p-16">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <img src={user?.avatar} alt="avatar" className="w-32 h-32 rounded-full border-4 border-accent-green shadow-2xl shadow-accent-green/20" />
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
                Systems Online, <span className="text-accent-green">{user?.fullName.split(' ')[0]}</span>.
              </h1>
              <p className="text-lg text-text-secondary max-w-xl font-medium">
                Your console is active. You have access to view private infrastructure projects and manage your security protocols.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-accent-green/10 blur-3xl rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* User Projects */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3">
                <FaRocket className="text-accent-blue" /> Recommended Infrastructure
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(p => (
                <div key={p._id} className="glass-card rounded-2xl border border-border-glow p-6 group hover:border-accent-blue/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black uppercase text-accent-cyan tracking-widest">{p.category}</span>
                    <span className="text-xs font-bold text-accent-green flex items-center gap-1"><FaCheckCircle /> {p.status}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">{p.title}</h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.techStack.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-text-secondary">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Management */}
          <div className="space-y-8">
            <div className="glass-card rounded-2xl border border-border-glow p-8">
              <h2 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                <FaUser className="text-accent-blue" /> Identity
              </h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                {message.text && (
                  <div className={`p-3 rounded text-xs font-bold uppercase tracking-widest ${message.type === 'success' ? 'bg-success/10 text-success border border-success/30' : 'bg-danger/10 text-danger border border-danger/30'}`}>
                    {message.text}
                  </div>
                )}
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Display Name</label>
                  <input 
                    className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none transition-colors text-sm"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({ fullName: e.target.value })}
                  />
                </div>
                <button type="submit" className="w-full bg-accent-blue py-3 rounded-lg font-black text-white text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">
                  Update Console
                </button>
              </form>
            </div>

            <div className="glass-card rounded-2xl border border-border-glow p-8">
              <h2 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                <FaLock className="text-accent-blue" /> Security
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Current Key</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">New Security Key</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-bg-primary border border-border-glow rounded-lg py-3 px-4 text-white focus:border-accent-blue outline-none text-sm" />
                </div>
                <button className="w-full border border-accent-blue/30 text-accent-blue py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-accent-blue/10 transition-all">
                  Reset Credentials
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserPortal;
