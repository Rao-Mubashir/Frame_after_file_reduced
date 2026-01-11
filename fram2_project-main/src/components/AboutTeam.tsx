import { motion } from 'framer-motion';

export function AboutTeam() {
  return (
    <section className="bg-[#F5F1E8] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Looking to stand out?
            </motion.h2>
            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                At Frame 2 Complex, we're always looking for passionate, motivated people to join 
                our team. Whether you're a sports enthusiast, facility manager, gaming expert, or someone who 
                loves creating memorable experiences for others, we'd love to hear from you.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Our team members are at the heart of everything we do. They inspire our visitors, 
                create welcoming environments, and help people achieve their sporting and recreational goals every day.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Join a company that values your growth, rewards your dedication, and gives you the 
                opportunity to make a real difference in people's lives.
              </motion.p>
            </div>
            <motion.button 
              className="mt-6 sm:mt-8 bg-purple-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-purple-950 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join our team
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative h-[350px] sm:h-[450px] md:h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjByZWNyZWF0aW9uJTIwY2VudGVyfGVufDF8fHx8MTc2NjQzNjYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Frame 2 Complex Sports & Recreation Center"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}