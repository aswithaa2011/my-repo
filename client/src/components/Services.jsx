import React from 'react';
import { FaCode, FaMobileAlt, FaCloud, FaPaintBrush, FaRobot, FaServer } from 'react-icons/fa';

const services = [
  {
    title: 'Web Development',
    description: 'Custom, responsive websites and web applications built with modern frameworks.',
    icon: <FaCode className="w-8 h-8" />
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: <FaMobileAlt className="w-8 h-8" />
  },
  {
    title: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure setup and migration services.',
    icon: <FaCloud className="w-8 h-8" />
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and engaging user interfaces designed for optimal user experience.',
    icon: <FaPaintBrush className="w-8 h-8" />
  },
  {
    title: 'AI/ML Solutions',
    description: 'Intelligent systems and predictive analytics to automate your business processes.',
    icon: <FaRobot className="w-8 h-8" />
  },
  {
    title: 'DevOps Services',
    description: 'Streamlined CI/CD pipelines and infrastructure as code implementations.',
    icon: <FaServer className="w-8 h-8" />
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-brand-navy border-t border-brand-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-2">Our Expertise</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Services We Offer
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-brand-navy p-8 rounded-xl border border-gray-800 hover:border-brand-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-brand-accent/10 group"
            >
              <div className="text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
