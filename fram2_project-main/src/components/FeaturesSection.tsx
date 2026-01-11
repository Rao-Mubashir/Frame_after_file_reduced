import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export function FeaturesSection() {
  return (
    <section>
      {/* Football Grounds Section - Text Only with Light Background */}
      <div className="bg-gradient-to-br from-[#F5F1E8] via-white to-[#FAF8F4] py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[900px] mx-auto text-center bg-white/60 backdrop-blur-sm p-6 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100"
          >
            <h2 className="text-gray-900 mb-6 md:mb-10 text-3xl md:text-4xl lg:text-5xl">Football Grounds</h2>
            <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed">
              Championship-quality football pitches with pristine surfaces. Whether you're training for competition or enjoying a casual match, our grounds provide the perfect setting for the beautiful game.
            </p>
            <Link to="/booking" className="inline-block px-8 py-3 md:px-10 md:py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg text-sm md:text-base">
              Book a pitch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Cricket Ground Section - Full Width Image with Overlay */}
      <div className="relative h-[750px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/cricket/IR5A8691.webp)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-8 h-full flex items-center">
          <div
            className="max-w-[550px] w-full h-[420px]"
            style={{ perspective: '1500px' }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              <motion.div
                className="relative w-full h-full"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                style={{
                  transformStyle: 'preserve-3d',
                  position: 'relative'
                }}
              >
                {/* Front of Card */}
                <div
                  className="absolute w-full h-full bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-[2rem] shadow-2xl flex flex-col justify-center items-center text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <h2 className="text-gray-900 mb-6 sm:mb-10 text-3xl sm:text-5xl">Cricket Ground</h2>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    Experience cricket at its finest on our professional-grade turf wickets. From club matches to coaching sessions, our grounds offer everything you need for the gentleman's game.
                  </p>
                  <div>
                    <Link to="/service/cricket" className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all">
                      Play cricket
                    </Link>
                  </div>
                </div>

                {/* Back of Card */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-purple-900 to-purple-950 p-4 sm:p-6 rounded-[2rem] shadow-2xl flex flex-col justify-center items-center text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <h2 className="text-white mb-4 text-xl sm:text-2xl">Master the Game</h2>
                  <p className="text-white/95 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                    Join leagues, participate in tournaments, and develop your skills with expert coaching. Our cricket facilities feature top-quality pitches, nets, and all the amenities you need.
                  </p>
                  <div>
                    <Link to="/service/cricket" className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-white text-purple-900 rounded-full hover:bg-[#F5F1E8] transition-all">
                      Play cricket
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Boxing Section */}
      {/* <div className="bg-[#F5F1E8] py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="col-span-2 h-[320px] rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1727528882203-27d1fb281807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjB0cmFpbmluZyUyMGF0aGxldGV8ZW58MXx8fHwxNzY2NDEyODkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Boxing Training"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[280px] rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBwdW5jaGluZyUyMGJhZ3xlbnwxfHx8fDE3NjY0MzYxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Boxing Punching Bag"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[280px] rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1517438476312-10d79c077509?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBzcGFycmluZyUyMHJpbmd8ZW58MXx8fHwxNzY2NDM2MTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Boxing Ring"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-8"
            >
              <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
                <h2 className="text-gray-900 mb-10 text-5xl">Boxing</h2>
                <p className="text-gray-700 text-xl mb-12 leading-relaxed">
                  Train like a champion in our state-of-the-art boxing facilities. Professional rings, heavy bags, speed bags, and expert coaching to help you achieve peak performance.
                </p>
                <Link to="/booking" className="inline-block px-10 py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg">
                  Start training
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div> */}
    </section>
  );
}