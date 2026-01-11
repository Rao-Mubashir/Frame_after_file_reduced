import { motion } from 'framer-motion';
import { Heart, Users, Award, Sparkles } from 'lucide-react';

interface AboutValuesProps {
  heading?: string;
  values?: { title: string; description: string }[];
}

const defaultValues = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love sports and recreation, and it shows in everything we create - from our facilities to our visitor experiences.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We bring people together, creating spaces where friendships form, teams unite, and families enjoy quality time.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We never settle for good enough. We constantly maintain and improve our facilities to deliver the very best.',
  },
  {
    icon: Sparkles,
    title: 'Experience',
    description: "We believe in creating memorable moments - whether you're playing, training, gaming, or simply relaxing.",
  },
];

export function AboutValues({ heading = 'Our Values', values }: AboutValuesProps) {
  const items = values ?? defaultValues.map(({ title, description }) => ({ title, description }));
  const icons = [Heart, Users, Award, Sparkles];

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl order-2 lg:order-1 group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/images/leisure-rooms/IR5A8681.webp"
              alt="Frame 2 Complex Facilities"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Values Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-10 md:mb-12 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {heading}
            </motion.h2>

            <div className="space-y-6 sm:space-y-8">
              {items.map((value, index) => {
                const Icon = icons[index] ?? Heart;
                return (
                  <motion.div
                    key={index}
                    className="flex gap-3 sm:gap-4 group/item cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-11 h-11 sm:w-12 sm:h-12 bg-purple-900 rounded-full flex items-center justify-center group-hover/item:bg-purple-950 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl mb-1.5 sm:mb-2 text-gray-800 group-hover/item:text-purple-900 transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}