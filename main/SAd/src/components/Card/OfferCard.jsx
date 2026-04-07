const OfferCard = ({ offer }) => {
  const phoneDigits = (offer?.phone || '').replace(/[^0-9]/g, '');
  const whatsappDigits = (offer?.whatsapp || '').replace(/[^0-9]/g, '');

  return (
    <div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group hover:border-2 hover:border-primary'>

      <div className='relative w-full bg-neutral'>

        <img src={offer.image} alt={offer.title} className='w-full h-auto object-contain' />
        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <div className='flex gap-3'>
            <a
              href={`https://wa.me/${whatsappDigits}`}
              target='_blank'
              rel='noopener noreferrer'
              className='px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow'
            >
              WhatsApp
            </a>
            <a
              href={`tel:+${phoneDigits}`}
              className='px-4 py-2 rounded-lg bg-accent hover:bg-[#2596be] text-white text-sm font-medium shadow transition-colors duration-200'
            >
              Call
            </a>
          </div>
        </div>
      </div>



    </div>
  )
}

export default OfferCard;