import { motion } from 'framer-motion';
import { MapPin, Navigation, TrendingUp } from 'lucide-react';

interface ContactDetails {
  address_line1?: string;
  address_line2?: string | null;
}

export function ContactMap({ contact }: { contact?: ContactDetails }) {
  const city = contact?.address_line1 ?? 'Bradford';
  const region = contact?.address_line2 ?? 'United Kingdom';

  const clubLocations = [
    { city, count: 1, region },
  ];
  return (
    <section className="relative bg-white py-32 px-8 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgb(var(--color-purple-900)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-purple-900)) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900/10 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="w-5 h-5 text-purple-900" />
            <span className="text-sm text-purple-900 uppercase tracking-wider">1 Location</span>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl mb-8 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Find Your Nearest Club
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With clubs across the UK, there's a Frame 2 Complex near you
          </motion.p>
        </div>

        {/* Interactive Map Card */}
        <motion.div
          className="relative bg-gradient-to-br from-[#F5F1E8] to-white rounded-[3rem] overflow-hidden mb-16 shadow-2xl border border-gray-100"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative h-[600px] flex flex-col items-center justify-center p-12">
            {/* Animated Decorative Background */}
            <div className="absolute inset-0">
              {/* Floating Orbs - using purple tones */}
              <motion.div
                className="absolute top-20 left-20 w-64 h-64 bg-purple-900/15 rounded-full blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-80 h-80 bg-purple-950/15 rounded-full blur-3xl"
                animate={{
                  x: [0, -40, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Central Map Icon with Pulse Effect */}
            <div className="relative z-10 mb-12">
              <motion.div
                className="relative"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Pulse Rings */}
                <motion.div
                  className="absolute inset-0 -m-8"
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                >
                  <div className="w-48 h-48 border-4 border-purple-900 rounded-full"></div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 -m-8"
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                    ease: "easeOut"
                  }}
                >
                  <div className="w-48 h-48 border-4 border-purple-900 rounded-full"></div>
                </motion.div>

                {/* Main Icon */}
                <motion.div
                  className="relative w-32 h-32 bg-gradient-to-br from-purple-900 to-purple-950 rounded-3xl flex items-center justify-center shadow-2xl"
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-16 h-16 text-white" strokeWidth={2.5} />
                  
                  {/* Corner Accents */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white rounded-full"></div>
                </motion.div>
              </motion.div>
            </div>

            {/* Search Box */}
            {/*<motion.div
              className="relative z-10 w-full max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-3 border-2 border-gray-100 group hover:border-purple-900/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-3 px-4">
                    <MapPin className="w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your postcode or city..."
                      className="flex-1 py-4 focus:outline-none text-gray-700 text-lg bg-transparent"
                    />
                  </div>
                  <motion.button
                    className="bg-gradient-to-r from-purple-900 to-purple-950 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden sm:inline">Search</span>
                    <Navigation className="w-5 h-5" />
                  </motion.button>
                </div>
                */}
                {/* Glow Effect on Hover
                <div className="absolute inset-0 bg-purple-900/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"></div>
              </div>
            </motion.div> */}
            

            {/* Club Feature Card */}
            {/* Floating Mini Cards */}
            {[
              { text: '1 Club', position: 'top-32 left-12' },
              { text: '£10M+ Investment', position: 'top-40 right-16' },
              { text: 'Family Friendly', position: 'bottom-40 left-20' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`absolute ${item.position} hidden lg:block`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clubLocations.map((location, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ 
                y: -10,
                rotateZ: 2,
                transition: { duration: 0.3 }
              }}
            >
              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-950 opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
              />

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-2xl group-hover:border-gray-200 transition-all duration-500">
                {/* Gradient Bar */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-900 to-purple-950"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                />

                {/* Count with Animation */}
                <motion.div 
                  className="text-5xl bg-gradient-to-br from-purple-900 to-purple-950 bg-clip-text text-transparent mb-3 group-hover:scale-125 transition-transform duration-500 origin-left"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {location.count}
                </motion.div>

                <div className="text-lg text-gray-800 mb-1">{location.city}</div>
                <div className="text-xs text-gray-500">{location.region}</div>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-900 to-purple-950 rounded-full flex items-center justify-center shadow-lg">
                    <Navigation className="w-4 h-4 text-white" />
                  </div>
                </motion.div>

                {/* Background Pattern */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-purple-950 rounded-tl-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}