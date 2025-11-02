import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import useSearchContext from "../hooks/useSearchContext";
import SignOutButton from "./SignOutButton";
import { FileText, Activity, BarChart3, Building2, Calendar, LogIn } from "lucide-react";

import logo from '../../public/BOATEL.png'
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAppContext();
  const search = useSearchContext();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    search.clearSearchValues();
    navigate("/");
  };

  return (
    <>
      <header className="bg-gradient-to-r from-[#0a1f3d] via-[#4db6ac] to-[#c8b39d] shadow-large sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <button onClick={handleLogoClick} className="flex items-center space-x-2 group">
              <div className="rounded-lg shadow-soft group-hover:shadow-medium transition-all duration-300">
                <img src={logo} className="h-12 w-12 rounded-lg" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight group-hover:text-primary-100 transition-colors">
                Estuary Dreamz BOATEL
              </span>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <a href="#home" className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group">Home</a>
              <a href="#about" className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group">About</a>
              <a href="#contact" className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group">Contact</a>
              {isLoggedIn ? (
                <>
                  <Link className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group" to="/analytics">
                    <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Analytics
                  </Link>
                  <Link className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group" to="/my-bookings">
                    <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    My Bookings
                  </Link>
                  <Link className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group" to="/my-hotels">
                    <Building2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    My Hotels
                  </Link>
                  <Link className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group" to="/api-docs">
                    <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    API Docs
                  </Link>
                  <Link className="flex items-center text-white/90 hover:text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-all duration-200 group" to="/api-status">
                    <Activity className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    API Status
                  </Link>
                  <SignOutButton />
                </>
              ) : (
                <Link to="/sign-in" className="flex items-center bg-[#0a1f3d] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 group">
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Sign In
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={toggleMenu}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="absolute top-16 left-0 right-0 bg-gradient-to-r from-[#0a1f3d] via-[#4db6ac] to-[#c8b39d] p-4 rounded-b-lg md:hidden">
                <nav className="flex flex-col space-y-4">
                  <a href="#home" className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200">Home</a>
                  <a href="#about" className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200">About</a>
                  <a href="#contact" className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200">Contact</a>
                  {isLoggedIn ? (
                    <>
                      <Link className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200" to="/analytics">Analytics</Link>
                      <Link className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200" to="/my-bookings">My Bookings</Link>
                      <Link className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200" to="/my-hotels">My Hotels</Link>
                      <Link className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200" to="/api-docs">API Docs</Link>
                      <Link className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200" to="/api-status">API Status</Link>
                      <SignOutButton />
                    </>
                  ) : (
                    <Link to="/sign-in" className="text-white py-2 px-4 rounded-lg font-medium hover:bg-white/10 transition-all duration-200">Sign In</Link>
                  )}
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
