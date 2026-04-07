const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-neutral'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
      {/* Rating */}
      <div className="flex items-center mb-4">
        {renderStars(testimonial.rating)}
        <span className="ml-2 text-sm text-[#2596be]/70">
          {testimonial.rating}/5
        </span>
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-[#2596be] italic mb-6 leading-relaxed">
        "{testimonial.comment}"
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-[#2596be]">{testimonial.name}</h4>
          <p className="text-sm text-[#2596be]/70">Verified Customer</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
