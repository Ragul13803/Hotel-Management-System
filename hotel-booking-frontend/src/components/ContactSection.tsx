
const ContactSection = () => {
  return (
    <>
    {/* Contact Section - Full width with colored background and grid inside */}
    <section className="mt-12">
    <div className="relative w-auto rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-fuchsia-600 m-8 border-2">
    <img
          src="/Boatel%20Swim%20Pool%20View.jpeg"
          alt="Boatel pool view"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden
        />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Contact Us</h2>
          <p className="text-white/90 mt-2 max-w-3xl mx-auto">We'd love to hear from you! Reach out to us for bookings, inquiries, or any special requests. Our team is dedicated to providing you with the best possible experience at Estuary Dreamz BOATEL.</p>
        </div>

        <div className="relative overflow-hidden rounded-none shadow-none text-white px-8 py-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Background image for Contact */}
       
        <div className="flex flex-col gap-5 relative">
          <div className="space-y-2 text-lg bg-white/10 backdrop-blur rounded-2xl px-10 py-10 ring-1 ring-white/20 h-360">
          {/* className="bg-white/10 backdrop-blur rounded-2xl p-5 ring-1 ring-white/20" */}
            <div><b>Phone:</b> <a href="tel:9047047567" className="underline">+91-9047047567</a> / <a href="tel:9047856736" className="underline">+91-9047856736</a> / <a href="tel:04132975667" className="underline">0413 2975667</a></div>
            {/* <div><b>Landline:</b> </div> */}
            <div className="leading-relaxed">
              <b>Address:</b><br />
              Estuary Dreamz BOATEL<br />
              No 70/28, Anthony Udaiyar Street,<br />
              Manavely, ChinnaVeeramPattinam<br />
              Puducherry, 605007<br />
              {/* Next to Radisson Hotel, Near Eden Beach<br />
              via Pondy-Cuddalore Road.<br />
              C/o. Dr. Darshan Savery */}
            </div>
            <div>
              <b>Email:</b> <a href="mailto:info@estuarydreamzboatel.com" className="underline">info@estuarydreamzboatel.com</a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a href="tel:9047047567" className="bg-white text-primary-700 font-semibold px-5 py-2 rounded-xl hover:bg-primary-50 transition-colors shadow">Call Now</a>
              <a href="https://wa.me/919047047567" target="_blank" rel="noreferrer" className="bg-green-500 text-white font-semibold px-5 py-2 rounded-xl hover:bg-green-600 transition-colors shadow">WhatsApp</a>
              <a href="/search" className="bg-primary-700 text-white font-semibold px-5 py-2 rounded-xl hover:bg-primary-800 transition-colors shadow">Book</a>
            </div>
          </div>
          
        </div>
        <div className="w-full rounded-xl overflow-hidden shadow-2xl border-2 border-primary-700 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4711.739076052793!2d79.81565937079904!3d11.881250369918108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a549f6a8fe9f633%3A0x15bf80a00547bab0!2sBOATEL%20Estuary%20Dreamz!5e0!3m2!1sen!2sin!4v1761631806631!5m2!1sen!2sin"
            width="100%"
            height="360"
            loading="lazy"
            title="Estuary Dreamz Boatel Location"
          ></iframe>
        </div>
      </div>
        {/* <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 ring-1 ring-white/20">
            <div className="text-white font-semibold">Reservations</div>
            <div className="text-white/80 text-sm mt-1">+91 98765 43210</div>
            <div className="text-white/80 text-sm">reservations@estuarydreamz.com</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 ring-1 ring-white/20">
            <div className="text-white font-semibold">Front Desk</div>
            <div className="text-white/80 text-sm mt-1">+91 91234 56789</div>
            <div className="text-white/80 text-sm">support@estuarydreamz.com</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-2xl p-5 ring-1 ring-white/20">
            <div className="text-white font-semibold">Address</div>
            <div className="text-white/80 text-sm mt-1">Near Eden Beach & Radisson Blu, Puducherry</div>
            <div className="text-white/80 text-sm">India</div>
          </div>
        </div> */}
      </div>
    </div>
  </section>
  </>
  );
};

export default ContactSection;
