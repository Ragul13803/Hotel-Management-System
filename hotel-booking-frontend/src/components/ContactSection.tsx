const ContactSection = () => {
  return (
    <section className="mt-12">
      <div className="relative w-auto rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-fuchsia-600 m-4 sm:m-6 md:m-8 border-2">
        {/* Background Image */}
        <img
          src="/Boatel%20Swim%20Pool%20View.jpeg"
          alt="Boatel pool view"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold">Contact Us</h2>
            <p className="text-white/90 mt-2 max-w-3xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              We’d love to hear from you! Reach out to us for bookings,
              inquiries, or any special requests. Our team is dedicated to
              providing you with the best possible experience at Estuary Dreamz
              BOATEL.
            </p>
          </div>

          {/* Contact Info + Map */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-10 items-start">
            {/* Contact Info Card */}
            <div className="flex flex-col gap-5 bg-white/10 backdrop-blur rounded-2xl px-6 sm:px-8 py-8 sm:py-10 ring-1 ring-white/20 shadow-lg">
              <div className="space-y-3 text-base sm:text-lg leading-relaxed">
                <div>
                  <b>Phone:</b>{" "}
                  <a href="tel:9047047567" className="underline">
                    +91 90470 47567
                  </a>{" "}
                  /{" "}
                  <a href="tel:9047856736" className="underline">
                    +91 90478 56736
                  </a>{" "}
                  /{" "}
                  <a href="tel:04132975667" className="underline">
                    0413 2975667
                  </a>
                </div>

                <div>
                  <b>Address:</b>
                  <br />
                  Estuary Dreamz BOATEL
                  <br />
                  No 70/28, Anthony Udaiyar Street,
                  <br />
                  Manavely, Chinna Veerampattinam
                  <br />
                  Puducherry - 605007
                </div>

                <div>
                  <b>Email:</b>{" "}
                  <a
                    href="mailto:info@estuarydreamzboatel.com"
                    className="underline"
                  >
                    info@estuarydreamzboatel.com
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href="tel:9047047567"
                  className="bg-white text-indigo-700 font-semibold px-5 py-2 rounded-xl hover:bg-indigo-50 transition-colors shadow w-full sm:w-auto text-center"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/919047047567"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 text-white font-semibold px-5 py-2 rounded-xl hover:bg-green-600 transition-colors shadow w-full sm:w-auto text-center"
                >
                  WhatsApp
                </a>
                <a
                  href="/search"
                  className="bg-indigo-800 text-white font-semibold px-5 py-2 rounded-xl hover:bg-indigo-900 transition-colors shadow w-full sm:w-auto text-center"
                >
                  Book
                </a>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-64 sm:h-80 md:h-[360px] rounded-2xl overflow-hidden shadow-xl border-2 border-indigo-400">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4711.739076052793!2d79.81565937079904!3d11.881250369918108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a549f6a8fe9f633%3A0x15bf80a00547bab0!2sBOATEL%20Estuary%20Dreamz!5e0!3m2!1sen!2sin!4v1761631806631!5m2!1sen!2sin"
                width="100%"
                height="100%"
                loading="lazy"
                title="Estuary Dreamz Boatel Location"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
