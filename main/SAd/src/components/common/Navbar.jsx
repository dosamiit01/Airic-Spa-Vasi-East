import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'offers', href: '#offers' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container-custom px-4">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/images/logo/5.png" 
              alt="Auric Spa Panjim" 
              className="h-12 sm:h-14 lg:h-16 object-contain"
            />
          </div>

          {/* Mobile View Button */}
          <div className="md:hidden">
            <button
              onClick={() => window.location.href = 'https://wa.me/918422862201'}
              className="bg-[#2596be] hover:from-accent hover:to-primary text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-1.5 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Now 
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`font-medium transition-colors duration-300 hover:text-secondary text-sm lg:text-base relative group ${
                  isScrolled ? 'text-[#2596be]' : 'text-white'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div> */}

          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() =>window.location.href="https://wa.me/918422862201"}
              className="bg-[#2596be] hover:from-accent hover:to-primary text-white font-medium py-2 lg:py-3 px-4 lg:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
