import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";
import Hero from "../components/Hero";
import GallerySection from "../components/GallerySection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const handleSearch = (searchData: any) => {
    console.log("Search initiated with:", searchData);
  };

  return (
    <>
      <Hero onSearch={handleSearch} />
      <div className="space-y-8">
        {/* Latest Destinations Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* (cards from API) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels?.map((hotel) => (
              <LatestDestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        </div>

        {/* Gallery */}
        <GallerySection />

        {/* About Us Section */}
        <AboutSection />

        {/* CTA Band */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white rounded-3xl shadow-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-extrabold">Book your waterfront stay today</h3>
              <p className="text-white/90 mt-1">Wake up to river views, steps from Eden Beach and Radisson.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/search" className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow">
                Search Rooms
              </a>
              <a href="#contact" className="bg-primary-800/60 border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-primary-800/80 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Why Stay Section */}
        <section className="max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl px-6 py-10 grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center">
              <svg xmlns='http://www.w3.org/2000/svg' className='w-10 h-10 mb-3 text-primary-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 20h9' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M16.92 9A7.92 7.92 0 114.08 9m15.85 0a3.08 3.08 0 11-6.15 0" /></svg>
              <span className="font-semibold text-lg mb-2">Riverfront Views</span>
              <span className="text-gray-600">Wake up to tranquil water and sunrise scenes.</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M6 21h6M4 17l4 4h6l4-4m-2-7h6a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1v-7a1 1 0 011-1h1" /></svg>
              <span className="font-semibold text-lg mb-2">Luxury Rooms & Suites</span>
              <span className="text-gray-600">Modern comfort with stylish decor in every room.</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M13.828 21A2.991 2.991 0 0112 20c-2.21 0-4-1.79-4-4s1.79-4 4-4a3.978 3.978 0 012.829 1.172" /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M20.364 14.121A9 9 0 117.757 3.515a7.007 7.007 0 011.415 1.415" /></svg>
              <span className="font-semibold text-lg mb-2">Spa & Wellness</span>
              <span className="text-gray-600">On-deck spa, yoga, and relaxation zones.</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M5.121 17.804A12.042 12.042 0 012 12c0-5.522 4.478-10 10-10s10 4.478 10 10c0 1.657-.423 3.214-1.171 4.57" /></svg>
              <span className="font-semibold text-lg mb-2">Prime Location</span>
              <span className="text-gray-600">Near Eden Beach and Radisson; easy city access.</span>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <ContactSection />
      </div>
    </>
  );
};

export default Home;
