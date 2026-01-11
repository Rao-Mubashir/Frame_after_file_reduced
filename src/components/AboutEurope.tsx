import { motion } from 'framer-motion';
import { MapPin, Clock, Smartphone, Wifi } from 'lucide-react';

interface AboutEuropeProps {
  heading?: string;
  addressLine1?: string;
  addressLine2?: string;
  features?: { title: string; description: string }[];
}

const defaultFeatures = [
  { icon: MapPin, title: 'Prime Location', description: 'Easy access from Bradford city center' },
  { icon: Clock, title: 'Extended Hours', description: 'Open 7 days a week' },
  { icon: Smartphone, title: 'Online Booking', description: 'Book facilities anytime' },
  { icon: Wifi, title: 'Free WiFi', description: 'Stay connected throughout' },
];

export function AboutEurope({
  heading = 'Your Premier Sports Complex in Bradford',
  addressLine1 = 'Feather Rd, Bradford BD3 9DJ',
  addressLine2 = 'United Kingdom',
  features,
}: AboutEuropeProps) {
  const items = features ?? defaultFeatures.map(({ title, description }) => ({ title, description }));
  const icons = [MapPin, Clock, Smartphone, Wifi];

  return (
    <section className="bg-[#F5F1E8] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl text-center mb-12 sm:mb-14 md:mb-16 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {heading}
        </motion.h2>

        {/* Location Map */}
        <motion.div
          className="relative bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 mb-10 sm:mb-12 min-h-[300px] sm:min-h-[400px] flex items-center justify-center shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-900 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-900 rounded-full blur-3xl"></div>
          </div>
          
          {/* Location Visualization */}
          <div className="text-center relative z-10">
            <motion.div 
              className="inline-flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-900/20 to-purple-900/5 mb-6 sm:mb-8"
              initial={{ scale: 0.8, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <MapPin className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-purple-900" />
            </motion.div>
            <motion.h3 
              className="text-xl sm:text-2xl md:text-3xl text-gray-800 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {addressLine1}
            </motion.h3>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {addressLine2}
            </motion.p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {items.map((feature, index) => {
            const Icon = icons[index] ?? MapPin;
            return (
            <motion.div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-base sm:text-lg text-gray-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          );})}
        </div>
      </div>
    </section>
  );
}
