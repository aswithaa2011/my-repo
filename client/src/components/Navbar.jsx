import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-brand-navy/90 backdrop-blur-md border-b border-brand-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-brand-accent">Mavi</span>Solution
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#about" className="hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
              <a href="#services" className="hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
              <a href="#projects" className="hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
              <a href="#contact" className="hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
