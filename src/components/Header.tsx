import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 shadow-professional">
      <div className="container-professional py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors">
            <span className="text-orange-500">Diskodify</span> Solutions
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className={`nav-link ${isActive('/services') ? 'nav-link-active' : ''}`}
            >
              Services
            </Link>
            <Link 
              to="/blog" 
              className={`nav-link ${isActive('/blog') ? 'nav-link-active' : ''}`}
            >
              Blog
            </Link>
            <Link 
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
            >
              Contact
            </Link>
            <Link 
              to="/contact"
              className="btn-primary"
            >
              Get a Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-smooth"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 my-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className={`nav-link ${isActive('/services') ? 'nav-link-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/blog" 
                className={`nav-link ${isActive('/blog') ? 'nav-link-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact"
                className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/contact"
                className="btn-primary inline-block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
