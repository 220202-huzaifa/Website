import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold text-white mb-4 inline-block">
              <span className="text-orange-500">Tech</span>Soft
            </Link>
            <p className="text-sm">Building digital products people love since 2024.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Management System Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">CRM Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Shopify Store Development</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Mobile Development</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@techsoft.com" className="hover:text-white transition-colors">hello@techsoft.com</a></li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 TechSoft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
