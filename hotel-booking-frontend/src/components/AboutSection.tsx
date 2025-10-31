const AboutSection = () => {
  return (
    <section className="mt-12">
      <div className="w-auto rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 via-white to-indigo-50 ring-1 ring-indigo-100/60 m-8 border-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* --- Title --- */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 text-center">
            About Estuary Dreamz
          </h2>

          {/* --- Logo --- */}
          <div className="flex-shrink-0 mt-10 md:mt-0 relative">
            <img
              src="/BOATEL.png"
              alt="Boatel logo"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-8 border-yellow-400 object-cover shadow-xl mx-auto my-6"
            />
          </div>

          {/* --- Intro Paragraph --- */}
          <p className="text-slate-600 text-center mt-2 max-w-2xl mx-auto">
            Experience Puducherry's unique water-front BOATEL with serene river
            views, modern comforts, and warm hospitality.
          </p>

          {/* --- Detailed Description --- */}
          <p className="text-lg opacity-90 my-8 leading-relaxed text-slate-700">
            <span className="font-semibold">Estuary Dreamz BOATEL</span> is
            Puducherry's premier waterfront retreat, offering a unique blend of
            luxury and tranquility aboard our docked boatel. Nestled beside the
            serene backwaters and just a stone's throw from the pristine Eden
            Beach, we offer an unparalleled experience. <br />
            <br />
            Family-founded and locally inspired, our boatel is run by
            hospitality professionals who are passionate about providing
            exceptional service and making every guest's stay truly special. We
            invite you to discover a peaceful escape where comfort meets the
            charm of Puducherry's natural beauty. Our thoughtfully designed
            spaces reflect a serene maritime theme, blending modern amenities
            with rustic elegance to create an atmosphere of relaxed
            sophistication. <br />
            <br />
            Enjoy breathtaking views of the estuary, indulge in delectable local
            and international cuisine at our onboard restaurant, and rejuvenate
            your senses with our exclusive spa services.
            <br />
            <br />
            Whether you are seeking a romantic getaway, a family vacation, or a
            unique event venue, Estuary Dreamz BOATEL promises an unforgettable
            experience. We also offer special packages for honeymoons, corporate
            retreats, and bespoke celebrations, ensuring every occasion is truly
            memorable.
          </p>

          {/* --- Highlights --- */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-indigo-100/70">
              <h3 className="font-semibold text-slate-900">
                Waterfront Luxury
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Elegant interiors and serene estuary views for a premium stay.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-indigo-100/70">
              <h3 className="font-semibold text-slate-900">
                Waterfront Location
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Near Eden Beach & Radisson; easy access to Puducherry
                attractions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-indigo-100/70">
              <h3 className="font-semibold text-slate-900">
                Thoughtful Amenities
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Air-conditioned rooms, curated dining, and relaxing wellness
                options.
              </p>
            </div>
          </div>

          {/* --- Top Activities --- */}
          <div className="mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 text-center">
              Top Activities near the Property
            </h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-indigo-100/70">
                <h4 className="font-semibold text-slate-900">
                  1. Beach Walks & Relaxation
                </h4>
                <p className="text-slate-600 text-sm mt-1">
                  Long shoreline and gentle waters make it perfect for a
                  leisurely walk, relaxing on the sand, or simply watching the
                  waves.
                </p>
                <ul className="list-disc pl-5 text-slate-600 text-sm mt-2 space-y-1">
                  <li>
                    Tip: Visit around sunrise or sunset for softer light and
                    fewer crowds.
                  </li>
                  <li>
                    Bring a hat and sunscreen — coastal sun can be strong even
                    during strolls.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-indigo-100/70">
                <h4 className="font-semibold text-slate-900">
                  2. Swimming & Beach Games
                </h4>
                <p className="text-slate-600 text-sm mt-1">
                  Shallow stretches of water are great for comfortable swimming
                  and playful time by the shore.
                </p>
                <ul className="list-disc pl-5 text-slate-600 text-sm mt-2 space-y-1">
                  <li>Safety: Always check local conditions for waves.</li>
                  <li>Carry a Frisbee or ball for simple beach games.</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow ring-1 ring-indigo-100/70">
                <h4 className="font-semibold text-slate-900">
                  3. Observe Traditional Fishing
                </h4>
                <p className="text-slate-600 text-sm mt-1">
                  Catch a glimpse of local fishermen working with nets and small
                  boats — a window into coastal life.
                </p>
                <ul className="list-disc pl-5 text-slate-600 text-sm mt-2 space-y-1">
                  <li>
                    Be respectful and keep a considerate distance while
                    observing.
                  </li>
                  <li>Mornings often offer the most activity along shore.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* --- Nearby Places to Visit (With Images) --- */}
          <div className="mt-12">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 text-center">
              Nearby Places to Visit
            </h3>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Arikamedu Archaeological Site */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-indigo-100/70 transition hover:shadow-2xl">
                <img
                  src="/arikamedu-site.jpg"
                  alt="Arikamedu Archaeological Site"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-5">
                  <h4 className="font-semibold text-slate-900">
                    Arikamedu Archaeological Site
                  </h4>
                  <p className="text-slate-600 text-sm mt-1">
                    Ancient Roman trade settlement remnants; a serene spot for
                    history lovers and photographers.
                  </p>
                </div>
              </div>

              {/* Chunnambar Boat House */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-indigo-100/70 transition hover:shadow-2xl">
                <img
                  src="/chunnambar-boat-house.jpg"
                  alt="Chunnambar Boat House"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-5">
                  <h4 className="font-semibold text-slate-900">
                    Chunnambar Boat House
                  </h4>
                  <p className="text-slate-600 text-sm mt-1">
                    Backwater cruises, boating, and ferry access — a relaxing
                    way to enjoy the estuary and mangroves.
                  </p>
                </div>
              </div>

              {/* Eden Beach */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-indigo-100/70 transition hover:shadow-2xl">
                <img
                  src="/eden-beach.jpg"
                  alt="Eden Beach"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-5">
                  <h4 className="font-semibold text-slate-900">Eden Beach</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    Blue Flag beach known for cleanliness, lifeguards, and
                    family-friendly facilities.
                  </p>
                </div>
              </div>

              {/* White Town & Promenade */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-indigo-100/70 transition hover:shadow-2xl">
                <img
                  src="/white-town-promenade.jpg"
                  alt="White Town and Promenade"
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-5">
                  <h4 className="font-semibold text-slate-900">
                    White Town & Promenade
                  </h4>
                  <p className="text-slate-600 text-sm mt-1">
                    French Quarter’s colonial architecture, cafes, and a scenic
                    seaside promenade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
