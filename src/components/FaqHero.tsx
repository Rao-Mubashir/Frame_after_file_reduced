import { Pause, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function FaqHero() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[calc(100vh-140px)] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1638226872130-9d431b363868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBoZWxwfGVufDF8fHx8MTc2NjQzNDAzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundPosition: 'center 40%'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8 z-10">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          FAQs
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find answers to your most common questions
        </motion.p>
      </div>

      {/* Pause Button - Bottom Left - Responsive */}
      <button 
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
        aria-label="Pause video"
      >
        <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Social Media Icons - Right Side - Hidden on small mobile, visible from sm up */}
      <div className="hidden sm:flex absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 flex-col gap-3 sm:gap-4 z-10">
        <a 
          href="#" 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Facebook"
        >
          <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </a>
        <a 
          href="#" 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </a>
        <a 
          href="#" 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </a>
        <a 
          href="#" 
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="YouTube"
        >
          <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </a>
      </div>

      {/* Mobile Social Media Icons - Bottom Right - Visible only on mobile */}
      <div className="sm:hidden absolute bottom-4 right-4 flex gap-2 z-10">
        <a 
          href="#" 
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Facebook"
        >
          <Facebook className="w-4 h-4 text-white" />
        </a>
        <a 
          href="#" 
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-4 h-4 text-white" />
        </a>
        <a 
          href="#" 
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-4 h-4 text-white" />
        </a>
        <a 
          href="#" 
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="YouTube"
        >
          <Youtube className="w-4 h-4 text-white" />
        </a>
      </div>
    </div>
  );
}
