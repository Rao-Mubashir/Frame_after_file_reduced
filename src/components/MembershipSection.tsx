import { motion } from "framer-motion";
import { Eye, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const exampleImage = "/images/IR5A8777.webp";

// Customer reviews data
const reviews = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1723468353356-e18254cd8a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjByZWNlcHRpb24lMjBkZXNrJTIwd29tYW58ZW58MXx8fHwxNzY2NDI1MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote:
      "The team at Frame 2 Complex are always fab! Little things like a smiley good morning when arriving make such a difference.",
    name: "Danielle",
    location: "Frame 2 Complex",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1676012088690-d2197f76db9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjaGFuZ2luZyUyMHJvb20lMjBsb2NrZXJzfGVufDF8fHx8MTc2NjQyNTEzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote:
      "Lovely to swim outdoors and then enjoy great facilities in the changing room, with powerful hairdryers and hair straighteners.",
    name: "Reena",
    location: "Frame 2 Complex",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1692182549439-2a78c119dc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG1lZGl0YXRpbmclMjB5b2dhJTIwc3R1ZGlvfGVufDF8fHx8MTc2NjQyNTEzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote:
      "The yoga classes are transformative. The instructors are knowledgeable and the studio atmosphere is peaceful and welcoming.",
    name: "Sophie",
    location: "Frame 2 Complex",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1711110065918-388182f86e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBsdXh1cnklMjBzcGF8ZW58MXx8fHwxNzY2NDI1MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote:
      "The outdoor heated pool is stunning. Perfect for a refreshing swim followed by relaxation in the spa facilities.",
    name: "Michael",
    location: "Frame 2 Complex",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1758798458635-f01402b40919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY2xhc3MlMjBncm91cCUyMHdvcmtvdXR8ZW58MXx8fHwxNzY2NDI1MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote:
      "Group fitness classes are energizing and fun. The variety keeps me motivated and the instructors are exceptional.",
    name: "Emma",
    location: "Frame 2 Complex",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1643685276743-1b52832c58d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjB0cmVhdG1lbnQlMjBtYXNzYWdlJTIwcmVsYXhhdGlvbnxlbnwxfHx8fDE3NjY0MjUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote:
      "The spa treatments are world-class. I leave feeling completely rejuvenated and ready to take on the week ahead.",
    name: "James",
    location: "Frame 2 Complex",
  },
];

// Benefits data
const benefits = [
  "👉 Invest in your health so you not only get more years in your life, but more life in your years",
  "👉 Nurture healthy habits in your family while spending quality time together",
  "👉 Build strength and boost your mental wellbeing through exercise and mindful activities",
  "👉 Improve your memory, productivity and creativity with regular exercise and classes",
  "👉 Network, make friends and enjoy the company of old ones in our Clubrooms and workspaces",
];

export function MembershipSection() {
  return (
    <section>
      {/* Take a look around Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={exampleImage}
            alt="Take a look around"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-purple-900/50"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-[1400px] mx-auto px-8 py-32 text-center"
        >
          <h2 className="text-white mb-10 text-6xl drop-shadow-2xl">
            Take a look around
          </h2>
          <Link to="/service/boxing" className="inline-flex px-10 py-4 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-all hover:scale-105 transform shadow-xl items-center gap-3 mx-auto group">
            <span>Look around our Clubs</span>
            <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Memberships to suit your lifestyle Section */}
      <div className="bg-[#F5F1E8] py-32">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Heading and Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-purple-900 text-5xl lg:text-6xl leading-tight">
                Memberships to suit
                <br />
                your lifestyle
              </h2>

              <div className="flex flex-col gap-4 max-w-[320px]">
                <Link to="/booking" className="px-10 py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg flex items-center justify-center gap-2 group">
                  <span>Book Now</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:pl-12"
            >
              <div className="space-y-4">
                <p className="text-gray-700 text-xl leading-relaxed">
                  <span className="block mb-2">
                    Just you, add a partner
                  </span>
                  <span className="block text-lg text-gray-600">
                    or include all the family
                  </span>
                </p>
              </div>

              <div className="h-px bg-gray-300"></div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Tailored to your life's needs...
                <br />
                Choose services and access
                <br />
                to Clubs across the UK and
                <br />
                Europe
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Member experiences Section */}
      <div className="bg-[#F5F1E8] py-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-gray-900 mb-4 text-5xl">
              Member experiences
            </h2>
            <p className="text-gray-600 text-lg">
              Hear what our members love about Frame 2 Complex
            </p>
          </motion.div>

          {/* Infinite Scrolling Reviews */}
          <div className="relative">
            <div className="flex gap-8 animate-scroll-left">
              {/* First set of reviews */}
              {reviews.map((review) => (
                <div
                  key={`first-${review.id}`}
                  className="flex-shrink-0 w-[420px]"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full flex flex-col">
                    {/* Image */}
                    <div className="h-64 overflow-hidden">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="text-purple-900 text-6xl mb-4 leading-none">
                        "
                      </div>
                      <p className="text-purple-900 text-base leading-relaxed mb-6 flex-1">
                        {review.quote}
                      </p>
                      <div>
                        <p className="text-purple-900">
                          {review.name}
                        </p>
                        <p className="text-purple-900 text-sm opacity-75">
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {reviews.map((review) => (
                <div
                  key={`second-${review.id}`}
                  className="flex-shrink-0 w-[420px]"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] h-full flex flex-col">
                    {/* Image */}
                    <div className="h-64 overflow-hidden">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="text-purple-900 text-6xl mb-4 leading-none">
                        "
                      </div>
                      <p className="text-purple-900 text-base leading-relaxed mb-6 flex-1">
                        {review.quote}
                      </p>
                      <div>
                        <p className="text-purple-900">
                          {review.name}
                        </p>
                        <p className="text-purple-900 text-sm opacity-75">
                          {review.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#F5F1E8] py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          {/* Come experience it for yourself */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-purple-900 mb-10 text-5xl">
              Come experience it for yourself
            </h2>
          </motion.div>

          {/* Why join Frame 2 Complex */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Side - Heading and Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 lg:sticky lg:top-32"
            >
              <h2 className="text-purple-900 text-5xl lg:text-6xl leading-tight">
                Why join Frame
                <br />2 Complex?
              </h2>

              <div className="flex flex-col gap-4 max-w-[320px]">
                <Link to="/booking" className="inline-flex px-10 py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg items-center justify-center gap-2 group">
                  <span>Book Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Benefits List */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-0 lg:pl-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="py-6 border-b border-gray-300 last:border-b-0"
                >
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}