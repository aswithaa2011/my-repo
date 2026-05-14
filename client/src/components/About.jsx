import React from 'react';

const stats = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Projects Completed', value: '500+' },
  { label: 'Happy Clients', value: '250+' },
  { label: 'Team Members', value: '50+' },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#070b1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mb-12 lg:mb-0">
            <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-2">About Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl mb-6">
              Empowering Businesses with Innovative Technology
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              At MaviSolution, we are passionate about building digital products that make a difference. 
              Our mission is to help organizations of all sizes leverage the power of modern technology 
              to streamline operations, engage customers, and drive growth.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              With a team of seasoned developers, designers, and strategists, we deliver tailored 
              solutions that perfectly align with your business objectives.
            </p>
            <a href="#contact" className="inline-flex items-center text-brand-accent font-semibold hover:text-blue-400 transition-colors">
              Learn more about our team <span className="ml-2">&rarr;</span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-brand-navy p-6 rounded-lg border border-gray-800 text-center">
                <p className="text-4xl font-extrabold text-brand-accent mb-2">{stat.value}</p>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
