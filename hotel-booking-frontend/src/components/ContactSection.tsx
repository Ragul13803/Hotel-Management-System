import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 pb-16">
      <div className="relative overflow-hidden rounded-none shadow-none text-white px-8 py-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Background image for Contact */}
        <img
          src="/Boatel%20Swim%20Pool%20View.jpeg"
          alt="Boatel pool view"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden
        />
        <div className="absolute inset-0 bg-primary-900/80" />
        <div className="flex flex-col gap-5 relative">
          <h2 className="text-3xl font-bold flex items-center">
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-phone-call mr-2 text-yellow-300 inline-block'><path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-3.67-3.67A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4.18 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-2.02 2.22 13.91 13.91 0 0 0-2.18-1.12 11.02 11.02 0 0 1 4.93 4.93 14 14 0 0 0-1.12-2.18 2 2 0 0 1 2.22-2.02c.81.24 1.63.56 2.81.7A2 2 0 0 1 22 16.92z'/><path d='M14.05 2a.2.2 0 0 1 .2.2v3.8h.4a2 2 0 0 1 2 2.2l-.7 2.7a.2.2 0 0 1-.2.1h-.2l-2.4-2.4z'/><path d='M13.2 8.8h.4a.2.2 0 0 1 .2.2v3.8l-.7 2.7a.2.2 0 0 1-.2.1h-.2l-2.4-2.4z'/></svg> Contact Us</h2>
          <p className="text-lg opacity-90 mb-4">We'd love to hear from you! Reach out to us for bookings, inquiries, or any special requests. Our team is dedicated to providing you with the best possible experience at Estuary Dreamz BOATEL.</p>
          <div className="space-y-2 text-lg">
            <div><b>Phone:</b> <a href="tel:9047047567" className="underline">+91-9047047567</a> / <a href="tel:9047856736" className="underline">+91-9047856736</a></div>
            <div><b>Landline:</b> <a href="tel:04132975667" className="underline">0413 2975667</a></div>
            <div className="leading-relaxed">
              <b>Address:</b><br />
              Estuary Dreamz BOATEL<br />
              No 70/28, Anthony Udaiyar Street,<br />
              Manavely, ChinnaVeeramPattinam<br />
              Puducherry, 605007<br />
              Next to Radisson Hotel, Near Eden Beach<br />
              via Pondy-Cuddalore Road.<br />
              C/o. Dr. Darshan Savery
            </div>
            <div>
              <b>Email:</b> <a href="mailto:info@estuarydreamzboatel.com" className="underline">info@estuarydreamzboatel.com</a>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a href="tel:9047047567" className="bg-white text-primary-700 font-semibold px-5 py-2 rounded-xl hover:bg-primary-50 transition-colors shadow">Call Now</a>
            <a href="https://wa.me/919047047567" target="_blank" rel="noreferrer" className="bg-green-500 text-white font-semibold px-5 py-2 rounded-xl hover:bg-green-600 transition-colors shadow">WhatsApp</a>
            <a href="/search" className="bg-primary-700 text-white font-semibold px-5 py-2 rounded-xl hover:bg-primary-800 transition-colors shadow">Book</a>
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
    </section>
  );
};

export default ContactSection;
