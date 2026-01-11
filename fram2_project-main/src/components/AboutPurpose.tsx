import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
  {
    url: "/images/football/IR5A8717.webp",
    alt: "Football Grounds",
    title: "Football Grounds",
    path: "/service/football"
  },
  {
    url: "/images/cricket/IR5A8691.webp",
    alt: "Cricket Ground",
    title: "Cricket Ground",
    path: "/service/cricket"
  },
  {
    url: "/images/snooker/IR5A8756.webp",
    alt: "Snooker Tables",
    title: "Snooker",
    path: "/service/snooker"
  },
  {
    url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBsdXh1cnklMjBpbmRvb3J8ZW58MXx8fHwxNzY2NDM2MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    alt: "Swimming Pool",
    title: "Swimming Pool",
    path: "/service/swimming"
  },
  {
    url: "/images/game-arena/IR5A8696.webp",
    alt: "Game Arena",
    title: "Game Arena",
    path: "/service/game-arena"
  },
  {
    url: "/images/leisure-rooms/IR5A8748.webp",
    alt: "Leisure Rooms",
    title: "Leisure Rooms",
    path: "/service/leisure-rooms"
  }
];

export function AboutPurpose() {
  return (
    <section className="bg-[#F5F1E8] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl text-center mb-12 sm:mb-14 md:mb-16 text-gray-800 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Discover Our World-Class Facilities
        </motion.h2>

        {/* Image Grid - Responsive 6 facility cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {images.map((image, index) => (
            <Link to={image.path} key={index}>
              <motion.div
                className="relative h-[280px] sm:h-[320px] md:h-[350px] overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer bg-white shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-full overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl text-white">{image.title}</h3>
                  <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to learn more
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
