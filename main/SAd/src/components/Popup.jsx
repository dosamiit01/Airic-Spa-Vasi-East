import { useState, useEffect } from 'react';
import { spaInfo } from '../data/spaData';

const Popup = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in the 20% discount offer at Auric Spa Panjim. Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/${spaInfo.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleCall = () => {
    window.open(`tel:${spaInfo.phone.replace(/\s/g, '')}`, '_self');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Popup Content */}
      <div className={`relative bg-white rounded-lg shadow-lg max-w-xs w-full mx-4 transform transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close popup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Spa Name */}
          <h3 className="text-xl font-bold text-[#2596be] mb-3">
            {spaInfo.name}
          </h3>

          {/* Discount Offer */}
       <div className="mb-6">
  <div className="text-2xl font-bold text-[#2596be] mb-2">
    Get 15 Minutes Extra Massage
  </div>

  <p className="text-sm text-gray-600">
    Hurry! Limited-time offer. Book your appointment and enjoy an extra 15 minutes of bliss.
  </p>

  {/* Timer */}
  {/* <div className="mt-3 flex items-center gap-2">
    <span className="text-gray-700 text-sm font-semibold">Offer Ends In:</span>
    <div 
      id="timer" 
      className="px-3 py-1 bg-[#2596be] text-white rounded-md text-sm font-bold"
    >
      02:00
    </div>
  </div> */}
</div>


          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </button>
            
            <button
              onClick={handleCall}
              className="w-full bg-[#2596be] hover: text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
  );
};

export default Popup;
