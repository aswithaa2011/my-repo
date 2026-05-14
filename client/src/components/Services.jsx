import React from 'react';
import { FaServer, FaCogs, FaShieldAlt, FaChartLine, FaCloud, FaNetworkWired } from 'react-icons/fa';

const services = [
  {
    title: 'Site Reliability Engineering',
    description: 'We ensure 99.99% availability using automated failovers, self-healing systems, and rigorous latency monitoring.',
    icon: <FaServer className="w-8 h-8" />
  },
  {
    title: 'Cloud Native DevOps',
    description: 'Streamlining CI/CD pipelines with Kubernetes and Terraform for lightning-fast deployments and infinite scalability.',
    icon: <FaCloud className="w-8 h-8" />
  },
  {
    title: '24/7 Managed Infrastructure',
    description: 'Global monitoring and instant incident response by our elite engineering team to eliminate downtime before it happens.',
    icon: <FaNetworkWired className="w-8 h-8" />
  },
  {
    title: 'Security & Compliance',
    description: 'Hardening your infrastructure with zero-trust architecture, continuous audits, and automated threat detection.',
    icon: <FaShieldAlt className="w-8 h-8" />
  },
  {
    title: 'Automation & Orchestration',
    description: 'Converting manual toil into automated efficiency with custom scripts and advanced orchestration logic.',
    icon: <FaCogs className="w-8 h-8" />
  },
  {
    title: 'Performance Monitoring',
    description: 'Deep visibility into your stack with custom observability dashboards and predictive analytics.',
    icon: <FaChartLine className="w-8 h-8" />
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full border border-accent-blue/30 bg-accent-blue/10 text-accent-blue text-[10px] font-black uppercase tracking-widest mb-4">
            System Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Engineering <span className="text-accent-blue">High-Performance</span> Platforms
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="glass-card p-10 rounded-3xl border border-border-glow hover:border-accent-green/50 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-24 h-24 bg-accent-green/10 blur-2xl rounded-full group-hover:bg-accent-green/20 transition-all"></div>
              <div className="text-accent-green mb-8 group-hover:scale-110 transition-transform duration-500 bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl">
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">{service.title}</h3>
              <p className="text-text-secondary leading-relaxed font-medium">
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
