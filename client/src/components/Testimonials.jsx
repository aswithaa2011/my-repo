import React from 'react';

const testimonials = [
  {
    id: 1,
    content: "MaviSolution transformed our outdated systems into a seamless digital platform. Their team's expertise and dedication to our project were unmatched.",
    author: "Jane Doe",
    role: "CEO, TechCorp",
  },
  {
    id: 2,
    content: "The custom mobile app they built for us significantly increased our customer engagement. I highly recommend their services to anyone looking for top-notch tech solutions.",
    author: "John Smith",
    role: "Marketing Director, InnovateInc",
  },
  {
    id: 3,
    content: "From start to finish, the process was smooth and transparent. They delivered on time and within budget, exceeding our expectations.",
    author: "Alice Johnson",
    role: "CTO, FutureWorks",
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-[#070b1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-2">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            What Our Clients Say
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-brand-navy p-8 rounded-xl border border-gray-800">
              <p className="text-gray-300 italic mb-6">"{testimonial.content}"</p>
              <div>
                <p className="text-white font-bold">{testimonial.author}</p>
                <p className="text-brand-accent text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
