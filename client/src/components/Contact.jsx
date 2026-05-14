import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaTerminal } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/10 text-accent-purple text-[10px] font-black uppercase tracking-widest mb-4">
            Command Center
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Initialize <span className="text-accent-purple">Project</span> Collaboration
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Direct Access</h3>
              <p className="text-text-secondary text-lg mb-8 font-medium leading-relaxed">
                Ready to optimize your infrastructure? Contact our engineering team for a full system audit and reliability assessment.
              </p>
            </div>
            
            <div className="space-y-8">
              {[
                { icon: <FaMapMarkerAlt />, label: 'Location', value: 'San Francisco, CA (HQ)' },
                { icon: <FaEnvelope />, label: 'Email', value: 'ops@mavisolution.com' },
                { icon: <FaPhoneAlt />, label: 'Direct Line', value: '+1 (555) 999-0100' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-border-glow flex items-center justify-center text-accent-purple text-xl group-hover:bg-accent-purple/10 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{item.label}</p>
                    <p className="text-white font-bold text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl border border-border-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FaTerminal size={80} />
            </div>
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Operator Name</label>
                  <input type="text" className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-purple outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Service Email</label>
                  <input type="email" className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-purple outline-none transition-all" placeholder="john@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-2">Message Protocol</label>
                <textarea rows="5" className="w-full bg-bg-primary border border-border-glow rounded-xl py-4 px-5 text-white focus:border-accent-purple outline-none transition-all" placeholder="Describe your infrastructure needs..."></textarea>
              </div>
              <button type="submit" className="w-full bg-accent-purple py-5 rounded-xl font-black text-white uppercase tracking-widest shadow-lg shadow-accent-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Execute Transmission
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
