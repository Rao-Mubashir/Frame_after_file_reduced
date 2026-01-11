import { Link } from 'react-router-dom';
import { Menu, X, User, Shield } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import logoImage from 'figma:asset/5ace99222f98d2741bf5d17c6e52788ad0ee5147.png';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-purple-900 text-white py-2.5 text-center px-4">
        <p className="text-xs sm:text-sm tracking-wide">
          Elevate your everyday. Get started with a 3 month membership today &gt;
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="bg-[#F5F1E8] px-4 sm:px-6 lg:px-8 py-4 lg:py-5 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          {/* Navigation Row - Logo, Menu, and Buttons */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" onClick={closeMenu}>
              <img 
                src={logoImage} 
                alt="Frame 2 Complex" 
                className="h-10 sm:h-12 brightness-0" 
              />
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex gap-8 xl:gap-10 text-gray-700">
              <Link to="/" className="hover:text-purple-900 transition-colors tracking-wide">
                Home
              </Link>
              <Link to="/about" className="hover:text-purple-900 transition-colors tracking-wide">
                About Us
              </Link>
              <Link to="/blog" className="hover:text-purple-900 transition-colors tracking-wide">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-purple-900 transition-colors tracking-wide">
                Contact Us
              </Link>
              <Link to="/faqs" className="hover:text-purple-900 transition-colors tracking-wide">
                FAQs
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:text-purple-900 transition-colors tracking-wide flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>

            {/* Desktop Buttons - Hidden on mobile */}
            <div className="hidden lg:flex gap-3">
              <Link 
                to="/booking" 
                className="px-5 xl:px-7 py-2.5 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:shadow-lg tracking-wide text-sm"
              >
                Book now
              </Link>
              <Link 
                to="/profile" 
                className="w-10 h-10 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all hover:shadow-lg flex items-center justify-center"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>

            {/* Profile Icon - Visible on small screens */}
            <Link 
              to="/profile" 
              className="lg:hidden w-8 h-8 mr-2 border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-800 hover:text-white transition-all hover:shadow-lg flex items-center justify-center"
              aria-label="Profile"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>

          {/* Mobile Menu - Animated */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="pt-6 pb-4 space-y-4">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/" 
                      className="text-gray-700 hover:text-purple-900 transition-colors tracking-wide py-2 px-4 rounded-lg hover:bg-white"
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/about" 
                      className="text-gray-700 hover:text-purple-900 transition-colors tracking-wide py-2 px-4 rounded-lg hover:bg-white"
                      onClick={closeMenu}
                    >
                      About Us
                    </Link>
                    <Link 
                      to="/blog" 
                      className="text-gray-700 hover:text-purple-900 transition-colors tracking-wide py-2 px-4 rounded-lg hover:bg-white"
                      onClick={closeMenu}
                    >
                      Blog
                    </Link>
                    <Link 
                      to="/contact" 
                      className="text-gray-700 hover:text-purple-900 transition-colors tracking-wide py-2 px-4 rounded-lg hover:bg-white"
                      onClick={closeMenu}
                    >
                      Contact Us
                    </Link>
                    <Link 
                      to="/faqs" 
                      className="text-gray-700 hover:text-purple-900 transition-colors tracking-wide py-2 px-4 rounded-lg hover:bg-white"
                      onClick={closeMenu}
                    >
                      FAQs
                    </Link>
                    {user?.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="text-gray-700 hover:text-purple-900 transition-colors tracking-wide py-2 px-4 rounded-lg hover:bg-white flex items-center gap-2"
                        onClick={closeMenu}
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-300">
                    <Link 
                      to="/booking" 
                      className="w-full py-3 text-center bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all tracking-wide"
                      onClick={closeMenu}
                    >
                      Book now
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
