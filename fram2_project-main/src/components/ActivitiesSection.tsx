import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export function ActivitiesSection() {
  return (
    <section>
      {/* Snooker Section */}
      <div className="bg-[#F5F1E8] py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: -50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100">
                <h2 className="text-gray-900 mb-6 md:mb-10 text-3xl md:text-4xl lg:text-5xl">Snooker</h2>
                <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed">
                  Perfect your game on our championship-standard snooker tables. Whether you're a seasoned player or just starting out, enjoy the precision and elegance of this classic sport in our refined environment.
                </p>
                <Link to="/booking" className="inline-block px-8 py-3 md:px-10 md:py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg text-sm md:text-base">
                  Book a table
                </Link>
              </div>
            </motion.div>

            {/* Right - Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: 50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/snooker/IR5A8679.webp"
                  alt="Snooker hall"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/snooker/IR5A8654.webp"
                  alt="Pool table"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/snooker/IR5A8652.webp"
                  alt="Snooker player"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/snooker/IR5A8685.webp"
                  alt="Snooker table"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Badminton Section - NEW */}
      <div className="bg-white py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: -50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 md:gap-6 order-2 lg:order-1"
            >
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/badminton/IR5A8722.webp"
                  alt="Badminton court"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/badminton/IR5A8723.webp"
                  alt="Badminton players"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/badminton/IR5A8724.webp"
                  alt="Badminton facility"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/badminton/IR5A8722.webp"
                  alt="Badminton game"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: 50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100">
                <h2 className="text-gray-900 mb-6 md:mb-10 text-3xl md:text-4xl lg:text-5xl">Badminton Courts</h2>
                <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed">
                  Experience badminton at its finest on our professional-grade courts. Perfect for competitive matches, training sessions, or recreational play with friends and family.
                </p>
                <Link to="/booking" className="inline-block px-8 py-3 md:px-10 md:py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg text-sm md:text-base">
                  Book a court
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Leisure Rooms Section - NEW */}
      <div className="bg-[#F5F1E8] py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: -50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100">
                <h2 className="text-gray-900 mb-6 md:mb-10 text-3xl md:text-4xl lg:text-5xl">Leisure Rooms</h2>
                <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed">
                  Relax and unwind in our premium VIP leisure rooms. Perfect for private gatherings, celebrations, or simply enjoying quality time with friends in a luxurious setting.
                </p>
                <Link to="/booking" className="inline-block px-8 py-3 md:px-10 md:py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg text-sm md:text-base">
                  Book a room
                </Link>
              </div>
            </motion.div>

            {/* Right - Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: 50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/leisure-rooms/IR5A8741.webp"
                  alt="VIP lounge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/leisure-rooms/IR5A8648.webp"
                  alt="Luxury room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/leisure-rooms/IR5A8742.webp"
                  alt="Leisure space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/images/leisure-rooms/IR5A8684.webp"
                  alt="VIP room"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Game Arena Section - Full Width Image with Overlay */}
      <div className="relative h-[600px] md:h-[750px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/game-arena/IR5A8696.webp)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 h-full flex items-center">
          <div
            className="max-w-[550px] w-full h-[400px] md:h-[420px]"
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
                  <div className="w-full">
                    <h2 className="text-gray-900 mb-6 sm:mb-10 text-3xl sm:text-5xl">Game Arena</h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      Step into the future of gaming with our cutting-edge esports arena. High-performance gaming stations, competitive tournaments, and a vibrant community await in our state-of-the-art facility.
                    </p>
                    <Link to="/service/game-arena" className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all">
                      Enter the arena
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
                  <div className="w-full">
                    <h2 className="text-white mb-4 text-xl sm:text-2xl">Compete at the Highest Level</h2>
                    <p className="text-white/95 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                      Join leagues, compete in tournaments, and connect with fellow gamers. Our arena features top-tier equipment, ultra-fast internet, and a professional environment designed for serious competitors.
                    </p>
                    <Link to="/service/game-arena" className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-white text-purple-900 rounded-full hover:bg-[#F5F1E8] transition-all">
                      Enter the arena
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Swimming Pool Section */}
      <div className="bg-white py-16 md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Large Top Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[300px] md:h-[500px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 md:mb-16"
          >
            <img
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1920"
              alt="Luxury Swimming Pool"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom Row - Images Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Small Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: -50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4 md:gap-6 order-2 lg:order-1"
            >
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
                  alt="Pool Water"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&q=80&w=800"
                  alt="Swimming Lanes"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right - Text Content in Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, lg: { x: 50, y: 0 } }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-8 order-1 lg:order-2"
            >
              <div className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100">
                <h2 className="text-gray-900 mb-6 md:mb-10 text-3xl md:text-4xl lg:text-5xl">Swimming Pool</h2>
                <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 md:mb-12 leading-relaxed">
                  Dive into luxury in our temperature-controlled indoor swimming pool. Whether you're swimming laps for fitness or relaxing after a workout, our pristine pool area offers the perfect aquatic experience.
                </p>
                <Link to="/booking" className="inline-block px-8 py-3 md:px-10 md:py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg text-sm md:text-base">
                  Book a swim
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* BOXING SECTION REMOVED AS REQUESTED */}
    </section>
  );
}