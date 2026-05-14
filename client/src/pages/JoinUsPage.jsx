import React, { useState } from 'react';
import axios from '../utils/axios';
import { FaPaperPlane, FaBriefcase, FaCode, FaShieldAlt, FaCloud, FaTerminal } from 'react-icons/fa';

const positions = [
  { id: 'sre', title: 'SRE Engineer', icon: <FaTerminal />, description: 'Build and maintain 99.99% uptime systems.' },
  { id: 'devops', title: 'DevOps Specialist', icon: <FaCloud />, description: 'Automate CI/CD pipelines and infrastructure.' },
  { id: 'security', title: 'Security Analyst', icon: <FaShieldAlt />, description: 'Hardening protocols and threat detection.' },
  { id: 'fullstack', title: 'Full Stack Developer', icon: <FaCode />, description: 'Building high-performance user interfaces.' }
];

const JoinUsPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    position: 'SRE Engineer',
    resumeLink: '',
    experience: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/jobs/apply', formData);
      setStatus({ type: 'success', text: res.data.message });
      setFormData({
        fullName: '',
        email: '',
        position: 'SRE Engineer',
        resumeLink: '',
        experience: '',
        message: ''
      });
    } catch (error) {
      setStatus({ type: 'error', text: error.response?.data?.message || 'Submission failed.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-[10px] font-black uppercase tracking-widest mb-4">
            Recruitment Protocol
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Join the <span className="text-accent-cyan">Elite</span> Engineering Force
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-medium">
            We are looking for engineers who breathe reliability and dream in automation. Initialize your application below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Positions List */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-10 flex items-center gap-3">
              <FaBriefcase className="text-accent-cyan" /> Open Slots
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {positions.map(pos => (
                <div key={pos.id} className="glass-card p-8 rounded-2xl border border-border-glow group hover:border-accent-cyan/50 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-accent-cyan text-xl group-hover:bg-accent-cyan/10 transition-all">
                      {pos.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">{pos.title}</h3>
                      <p className="text-text-secondary text-sm font-medium">{pos.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-2xl bg-accent-cyan/5 border border-accent-cyan/20">
              <p className="text-text-secondary text-sm font-medium italic">
                "Don't see your position? Apply as a Generalist and tell us why you're a fit for MaViSolution."
              </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="glass-card p-10 rounded-3xl border border-border-glow relative">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Transmission Form</h2>
            
            {status.text && (
              <div className={`mb-6 p-4 rounded-xl text-xs font-black uppercase tracking-widest border ${
                status.type === 'success' ? 'bg-success/10 text-success border-success/30' : 'bg-danger/10 text-danger border-danger/30'
              }`}>
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Full Identity</label>
                  <input 
                    name="fullName" required value={formData.fullName} onChange={handleInputChange}
                    className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-cyan outline-none transition-all" 
                    placeholder="Operator Name" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Signal Address</label>
                  <input 
                    name="email" type="email" required value={formData.email} onChange={handleInputChange}
                    className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-cyan outline-none transition-all" 
                    placeholder="email@company.com" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Target Position</label>
                  <select 
                    name="position" value={formData.position} onChange={handleInputChange}
                    className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-cyan outline-none transition-all appearance-none"
                  >
                    {positions.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Years Active</label>
                  <input 
                    name="experience" type="number" required value={formData.experience} onChange={handleInputChange}
                    className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-cyan outline-none transition-all" 
                    placeholder="Experience in years" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Resume Signal (Link)</label>
                <input 
                  name="resumeLink" required value={formData.resumeLink} onChange={handleInputChange}
                  className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-cyan outline-none transition-all" 
                  placeholder="Drive/Dropbox/PDF link" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Additional Protocols (Message)</label>
                <textarea 
                  name="message" rows="4" value={formData.message} onChange={handleInputChange}
                  className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-cyan outline-none transition-all" 
                  placeholder="Why should we select you for the elite force?"
                ></textarea>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-accent-cyan py-5 rounded-xl font-black text-white uppercase tracking-widest shadow-lg shadow-accent-cyan/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {loading ? 'Transmitting...' : <><FaPaperPlane /> Execute Application</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;
