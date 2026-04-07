import { useState, useEffect } from 'react';
import { spaInfo } from '../data/spaData';
import { MdOutlineWhatsapp } from "react-icons/md";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides = [
  {
    id: 1,
    image: "/images/heroimg/1.jpg",
    heading: "Best Spa in  Panjim",
    description:
      "Enjoy 20% OFF on your first visit! Premium spa therapies in a private, relaxing atmosphere."
  },
  {
    id: 2,
    image: "/images/heroimg/2.jpg",
    heading: "Bangkok Style Massage",
    description:
      "Authentic Bangkok massage with exclusive festive offers. 100% safe, hygienic & discreet service."
  },
  {
    id: 3,
    image: "/images/heroimg/3.jpg",
    heading: "Expert Spa Therapists",
    description:
      "Trained therapists ,Personalized care ,Assured privacy. Book now & claim special package discounts."
  }
];

  // Check if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in booking an appointment at Auric Spa Panjim. Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/${spaInfo.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${spaInfo.phone.replace(/\s/g, '')}`, '_self');
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${slide.image}')`
              }}
            >
              {/* Light overlay for text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-7xl md:text-8xl font-serif font-black mb-6 leading-tight whitespace-nowrap">
                  {slide.heading}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 text-neutral max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button 
                    onClick={handleWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium h-12 w-48 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    <span><MdOutlineWhatsapp /></span>
                    WhatsApp
                  </button>
                  <button 
                    onClick={handleCall}
                    className="bg-[#2596be] hover: text-white font-medium h-12 w-48 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg"
                  >
                    <span>📞</span>
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons - Only for non-mobile devices */}
        {!isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
