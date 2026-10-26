import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingActions = ({ onOpenBookingModal }) => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Hello Home Tuition! I'm interested in finding out more about your classes and booking a free demo session."
    );
    window.open(`https://wa.me/919345793979?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      {/* Quick Demo Booking Floating Pill */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenBookingModal}
        className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-brand-600/30 border border-brand-300/40 hover:shadow-brand-500/50 transition-all cursor-pointer group"
      >
        <span className="p-0.5 sm:p-1 rounded-full bg-white/20">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-100 group-hover:rotate-12 transition-transform" />
        </span>
        <span className="pr-1 tracking-wide hidden xs:inline sm:inline">Book Free Demo</span>
        <span className="pr-1 tracking-wide xs:hidden">Demo</span>
      </motion.button>

      {/* WhatsApp Quick Chat Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="w-11 h-11 sm:w-13 sm:h-13 p-2.5 sm:p-3.5 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30 hover:bg-[#20bd5a] flex items-center justify-center cursor-pointer transition-all border border-white/20"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
      </motion.button>
    </div>
  );
};

export default FloatingActions;
