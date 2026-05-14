import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#050814] py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
              <span className="text-brand-accent">Mavi</span>Solution
            </a>
            <p className="text-gray-400 max-w-sm">
              Delivering innovative digital solutions to propel your business forward. We build for the future.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-brand-accent transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-accent transition-colors">Services</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-brand-accent transition-colors">Projects</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} MaviSolution. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
