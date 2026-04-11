import React from "react";
import { Link } from "react-router-dom";

// React Icons
import {
  FaCar,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-600 dark:text-gray-300 transition-colors duration-300 border-t border-gray-200 dark:border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg">
                <FaCar className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                MM <span className="text-primary-light">Travels</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Safe, reliable, and premium travel experiences at your fingertips.
              Book your ride today and travel with comfort.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-primary-light transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-primary-light transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-primary-light transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-primary-light transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6 tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-primary-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="hover:text-primary-light transition-colors"
                >
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="hover:text-primary-light transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-6 tracking-wide uppercase text-xs">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary-light shrink-0" />
                <span className="text-sm">
                  123 Travel Lane, Tech City, 560001
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-primary-light shrink-0" />
                <span className="text-sm">+91 98765 43210</span>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-primary-light shrink-0" />
                <span className="text-sm">support@mmtravels.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} MM Travels. All rights reserved.</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;