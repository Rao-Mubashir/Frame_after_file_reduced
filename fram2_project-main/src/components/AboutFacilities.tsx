import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const facilities = [
  {
    image: "/images/football/IR5A8717.webp",
    title: "Professional Football Grounds",
    description: "Experience the thrill of the game on our professionally maintained football pitches. Whether you're organizing a friendly match, team training session, or competitive tournament, our premium grass and artificial turf grounds provide the perfect playing surface for all skill levels.",
    path: "/service/football"
  },
  {
    image: "/images/cricket/IR5A8691.webp",
    title: "Premier Cricket Ground",
    description: "Step onto our world-class cricket ground featuring a meticulously prepared pitch and state-of-the-art facilities. Perfect for competitive matches, practice sessions, and cricket enthusiasts of all ages. Complete with professional-grade equipment and ample seating for spectators.",
    path: "/service/cricket"
  },
  {
    image: "/images/badminton/IR5A8724.webp",
    title: "Bedminton Courts",
    description: "Train like a champion in our dedicated bedminton court equipped with professional-grade, proficiency, and training equipment. Whether you're a beginner learning the fundamentals or an experienced bedminton refining your technique, our facility provides everything you need.",
    path: "/service/bedminton"
  },
  {
    image: "/images/game-arena/IR5A8696.webp",
    title: "State-of-the-Art Game Arena",
    description: "Immerse yourself in our cutting-edge gaming arena featuring the latest gaming consoles, high-performance PCs, and immersive VR experiences. Perfect for esports tournaments, casual gaming sessions, and entertainment events in a comfortable, climate-controlled environment.",
    path: "/service/game-arena"
  }
];

export function AboutFacilities() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="space-y-16 sm:space-y-20 md:space-y-24">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${index % 2 === 1 ? 'lg:flex lg:flex-row-reverse' : ''
                }`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Image */}
              <motion.div
                className="relative h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-2xl sm:rounded-3xl group shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>

              {/* Content */}
              <motion.div
                className={index % 2 === 1 ? 'lg:pr-12' : 'lg:pl-12'}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-800">
                  {facility.title}
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                  {facility.description}
                </p>
                <Link to={facility.path}>
                  <motion.button
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore facility
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
