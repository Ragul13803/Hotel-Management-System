import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import GallerySection from "../components/GallerySection";

const Home = () => {

  return (
    <>
      <Hero
      //  onSearch={handleSearch}
        />
        {/* Gallery */}
        <GallerySection />

         {/* About Section - Full width band with content grid */}
         
        {/* About Us Section */}
        <AboutSection />

        {/* Contact Us Section */}
        <ContactSection />
    </>
  );
};

export default Home;
