import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function DestinationSection() {
  const cards = [
    {
      title: "Football Grounds",
      image: "/images/football/IR5A8719.webp",
      link: "/service/football",
    },
    {
      title: "Cricket Ground",
      image: "/images/cricket/IR5A8691.webp",
      link: "/service/cricket",
    },
    {
      title: "Snooker",
      image: "/images/snooker/IR5A8751.webp",
      link: "/service/snooker",
    },
    {
      title: "Badminton",
      image: "/images/badminton/IR5A8722.webp",
      link: "/service/badminton",
    },
    {
      title: "Leisure Rooms",
      image: "/images/leisure-rooms/IR5A8742.webp",
      link: "/service/leisure-rooms",
    },
    {
      title: "Game Arena",
      image: "/images/game-arena/IR5A8696.webp",
      link: "/service/game-arena",
    },
    //{
    //  title: "Gaming Rooms",
    //image:
    //"https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHYW1pbmd8ZW58MXx8fHwxNzY2NDM2MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    //link: "/service/rooms",
    //},
    {
      title: "Swimming",
      image:
        "https://images.unsplash.com/photo-1530549387789-4c1017266635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBsdXh1cnklMjBpbmRvb3J8ZW58MXx8fHwxNzY2NDM2MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "/service/swimming",
    },
  ];

  // Duplicate cards for infinite scroll effect
  const duplicatedCards = [...cards, ...cards];

  return (
    <section className="bg-[#F5F1E8] py-16 px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Text */}
        <div className="text-center mb-16">
          <h2 className="text-gray-700 mb-6">
            Your premier destination for sports and recreation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-4">
            Imagine a place where elite sports facilities meet
            world-class hospitality.
            <br />A venue where you can compete, relax, and
            create unforgettable experiences.
          </p>
          <p className="text-gray-600">
            Discover excellence in every detail at Frame 2
            Complex.
          </p>
        </div>

        {/* Large Featured Card */}
        <div className="relative h-[400px] rounded-3xl overflow-hidden mb-12">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1758521959765-c2e04c08e643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZml0bmVzcyUyMHRyYWluaW5nfGVufDF8fHx8MTc2NjQxNjE2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)",
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-16 text-white">
            <h3 className="text-5xl mb-4">
              Elevate Your
              <br />
              Everyday
            </h3>
            <p className="text-lg mb-6">
              Get started with a 3 month
              <br />
              membership today
            </p>
            <div>
              <a href="/booking">
                <button className="px-8 py-3 bg-white text-purple-900 rounded-full hover:bg-gray-100 transition-colors">
                  Book now
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Scrolling Cards Container */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -1920], // Adjust based on card width + gap
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedCards.map((card, index) => (
              <motion.div
                key={index}
                className="relative h-[450px] w-[360px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl flex-shrink-0"
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  zIndex: 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${card.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-purple-900/90 transition-all duration-500"></div>
                </div>
                <div className="relative h-full flex items-end p-8">
                  <Link to={card.link}>
                    <motion.h4
                      className="text-white text-2xl"
                      initial={{ y: 0 }}
                      whileHover={{ y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      {card.title}
                    </motion.h4>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}