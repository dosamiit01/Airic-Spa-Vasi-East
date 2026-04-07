import OfferCard from '../components/Card/OfferCard';
import { offers } from '../data/spaData';

const Offers = () => {
  const topThreeOffers = offers.slice(0, 3);

  return (
    <section id="offers" className="py-10 sm:py-14 lg:py-16">
      <div className="container-custom px-4">
        <h2 className="text-2xl sm:text-3xl text-center justify-center lg:text-4xl font-bold text-[#2596be] mb-6 sm:mb-8 lg:mb-10">Special Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {topThreeOffers.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
