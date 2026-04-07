import { useState } from 'react';
import { spaServices } from '../data/spaData';
import ServiceCard from '../components/Card/ServiceCard';

const Services = () => {
 

  return (
    <div id="services" className="section-padding bg-neutral">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="mobile-heading font-serif font-bold text-[#2596be] mb-4">
            Our Services
          </h2>
          <p className="mobile-text text-[#2596be]/70 max-w-2xl mx-auto px-4">
            Discover our comprehensive range of therapeutic treatments designed to rejuvenate your mind, body, and soul
          </p>
        </div>

        {/* Services Grid */}
        <div className="mobile-grid">
          {spaServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* No Services Message */}
        {spaServices.length === 0 && (
          <div className="text-center py-12 px-4">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-[#2596be] mb-2">
              No services found
            </h3>
            <p className="text-[#2596be]/70">
              We're working on adding more services in this category. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
