import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-bg-primary py-16 border-t border-border-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="text-2xl font-black tracking-tighter text-white flex items-center gap-1 mb-6">
              <span className="text-accent-green">MAVI</span>SOLUTION
            </a>
            <p className="text-text-secondary max-w-sm font-medium leading-relaxed">
              Architecting resilient digital foundations for the future. We bridge the gap between innovation and reliability through elite SRE managed services.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Protocol Index</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-text-secondary hover:text-accent-blue text-sm font-bold uppercase transition-colors">Infrastructure</a></li>
              <li><a href="#about" className="text-text-secondary hover:text-accent-blue text-sm font-bold uppercase transition-colors">Mission Overview</a></li>
              <li><a href="#services" className="text-text-secondary hover:text-accent-blue text-sm font-bold uppercase transition-colors">Capabilites</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-6 uppercase text-xs tracking-widest">Signal Access</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-text-secondary hover:text-accent-green transition-all transform hover:scale-110">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-accent-blue transition-all transform hover:scale-110">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-text-secondary hover:text-white transition-all transform hover:scale-110">
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border-glow pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">
            &copy; {new Date().getFullYear()} MaviSolution Systems. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <a href="#" className="text-text-secondary hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-secondary hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Service Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
