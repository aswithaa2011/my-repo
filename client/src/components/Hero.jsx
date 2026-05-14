import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-navy opacity-90"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-accent/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-accent/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
          <span className="block">Transforming Ideas into</span>
          <span className="block text-brand-accent mt-2">Digital Reality</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto mb-10">
          We provide cutting-edge IT and software solutions to help your business scale, innovate, and thrive in the digital era.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#contact" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-accent hover:bg-blue-600 md:py-4 md:text-lg md:px-10 transition-all shadow-lg shadow-brand-accent/30 hover:scale-105">
            Get Started
          </a>
          <a href="#services" className="px-8 py-3 border border-brand-accent text-base font-medium rounded-md text-brand-accent bg-transparent hover:bg-brand-accent/10 md:py-4 md:text-lg md:px-10 transition-all hover:scale-105">
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
