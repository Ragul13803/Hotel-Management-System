import { Search, Calendar, Users, Star } from "lucide-react";
import AdvancedSearch from "./AdvancedSearch";

const Hero = ({ onSearch }: { onSearch: (searchData: any) => void }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      {/* Background Image */}
      <img
        src="/Boatel%20Front%20View.jpeg"
        alt="Estuary Dreamz Boatel waterfront"
        className="absolute inset-0 w-full h-full object-cover opacity-85"
        aria-hidden
      />
      {/* Background Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-black/0" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce-gentle" />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Welcome to Estuary Dreamz BOATEL
            <span className="text-xl md:text-3xl block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent my-4">
              Puducherry's Unique Waterfront Boatel
            </span>
          </h1>

          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 my-2">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white/90 font-medium">
              Trusted by 10,000+ travelers
            </span>
          </div>

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
        </div>

        {/* CTA Band */}
        <section className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white rounded-xl shadow-2xl px-3 py-3 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Book your waterfront stay today</h3>
              {/* <p className="text-white/90 mt-1">Wake up to river views, steps from Eden Beach and Radisson.</p> */}
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
        </section>

        {/* Why Stay Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Riverfront Views Card */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.92 9A7.92 7.92 0 114.08 9m15.85 0a3.08 3.08 0 11-6.15 0" />
              </svg>
              <span className="font-semibold text-lg mb-2">Riverfront Views</span>
              <span className="text-gray-600">Wake up to tranquil water and sunrise scenes.</span>
            </div>

            {/* Luxury Rooms & Suites Card */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 21h6M4 17l4 4h6l4-4m-2-7h6a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1h1" />
              </svg>
              <span className="font-semibold text-lg mb-2">Luxury Rooms & Suites</span>
              <span className="text-gray-600">Modern comfort with stylish decor in every room.</span>
            </div>

            {/* Spa & Wellness Card */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 21A2.991 2.991 0 0112 20c-2.21 0-4-1.79-4-4s1.79-4 4-4a3.978 3.978 0 012.829 1.172" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.364 14.121A9 9 0 117.757 3.515a7.007 7.007 0 011.415 1.415" />
              </svg>
              <span className="font-semibold text-lg mb-2">Spa & Wellness</span>
              <span className="text-gray-600">On-deck spa, yoga, and relaxation zones.</span>
            </div>

            {/* Prime Location Card */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A12.042 12.042 0 012 12c0-5.522 4.478-10 10-10s10 4.478 10 10c0 1.657-.423 3.214-1.171 4.57" />
              </svg>
              <span className="font-semibold text-lg mb-2">Prime Location</span>
              <span className="text-gray-600">Near Eden Beach and Radisson; easy city access.</span>
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
            <AdvancedSearch onSearch={onSearch} />
          {/* </div> */}

        </div>
      </div>
    </section>
  );
};

export default Hero;
