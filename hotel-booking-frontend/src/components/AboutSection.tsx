import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-blue-400/80 shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row md:space-x-10 items-center justify-between">
        {/* Background image for About */}
        {/* <img
          src="/Boatel%20Building%20View%202.jpeg"
          alt="Boatel exterior view"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden
        /> */}
        <div className="absolute inset-0 bg-primary-900/30" />
        <div className="flex-1 text-white relative">
          <h2 className="text-4xl font-extrabold mb-3 flex items-center"><svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8 mr-2 text-yellow-400 inline-block' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z' /></svg> About Us</h2>
          <p className="text-lg opacity-90 mb-4">
            <span className="font-semibold text-yellow-200">Estuary Dreamz BOATEL</span> is Puducherry's premier waterfront retreat, offering a unique blend of luxury and tranquility aboard our docked boatel. Family-founded, locally inspired, and run by hospitality professionals who care about your experience, we are committed to making every stay special.<br /><br />
            {/* <span className="block mt-4 text-yellow-100 font-semibold">C/o. Dr. Darshan Savery</span> */}
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Waterfront Location</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Exclusive Amenities</span>
            <span className="bg-white/30 px-4 py-2 rounded-2xl shadow text-base font-semibold">Family Friendly</span>
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
