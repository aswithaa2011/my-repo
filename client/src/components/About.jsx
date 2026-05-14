import React from 'react';

const stats = [
  { label: 'System Uptime', value: '99.99%' },
  { label: 'Deployments/Day', value: '1,000+' },
  { label: 'Critical Assets Managed', value: '25,000+' },
  { label: 'Engineers on Standby', value: '50+' },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 blur-[120px] rounded-full"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <div className="mb-16 lg:mb-0">
            <div className="inline-block px-3 py-1 rounded-full border border-accent-green/30 bg-accent-green/10 text-accent-green text-[10px] font-black uppercase tracking-widest mb-6">
              Protocol: Mission Overview
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-8 leading-none">
              Bridging the gap between <span className="text-accent-green">Development</span> and <span className="text-accent-blue">Reliability</span>
            </h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed font-medium">
              MaViSolution is an elite engineering firm specialized in Cloud Infrastructure and Site Reliability Engineering. We don't just build software; we architect the resilient foundations that modern digital businesses depend on.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed mb-10 font-medium">
              Our philosophy is simple: Eliminate manual toil through intelligent automation. We empower organizations to scale their infrastructure without scaling their overhead.
            </p>
            <a href="#contact" className="inline-flex items-center gap-3 text-accent-green font-black uppercase tracking-widest text-xs hover:text-white transition-colors group">
              Establish Connection <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-8 rounded-3xl border border-border-glow text-center group hover:bg-white/5 transition-all">
                <p className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter group-hover:text-accent-green transition-colors">{stat.value}</p>
                <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
