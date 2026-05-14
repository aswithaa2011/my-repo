import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-brand-navy border-t border-brand-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-2">Contact Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Let's Build Something Great Together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Have a project in mind or need expert advice? Reach out to us today. 
              Our team is ready to help you achieve your digital goals.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-brand-accent w-6 h-6 mt-1 mr-4" />
                <div>
                  <h4 className="text-white font-medium">Our Office</h4>
                  <p className="text-gray-400">123 Tech Boulevard, Suite 400<br/>San Francisco, CA 94107</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="text-brand-accent w-6 h-6 mt-1 mr-4" />
                <div>
                  <h4 className="text-white font-medium">Email Us</h4>
                  <p className="text-gray-400">info@mavisolution.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaPhoneAlt className="text-brand-accent w-6 h-6 mt-1 mr-4" />
                <div>
                  <h4 className="text-white font-medium">Call Us</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#070b1f] p-8 rounded-xl border border-gray-800">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input type="text" id="name" className="w-full bg-brand-navy border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input type="email" id="email" className="w-full bg-brand-navy border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea id="message" rows="4" className="w-full bg-brand-navy border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-accent text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
