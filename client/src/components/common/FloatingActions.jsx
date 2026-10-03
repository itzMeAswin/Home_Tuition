import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingActions = ({ onOpenBookingModal }) => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Hello Online Home Tution Center! I'm interested in finding out more about your classes and booking a free demo session."
    );
    window.open(`https://wa.me/919345793979?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Quick Demo Booking Floating Pill */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenBookingModal}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-brand-600 to-amber-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-brand-600/30 border border-brand-300/40 hover:shadow-brand-500/50 transition-all cursor-pointer group"
      >
        <span className="p-1 rounded-full bg-white/20">
          <Sparkles className="w-4 h-4 text-brand-100 group-hover:rotate-12 transition-transform" />
        </span>
        <span className="pr-1 tracking-wide">Book Free Demo</span>
      </motion.button>

      {/* WhatsApp Quick Chat Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 p-3.5 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/30 hover:bg-[#20bd5a] flex items-center justify-center cursor-pointer transition-all border border-white/20"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </motion.button>
    </div>
  );
};

export default FloatingActions;
