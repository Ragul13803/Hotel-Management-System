
const AboutSection = () => {
  return (
    <section id="about" className="my-16 px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-blue-400/80 p-10 flex flex-col md:flex-row md:space-x-10 items-center justify-between">
        {/* Background image for About */}
        {/* <img
          src="/Boatel%20Building%20View%202.jpeg"
          alt="Boatel exterior view"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden
        /> */}
        <div className="absolute inset-0 bg-primary-900/30" />
        <div className="flex-1 text-white relative">
          <h2 className="text-4xl font-extrabold mb-3 flex items-center"><svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-circle-dot mr-2 text-yellow-400 inline-block'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='1'/></svg> About Estuary Dreamz</h2>
          <p className="text-lg opacity-90 mb-4">
            <span className="font-semibold text-yellow-200">Estuary Dreamz BOATEL</span> is Puducherry's premier waterfront retreat, offering a unique blend of luxury and tranquility aboard our docked boatel. Nestled beside the serene backwaters and just a stone's throw from the pristine Eden Beach, we offer an unparalleled experience. <br /><br />
            Family-founded and locally inspired, our boatel is run by hospitality professionals who are passionate about providing exceptional service and making every guest's stay truly special. We invite you to discover a peaceful escape where comfort meets the charm of Puducherry's natural beauty. Our thoughtfully designed spaces reflect a serene maritime theme, blending modern amenities with rustic elegance to create an atmosphere of relaxed sophistication. Enjoy breathtaking views of the estuary, indulge in delectable local and international cuisine at our onboard restaurant, and rejuvenate your senses with our exclusive spa services.<br /><br />
            Whether you are seeking a romantic getaway, a family vacation, or a unique event venue, Estuary Dreamz BOATEL promises an unforgettable experience. We also offer special packages for honeymoons, corporate retreats, and bespoke celebrations, ensuring every occasion is truly memorable.
            <span className="block mt-4 text-yellow-100 font-semibold">C/o. Dr. Darshan Savery</span>
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Waterfront Location</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Exclusive Amenities</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Family Friendly</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Close to Eden Beach</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Exceptional Service</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Onboard Dining</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Spa & Wellness</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Event Hosting</span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-10 md:mt-0 relative">
          <img src="/BOATEL.png" alt="Boatel logo" className="w-40 h-40 rounded-full border-8 border-yellow-400 object-cover shadow-xl" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
