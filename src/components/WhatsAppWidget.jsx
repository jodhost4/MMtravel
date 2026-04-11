import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  const phoneNumber = "911234567890"; // Placeholder number
  const message = "Hello! I'm interested in booking a ride with MM Travels.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors group relative"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        
        {/* Tooltip/Popup */}
        <span className="absolute right-full mr-4 px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm font-bold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100 dark:border-gray-700">
          Need help? Chat with us!
          <span className="absolute top-1/2 -right-2 -translate-y-1/2 border-8 border-transparent border-l-white dark:border-l-gray-800" />
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppWidget;
