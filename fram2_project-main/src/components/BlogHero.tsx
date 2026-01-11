import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function BlogHero() {
  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[calc(100vh-140px)] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjb21wbGV4JTIwYnJhZGZvcmR8ZW58MXx8fHwxNzY2NDM0NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          backgroundPosition: 'center center'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8 z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-center font-bold"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Blog
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-3xl px-4 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Expert insights, success stories, and the latest news from Bradford's premier sports and recreation complex
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="px-6 py-3 bg-purple-900/80 backdrop-blur-sm rounded-full text-white font-semibold">
            Fitness Tips
          </div>
          <div className="px-6 py-3 bg-purple-900/80 backdrop-blur-sm rounded-full text-white font-semibold">
            Success Stories
          </div>
          <div className="px-6 py-3 bg-purple-900/80 backdrop-blur-sm rounded-full text-white font-semibold">
            Sports News
          </div>
        </motion.div>
      </div>

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
