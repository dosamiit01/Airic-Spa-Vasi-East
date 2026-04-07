import { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
// import VirtualTour from './components/VirtualTour';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/common/Footer';
import Popup from './components/Popup';
import Offers from './pages/Offers';
import MobileActionButtons from './components/MobileActionButtons';
import TestimonialCard from './components/Card/TestimonialCard';
import { testimonials } from './data/spaData';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Auto-show popup after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Home />
      {/* <VirtualTour></VirtualTour> */}
      <Services />
      <Offers />
            {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2596be] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-[#2596be]/70 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about their experience at Auric Spa Panjim.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* <Contact /> */}
      <Contact/> 
    
      
      {/* Popup Component */}
      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
        title="Book Your Appointment"
        message="Ready to experience ultimate relaxation? Choose your preferred way to get in touch with us."
      />
      
      {/* Mobile Action Buttons - Only visible on mobile */}
      <MobileActionButtons />
      
      {/* Desktop Floating Action Button - Only visible on desktop */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#2596be] hover:from-accent hover:to-primary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-40 flex items-center justify-center hidden md:flex"
        aria-label="Open booking popup"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  );
}

export default App;
