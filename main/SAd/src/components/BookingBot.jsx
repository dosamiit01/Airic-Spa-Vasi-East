import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, CheckCircle2, Clock, ArrowLeft, Loader2, Percent, Calendar, ListChecks } from 'lucide-react';

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzuPx8ZbtJpcV4odMv-WFnu2fwETGKIfPP3x7x7XsLNrL3_5OClObhAsRJRmYY4VN7i/exec";

const SECRET = "spaenquiriescodesabccdsdhdgfsh";

const GIRL_NAMES = ['Priya', 'Ananya', 'Kavya', 'Sneha', 'Meera', 'Riya', 'Aisha', 'Neha', 'Divya', 'Shreya'];

const SERVICES = [
  { 
    id: 1, 
    title: "Deep Tissue Massage", 
    price: "₹3,000", 
    priceRange: "₹3,000 - ₹4,000", 
    duration: "60-90 mins", 
    popular: true, 
    minPrice: 3000 
  },
  { 
    id: 2, 
    title: "Hot Stone Massage", 
    price: "₹3,200", 
    priceRange: "₹3,200 - ₹4,000", 
    duration: "75 mins", 
    popular: true, 
    minPrice: 3200 
  },
  { 
    id: 3, 
    title: "Full Body Massage", 
    price: "₹2,500", 
    priceRange: "₹2,500 - ₹3,500", 
    duration: "60 mins", 
    popular: false, 
    minPrice: 2500 
  },
  { 
    id: 4, 
    title: "Foot Reflexology", 
    price: "₹2,500", 
    priceRange: "₹2,500 - ₹3,000", 
    duration: "45 mins", 
    popular: false, 
    minPrice: 2500 
  },
  { 
    id: 5, 
    title: "Thai Massage", 
    price: "₹3,000", 
    priceRange: "₹3,000 - ₹4,000", 
    duration: "90 mins", 
    popular: true, 
    minPrice: 3000 
  },
  { 
    id: 6, 
    title: "Shahi Milk Bath", 
    price: "₹3,500", 
    priceRange: "₹3,500 - ₹4,000", 
    duration: "60 mins", 
    popular: false, 
    minPrice: 3500 
  },
  { 
    id: 7, 
    title: "Relaxation Aromatherapy Massage", 
    price: "₹2,800", 
    priceRange: "₹2,800 - ₹3,800", 
    duration: "75 mins", 
    popular: true, 
    minPrice: 2800 
  },
  { 
    id: 8, 
    title: "Female to Male Massage", 
    price: "₹2,700", 
    priceRange: "₹2,700 - ₹3,500", 
    duration: "60-90 mins", 
    popular: false, 
    minPrice: 2700 
  },
  { 
    id: 9, 
    title: "Hot Oil Massage", 
    price: "₹2,600", 
    priceRange: "₹2,600 - ₹3,500", 
    duration: "60 mins", 
    popular: false, 
    minPrice: 2600 
  },
];


const BookingBot = ({ isOpen: externalIsOpen, onClose: externalOnClose, botName: externalBotName, botImage: externalBotImage }) => {
  const [isOpen, setIsOpen] = useState(externalIsOpen || false);
  const [showPopup, setShowPopup] = useState(false);
  const [botName, setBotName] = useState(externalBotName || '');
  const [botImage, setBotImage] = useState(externalBotImage || '/BotImg/botai1-modified.png');
  const [currentView, setCurrentView] = useState('welcome');
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingData, setBookingData] = useState({ name: '', phone: '', services: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef(null);
  const hasShownPopupRef = useRef(false);

  useEffect(() => {
    if (!externalBotName) {
      const randomName = GIRL_NAMES[Math.floor(Math.random() * GIRL_NAMES.length)];
      setBotName(randomName);
    } else {
      setBotName(externalBotName);
    }
    if (externalBotImage) setBotImage(externalBotImage);
  }, [externalBotName, externalBotImage]);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
      if (externalIsOpen) {
        setShowPopup(false);
        setCurrentView('welcome');
        setTypingIndicator(true);
        setTimeout(() => setTypingIndicator(false), 800);
      }
    }
  }, [externalIsOpen]);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  useEffect(() => { if (isOpen) scrollToBottom(); }, [currentView, isOpen, typingIndicator]);

  const handleOpenChat = () => {
    setIsOpen(true); setShowPopup(false); setCurrentView('welcome');
    setTypingIndicator(true); setTimeout(() => setTypingIndicator(false), 800);
  };

  const handleCloseChat = () => {
    setIsOpen(false); setCurrentView('welcome'); setSelectedServices([]); setBookingData({ name: '', phone: '', services: '', message: '' });
    setSubmitStatus(null); externalOnClose?.();
  };

  const handleAction = (action) => {
    setTypingIndicator(true);
    setTimeout(() => {
      setTypingIndicator(false);
      if (action === 'claim-offer') { setCurrentView('booking'); }
      else if (action === 'book-now') setCurrentView('booking');
      else if (action === 'services-pricing') setCurrentView('services');
      scrollToBottom();
    }, 600);
  };

  const handleServiceSelect = (service) => {
    setSelectedServices(prev => prev.find(s => s.id === service.id) ? prev.filter(s => s.id !== service.id) : [...prev, service]);
  };

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''));

  // ---------- UPDATED: Submit booking to Google Apps Script ----------
  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    if (!bookingData.name.trim() || !bookingData.phone.trim()) {
      setSubmitStatus('error'); scrollToBottom(); return;
    }
    if (!validatePhone(bookingData.phone)) {
      setSubmitStatus('error-phone'); scrollToBottom(); return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const servicesList = selectedServices.length > 0
      ? selectedServices.map(s => s.title).join(', ')
      : bookingData.services || 'General Booking';

    const payload = {
      name: bookingData.name.trim(),
      phone: bookingData.phone.trim(),
      services: servicesList,
      message: bookingData.message.trim() || '-',
      pageUrl: window.location.href || '',
      source: 'Booking Bot - Arya Spa Andheri',
      secret: SECRET
    };

    try {
      // send to Google Apps Script - use no-cors for client -> Apps Script
      await fetch(WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      // we can't reliably read response in no-cors mode — assume success when fetch resolves
      // small delay to give Apps Script time to append row
      await new Promise(resolve => setTimeout(resolve, 700));

      setSubmitStatus('success');
      setCurrentView('success');
      setBookingData({ name: '', phone: '', services: '', message: '' });
      setSelectedServices([]);
      setTimeout(() => { setCurrentView('welcome'); setSubmitStatus(null); }, 5000);
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      scrollToBottom();
    }
  };
  // ------------------------------------------------------------------

  const handleBookFromServices = () => {
    if (selectedServices.length > 0) {
      setBookingData(prev => ({ ...prev, services: selectedServices.map(s => s.title).join(', ') }));
    }
    setTypingIndicator(true);
    setTimeout(() => { setTypingIndicator(false); setCurrentView('booking'); scrollToBottom(); }, 600);
  };

  const getTotalPrice = () => {
    if (!selectedServices.length) return null;
    const total = selectedServices.reduce((sum, s) => sum + s.minPrice, 0);
    return { original: total, final: total * 0.8 };
  };
  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Popup */}
      {showPopup && !isOpen && (
        <div className="fixed bottom-24 left-6 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-5 max-w-sm border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full blur-2xl opacity-50"></div>
            <button onClick={() => setShowPopup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"><X size={18} /></button>
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#814157] to-[#a85573] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {botName.charAt(0)}
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{botName}</p>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-green-500 rounded-full"></div><p className="text-xs text-gray-500 font-medium">Online now</p></div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">Hi! I'm here to help you book your perfect spa experience. Get <span className="font-bold text-[#814157]">20% OFF</span> today!</p>
            <button onClick={handleOpenChat} className="w-full bg-gradient-to-r from-[#814157] to-[#a85573] text-white py-3 px-5 rounded-xl font-bold hover:from-[#6b2c3b] hover:to-[#814157] transition-all flex items-center justify-center gap-2">
              <MessageCircle size={18} /> Start Chat
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && externalIsOpen === undefined && (
        <button onClick={handleOpenChat} className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-[#814157] to-[#a85573] text-white p-4 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-all group">
          <div className="relative">
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
            {!hasShownPopupRef.current && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>}
          </div>
          <span className="hidden sm:inline font-semibold ml-2">Book Now</span>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed top-2 left-2 right-2 bottom-2 xs:top-4 xs:left-4 xs:right-4 xs:bottom-4 sm:inset-auto sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto z-50 sm:w-full sm:max-w-md sm:h-[85vh] sm:max-h-[700px] bg-white rounded-xl xs:rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#814157] to-[#a85573] text-white p-3 xs:p-4 sm:p-5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3 min fuss-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden border-2 border-white/30 shadow-md">
                  <img src={botImage} alt={botName} className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<span class="flex items-center justify-center w-full h-full text-white font-bold text-xl">${botName[0]}</span>`; }} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-3 border-[#814157] animate-pulse"></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm xs:text-base sm:text-lg truncate">{botName}</p>
                <div className="flex items-center gap-1.5 mt-0.5"><div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div><p className="text-xs text-white/90">Online</p></div>
              </div>
            </div>
            <button onClick={handleCloseChat} className="text-white/90 hover:text-white p-2"><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 xs:p-4 sm:p-6 bg-gradient-to-b from-gray-50/50 via-white to-white">
            {/* All your views (welcome, services, booking, success) — FULL UI INCLUDED BELOW */}

            {/* WELCOME VIEW */}
            {currentView === 'welcome' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#814157] to-[#a85573] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">{botName[0]}</div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-[90%] border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Welcome to <span className="text-[#814157]">Arya Spa Andheri</span></h2>
                    <p className="text-gray-600 mb-3">I'm {botName}, your personal booking assistant.</p>
                    <div className="bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-300/60 rounded-xl p-4 mb-4">
                      <p className="text-3xl font-extrabold text-[#814157]">20% OFF</p>
                      <p className="text-sm text-gray-700">on all services today!</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <p className="text-xs text-blue-800"><strong>No advance payment</strong> — Pay at spa after service</p>
                    </div>
                    <p className="font-semibold text-gray-700">How would you like to proceed?</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-5">
                  <button onClick={() => handleAction('claim-offer')} className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 px-6 rounded-xl font-bold flex items-center justify-between shadow-lg hover:scale-105 transition">
                    <div className="flex items-center gap-3"><Percent size={22} /> Claim 20% Off Offer</div> <span className="text-2xl">→</span>
                  </button>
                  <button onClick={() => handleAction('book-now')} className="bg-gradient-to-r from-[#814157]/10 to-[#a85573]/10 text-[#814157] border-2 border-[#814157]/30 py-4 px-6 rounded-xl font-bold flex items-center justify-between hover:scale-105 transition">
                    <div className="flex items-center gap-3"><Calendar size={22} /> Book Appointment</div> <span className="text-2xl">→</span>
                  </button>
                  <button onClick={() => handleAction('services-pricing')} className="bg-white border-2 border-gray-200 text-gray-800 py-4 px-6 rounded-xl font-bold flex items-center justify-between hover:border-[#814157] hover:scale-105 transition">
                    <div className="flex items-center gap-3"><ListChecks size={22} /> View Services & Pricing</div> <span className="text-2xl">→</span>
                  </button>
                </div>
              </div>
            )}

            {/* SERVICES VIEW */}
            {currentView === 'services' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#814157] to-[#a85573] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">{botName[0]}</div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-[90%] border border-gray-100">
                    <p className="font-bold text-lg mb-3">Our Premium Services</p>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {SERVICES.map(service => {
                        const selected = selectedServices.some(s => s.id === service.id);
                        return (
                          <div key={service.id} onClick={() => handleServiceSelect(service)}
                            className={`border-2 rounded-xl p-4 cursor-pointer transition ${selected ? 'border-[#814157] bg-pink-50' : 'border-gray-200 hover:border-[#814157]/50'}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className={`font-bold ${selected ? 'text-[#814157]' : ''}`}>{service.title} {service.popular && <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Popular</span>}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                                  <span className="flex items-center gap-1"><Clock size={12} /> {service.duration}</span>
                                  <span>Starting from {service.priceRange}</span>
                                </div>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 ${selected ? 'border-[#814157] bg-[#814157]' : 'border-gray-300'} flex items-center justify-center`}>
                                {selected && <CheckCircle2 size={14} className="text-white" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {selectedServices.length > 0 && totalPrice && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="font-bold text-green-800">{selectedServices.length} service(s) selected</p>
                        <p className="text-sm text-green-700">Estimated: <span className="line-through">₹{totalPrice.original.toLocaleString()}</span> → <span className="font-bold">₹{totalPrice.final.toLocaleString()}</span> (20% off)</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleBookFromServices} disabled={!selectedServices.length}
                    className="flex-1 bg-gradient-to-r from-[#814157] to-[#a85573] text-white py-4 rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2">
                    <Calendar size={18} /> Continue Booking
                  </button>
                  <button onClick={() => setCurrentView('welcome')} className="bg-gray-100 p-4 rounded-xl"><ArrowLeft size={18} /></button>
                </div>
              </div>
            )}

            {/* BOOKING FORM */}
            {currentView === 'booking' && (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#814157] to-[#a85573] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">{botName[0]}</div>
                  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-[90%] border border-gray-100">
                    <p className="font-bold text-lg mb-2">Perfect! Let's complete your booking</p>
                    {selectedServices.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-xs font-semibold text-gray-600">Selected:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedServices.map(s => <span key={s.id} className="bg-[#814157] text-white text-xs px-3 py-1 rounded-full">{s.title}</span>)}
                        </div>
                      </div>
                    )}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                      <strong>No advance payment</strong> — Pay at spa after service
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  {submitStatus === 'success' && <div className="bg-green-50 border-2 border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-2"><CheckCircle2 size={18} /> Booking submitted! We'll call you soon.</div>}
                  {submitStatus === 'error' && <div className="bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-xl">Please fill all fields</div>}
                  {submitStatus === 'error-phone' && <div className="bg-red-50 border-2 border-red-200 text-red-800 p-4 rounded-xl">Enter valid 10-digit number</div>}

                  <input type="text" name="name" value={bookingData.name} onChange={e => setBookingData(prev => ({...prev, name: e.target.value}))} placeholder="Full Name *" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#814157] focus:ring-2 focus:ring-[#814157]/30" />
                  <input type="tel" name="phone" value={bookingData.phone} onChange={e => setBookingData(prev => ({...prev, phone: e.target.value}))} placeholder="Phone Number *" maxLength={10} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#814157]" />
                  {selectedServices.length === 0 && <input type="text" name="services" value={bookingData.services} onChange={e => setBookingData(prev => ({...prev, services: e.target.value}))} placeholder="Services interested in (optional)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" />}
                  <textarea name="message" value={bookingData.message} onChange={e => setBookingData(prev => ({...prev, message: e.target.value}))} placeholder="Any special request or preferred time?" rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl resize-none"></textarea>

                  <div className="flex gap-3">
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-[#814157] to-[#a85573] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-70">
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={18} />} {isSubmitting ? 'Submitting...' : 'Submit Booking'}
                    </button>
                    <button type="button" onClick={() => setCurrentView('welcome')} className="bg-gray-100 p-4 rounded-xl"><ArrowLeft size={18} /></button>
                  </div>
                </form>
              </div>
            )}

            {/* SUCCESS VIEW */}
            {currentView === 'success' && (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={40} className="text-green-600" /></div>
                <p className="text-2xl font-bold text-gray-800 mb-3">Booking Confirmed!</p>
                <p className="text-gray-600">Thank you! We'll contact you within 24 hours.</p>
              </div>
            )}

            {typingIndicator && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#814157] to-[#a85573] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">{botName[0]}</div>
                <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingBot;
