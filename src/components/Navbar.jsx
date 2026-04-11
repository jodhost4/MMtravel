import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Car, LogOut, ChevronDown, User, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Book Now', path: '/booking' },
  ];

  const getDashboardLink = () => {
    if (!user) return null;
    return { name: 'Dashboard', path: `/${user.role}/dashboard` };
  };

  const dashboardLink = getDashboardLink();

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-secondary/95 backdrop-blur-md shadow-lg py-2 border-b border-gray-100 dark:border-white/10' 
        : 'bg-white dark:bg-secondary py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="bg-primary p-2 rounded-xl transition-shadow group-hover:shadow-lg group-hover:shadow-blue-500/20"
            >
              <Car className="text-white w-6 h-6" />
            </motion.div>
           <span className="text-2xl font-extrabold tracking-tight">
 <span className="text-2xl font-extrabold relative overflow-hidden">
  <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-[length:200%] animate-[shine_3s_linear_infinite] bg-clip-text text-transparent">
    MM Travels
  </span>
</span>
</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white font-semibold transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-light transition-all group-hover:w-full" />
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-6 border-l border-gray-700 pl-6">
                {dashboardLink && (
                  <Link
                    to={dashboardLink.path}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white font-semibold flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {dashboardLink.name}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/user/login" className="text-gray-600 dark:text-gray-300 font-semibold hover:text-primary dark:hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/user/register" className="btn btn-primary !rounded-xl !py-2.5 shadow-none hover:shadow-xl hover:shadow-blue-500/20">
                  Join Now
                </Link>
              </div>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-600 dark:text-white transition-all ml-4"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors p-2"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="md:hidden bg-white dark:bg-secondary border-t border-gray-100 dark:border-gray-800 overflow-hidden origin-top"
          >
            <div className="px-6 pt-6 pb-10 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-4 text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white border-b border-gray-100 dark:border-gray-800"
                >
                  {link.name}
                </Link>
              ))}
              {user && dashboardLink && (
                <Link
                  to={dashboardLink.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-4 text-lg font-bold text-gray-300 hover:text-white border-b border-gray-800"
                >
                  {dashboardLink.name}
                </Link>
              )}
              <div className="pt-8 space-y-4">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-3 bg-red-500/10 text-red-500 py-4 rounded-2xl font-bold"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/user/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full block py-4 text-center text-white bg-gray-800 rounded-2xl font-bold"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/user/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full btn btn-primary py-4 block text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
