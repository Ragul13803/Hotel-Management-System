import { Search, Calendar, Users, Star } from "lucide-react";

const Hero = ({onSearch}: any) => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-500 via-slate-600 to-fuchsia-700 overflow-hidden">
      {/* Background Image */}
      <img
        src="/Boatel%20Front%20View.jpeg"
        alt="Estuary Dreamz Boatel waterfront"
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-overlay scale-105"
        aria-hidden
      />
      {/* Background Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-black/0" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Welcome to Estuary Dreamz BOATEL
            <span className="text-2xl md:text-3xl block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent my-8">
              Puducherry's Unique Waterfront Boatel
            </span>
          </h1>
         

          {/* <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 my-2 shadow-xl ring-1 ring-indigo-500/20">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white/90 font-medium">
              Trusted by 10,000+ travelers
            </span>
          </div> */}

          {/* Feature Icons */}
          <div className="flex justify-center items-center space-x-8 my-4 md:my-6">
            <div className="flex items-center text-white/80">
              <Search className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Smart Search</span>
            </div>
            {/* <div className="flex items-center text-white/80">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Global Destinations</span>
            </div> */}
            <div className="flex items-center text-white/80">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Flexible Booking</span>
            </div>
            <div className="flex items-center text-white/80">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </div>
          <h3 className="text-xl md:text-5xl font-extrabold text-orange-300 my-6 leading-tight">
            Book your water-front stay today
          </h3>
          {/* <div className="mt-4 flex items-center justify-center gap-4">
            <a href="/search" className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">Search Rooms</a>
            <a href="#gallery" className="px-5 py-2.5 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition">View Gallery</a>
          </div> */}
        </div>
        {/* <span > */}



        {/* CTA Band */}
        {/* <section className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white rounded-xl shadow-2xl px-3 py-3 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Book your waterfront stay today</h3>
              <p className="text-white/90 mt-1">Wake up to river views, steps from Eden Beach and Radisson.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/search" className="bg-white text-primary-700 font-semibold px-4 py-2 rounded-xl hover:bg-primary-50 transition-colors shadow">
                Search Rooms
              </a>
              <a href="#contact" className="bg-primary-800/60 border border-white/30 px-4 py-2 rounded-xl font-semibold hover:bg-primary-800/80 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section> */}

        {/* Why Stay Section */}
        <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-6 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* 1. Beach Walks & Relaxation */}
            <div className="flex flex-col items-center text-center bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16l-5-3-5 3-5-3-5 3V4z" />
              </svg>
              <span className="font-semibold text-lg mb-4">Beach Walks & Relaxation</span>
              <span className="text-gray-600">Enjoy long shoreline walks, gentle waves, and peaceful coastal vibes.</span>
              {/* <ul className="text-gray-500 text-sm mt-2 list-disc text-left pl-5">
                <li>Visit during sunrise/sunset for beautiful light and calm surroundings.</li>
                <li>Bring a hat and sunscreen — the coastal sun can be strong.</li>
              </ul> */}
            </div>

            {/* 2. Swimming & Beach Games */}
            <div className="flex flex-col items-center text-center bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" />
              </svg>
              <span className="font-semibold text-lg mb-4">Swimming & Beach Games</span>
              <span className="text-gray-600">The shallow waters are great for swimming or a casual game on the beach.</span>
              {/* <ul className="text-gray-500 text-sm mt-2 list-disc text-left pl-5">
                <li>Check wave and current conditions before entering the water.</li>
                <li>Bring simple beach gear like a Frisbee or ball for fun.</li>
              </ul> */}
            </div>

            {/* 3. Observe Traditional Fishing */}
            <div className="flex flex-col items-center text-center bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 16l10-10 10 10H2z" />
              </svg>
              <span className="font-semibold text-lg mb-4">Observe Traditional Fishing</span>
              <span className="text-gray-600">See local fishermen using age-old net techniques — a unique cultural sight.</span>
              {/* <ul className="text-gray-500 text-sm mt-2 list-disc text-left pl-5">
                <li>Be respectful and ask before taking close-up photos.</li>
                <li>Carry small change to support local vendors.</li>
              </ul> */}
            </div>

            {/* 4. Photography & Sunset Views */}
            <div className="flex flex-col items-center text-center bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4-4-4-4m6 8h10M10 8h10" />
              </svg>
              <span className="font-semibold text-lg mb-4">Photography & Sunset Views</span>
              <span className="text-gray-600">Capture the shoreline, fishermen silhouettes, and the glowing sea horizon.</span>
              {/* <ul className="text-gray-500 text-sm mt-2 list-disc text-left pl-5">
                <li>Bring a camera or phone with extra battery.</li>
                <li>For sunset shots, face the sea and include silhouettes for dramatic effect.</li>
              </ul> */}
            </div>
          </div>
        </section>


        


        {/* Booking.com-style search card */}
        <div className="max-w-5xl mx-auto">
          {/* Tabs header (only Stays active for now) */}
          {/* <div className="flex items-center gap-2 mb-2">
            <button className="text-white bg-primary-800/70 border border-white/20 rounded-full px-4 py-1 text-sm font-semibold">Stays</button>
            <button className="text-white/60 border border-white/20 rounded-full px-4 py-1 text-sm cursor-not-allowed">Flights</button>
            <button className="text-white/60 border border-white/20 rounded-full px-4 py-1 text-sm cursor-not-allowed">Car rentals</button>
            <button className="text-white/60 border border-white/20 rounded-full px-4 py-1 text-sm cursor-not-allowed">Attractions</button>
          </div> */}

          {/* <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200/70 p-4 md:p-6"> */}
            {/* <AdvancedSearch onSearch={onSearch} /> */}
          {/* </div> */}

        </div>

       
      </div>
    </section>
  );
};

export default Hero;
