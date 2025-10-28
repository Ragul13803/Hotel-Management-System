import { Search, MapPin, Calendar, Users, Star } from "lucide-react";
import AdvancedSearch from "./AdvancedSearch";

const Hero = ({ onSearch }: { onSearch: (searchData: any) => void }) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
      {/* Background Image */}
      <img
        src="/Boatel%20Front%20View.jpeg"
        alt="Estuary Dreamz Boatel waterfront"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
        aria-hidden
      />
      {/* Background Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce-gentle" />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white/90 font-medium">
              Trusted by 10,000+ travelers
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Welcome to Estuary Dreamz BOATEL
            <span className="text-5xl md:text-7xl block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Puducherry's Unique Waterfront Boatel
            </span>
          </h1>

          {/* Feature Icons */}
          <div className="flex justify-center items-center space-x-8 mb-8 md:mb-12">
            <div className="flex items-center text-white/80">
              <Search className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Smart Search</span>
            </div>
            <div className="flex items-center text-white/80">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Global Destinations</span>
            </div>
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

        {/* Booking.com-style search card */}
        <div className="max-w-5xl mx-auto">
          {/* Tabs header (only Stays active for now) */}
          <div className="flex items-center gap-2 mb-2">
            <button className="text-white bg-primary-800/70 border border-white/20 rounded-full px-4 py-1 text-sm font-semibold">Stays</button>
            <button className="text-white/60 border border-white/20 rounded-full px-4 py-1 text-sm cursor-not-allowed">Flights</button>
            <button className="text-white/60 border border-white/20 rounded-full px-4 py-1 text-sm cursor-not-allowed">Car rentals</button>
            <button className="text-white/60 border border-white/20 rounded-full px-4 py-1 text-sm cursor-not-allowed">Attractions</button>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border-2 border-blue-200/70 p-4 md:p-6">
            <AdvancedSearch onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
