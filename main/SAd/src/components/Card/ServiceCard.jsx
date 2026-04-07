import { useState } from 'react';
import { spaInfo } from '../../data/spaData';

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in booking ${service.name} at Auric Spa Panjim. Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/${spaInfo.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${spaInfo.phone.replace(/\s/g, '')}`, '_self');
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    // Keep overlay visible for a moment on mobile to allow button interaction
    setTimeout(() => setIsHovered(false), 2000);
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-xl overflow-hidden card-hover border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Service Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img 
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-[#2596be] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
          {service.duration}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#2596be] px-3 py-1 rounded-full text-xs font-medium shadow-md z-10">
          {service.category}
        </div>

        {/* Hover Overlay with Buttons */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 flex flex-col justify-end z-10 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Description */}
          <div className="p-6 text-white">
            <p className="text-sm leading-relaxed mb-4 line-clamp-3">
              {service.description}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button 
                onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white font-medium h-12 w-48 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>Book on WhatsApp</span>
              </button>
              <button 
                onClick={handleCall}
                className="bg-[#2596be] hover:from-accent hover:to-primary text-white font-medium h-12 w-48 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>Call Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-serif font-bold text-[#2596be] leading-tight">
            {service.name}
          </h3>
          <div className="flex items-center text-[#2596be]">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-sm font-medium">Premium</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#2596be]/70">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-sm font-medium">{service.duration}</span>
          </div>
          
          <div className="flex items-center text-[#2596be]/70">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span className="text-sm font-medium">Relaxation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
