import { spaInfo, testimonials } from '../data/spaData';
import TestimonialCard from '../components/Card/TestimonialCard';

const About = () => {
  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in booking an appointment at Auric Spa Panjim. Can you please provide more details?`;
    const whatsappUrl = `https://wa.me/${spaInfo.whatsapp.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${spaInfo.phone.replace(/\s/g, '')}`, '_self');
  };

  return (
    <div id="about">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-neutral to-secondary/20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="mobile-heading font-serif font-bold text-[#2596be] mb-4 sm:mb-6">
                About {spaInfo.name}
              </h2>
              <p className="mobile-text text-[#2596be]/70 mb-4 sm:mb-6 leading-relaxed">
                {spaInfo.description}
              </p>
              <p className="text-[#2596be]/70 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Founded with a vision to provide exceptional wellness experiences, we combine traditional healing techniques with modern spa therapies. Our commitment to excellence and attention to detail ensures that every visit is a memorable journey towards relaxation and rejuvenation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>📱</span>
                  WhatsApp
                </button>
                <button 
                  onClick={handleCall}
                  className="bg-[#2596be] hover:bg-accent text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>📞</span>
                  Call Now
                </button>
              </div>
            </div>


            <div className="relative">
              <div className="rounded-2xl p-6 sm:p-8 text-center">
                <img 
                  src="/images/kalaburagi (1).jpg"
                  alt="Auric Spa Panjim"
                  className="w-full h-64 sm:h-80 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#2596be] mb-2">
                  Auric Spa Panjim
                </h3>
              </div>
            </div>



          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#2596be] mb-2">500+</div>
              <div className="text-[#2596be]/70 text-sm sm:text-base">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#2596be] mb-2">50+</div>
              <div className="text-[#2596be]/70 text-sm sm:text-base">Expert Therapists</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#2596be] mb-2">10+</div>
              <div className="text-[#2596be]/70 text-sm sm:text-base">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#2596be] mb-2">100%</div>
              <div className="text-[#2596be]/70 text-sm sm:text-base">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-neutral">
        <div className="container-custom">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mobile-heading font-serif font-bold text-[#2596be] mb-4">
              What Our Clients Say
            </h2>
            <p className="mobile-text text-[#2596be]/70 max-w-2xl mx-auto px-4">
              Don't just take our word for it - hear from our satisfied clients about their experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
