import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-accent-green/5 blur-[120px]"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-green/30 bg-accent-green/10 mb-8">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse"></div>
          <span className="text-xs font-black tracking-[0.2em] text-accent-green uppercase">Reliability Protocols Active</span>
        </div>
        
        <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl mb-8 max-w-5xl leading-tight">
          We help startups and businesses achieve <span className="bg-gradient-to-r from-accent-green to-accent-cyan bg-clip-text text-transparent">99.99% uptime</span> with our SRE managed services.
        </h1>
        
        <p className="mt-4 max-w-2xl text-xl text-text-secondary mx-auto mb-10">
          Maxi Vision bridges the gap between Web Development and Site Reliability Engineering, ensuring your platforms never sleep.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <a href="#contact" className="px-8 py-4 border border-transparent text-base font-bold tracking-wider rounded-md text-bg-primary bg-gradient-to-r from-accent-green to-accent-cyan md:text-lg md:px-10 transition-all shadow-lg hover:shadow-accent-green/30 hover:scale-105">
            SECURE YOUR INFRASTRUCTURE
          </a>
          <a href="#services" className="px-8 py-4 border border-text-secondary text-base font-bold tracking-wider rounded-md text-white bg-transparent hover:border-white md:text-lg md:px-10 transition-all hover:scale-105">
            VIEW TOOLS
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
