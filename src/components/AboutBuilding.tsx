import { motion } from 'framer-motion';

interface AboutBuildingProps {
  heading?: string;
  subtitle?: string;
}

export function AboutBuilding({
  heading = 'Premium facilities designed for you',
  subtitle = 'Every detail matters when creating spaces for sports and recreation',
}: AboutBuildingProps) {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="relative h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="/images/leisure-rooms/IR5A8676.webp"
            alt="Frame 2 Complex Facilities"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/30 to-transparent flex items-end">
            <div className="p-6 sm:p-8 md:p-12 w-full">
              <motion.h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {heading}
              </motion.h3>
              <motion.p
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {subtitle}
              </motion.p>
              <motion.button
                className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-900 rounded-full hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Facilities
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}