import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    content: "MaviSolution transformed our cloud infrastructure into a seamless, automated platform. Their SRE expertise is unmatched in the industry.",
    author: "Jane Doe",
    role: "VP of Engineering, CloudScale",
  },
  {
    id: 2,
    content: "The reliability monitoring they implemented saved us from multiple critical failures during our peak traffic season. True lifesavers.",
    author: "John Smith",
    role: "Operations Director, InnovateInc",
  },
  {
    id: 3,
    content: "Transparent, highly technical, and exceptionally responsive. They aren't just a service provider; they are a critical part of our team.",
    author: "Alice Johnson",
    role: "CTO, FutureWorks",
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-bg-secondary border-y border-border-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 rounded-full border border-accent-green/30 bg-accent-green/10 text-accent-green text-[10px] font-black uppercase tracking-widest mb-4">
            Reliability Feedback
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Validated by <span className="text-accent-green">Industry</span> Leaders
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass-card p-10 rounded-3xl border border-border-glow relative group hover:border-accent-green/50 transition-all duration-500">
              <div className="text-accent-green mb-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <FaQuoteLeft size={32} />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-accent-green w-3 h-3" />)}
              </div>
              <p className="text-text-secondary italic mb-8 font-medium leading-relaxed">"{testimonial.content}"</p>
              <div>
                <p className="text-white font-black uppercase tracking-tight">{testimonial.author}</p>
                <p className="text-accent-green text-[10px] font-black uppercase tracking-widest mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
