import { motion } from 'framer-motion';

interface AboutWhoWeAreProps {
  heading?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
}

export function AboutWhoWeAre({
  heading = 'Who we are',
  paragraph1 = "We're Frame 2 Complex - a premier sports and recreation center located in Bradford, United Kingdom. We're dedicated to providing exceptional sporting facilities and entertainment options for individuals, families, and teams who are passionate about an active lifestyle.",
  paragraph2 =
    "Our complex is more than just a sports venue. It's a destination where athletes, gamers, and sports enthusiasts of all levels come together to pursue their passions, compete, train, and create lasting memories. From competitive matches to casual fun, we offer something for everyone.",
  paragraph3 =
    'With professional-grade football grounds, a premier cricket field, dedicated boxing facilities, premium snooker tables, a cutting-edge game arena, and comfortable accommodation rooms, we provide everything you need for sports, recreation, and relaxation - all in one convenient location.',
}: AboutWhoWeAreProps) {
  return (
    <section className="bg-[#F5F1E8] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-10 md:mb-12 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {heading}
        </motion.h2>
        
        <div className="space-y-5 sm:space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {paragraph1}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {paragraph2}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {paragraph3}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
