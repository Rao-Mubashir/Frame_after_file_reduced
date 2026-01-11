import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import logoImage from "figma:asset/5ace99222f98d2741bf5d17c6e52788ad0ee5147.png";

const footerLinks = {
  navigation: {
    title: "Quick Links",
    links: [
      { name: "Home", path: "/" },
      { name: "About Us", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faqs" },
    ],
  },
  facilities: {
    title: "Our Facilities",
    links: [
      { name: "Football Grounds", path: "/service/football" },
      { name: "Cricket Ground", path: "/service/cricket" },
      { name: "Snooker", path: "/service/snooker" },
      { name: "Boxing", path: "/service/boxing" },
      { name: "Game Arena", path: "/service/game-arena" },
      { name: "Gaming Rooms", path: "/service/rooms" },
    ],
  },
  contact: {
    title: "Contact Info",
    items: [
      { icon: MapPin, text: "Feather Rd, Bradford BD3 9DJ" },
      { icon: Phone, text: "+44 1274 123456" },
      { icon: Mail, text: "info@frame2complex.co.uk" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#F5F1E8] to-[#FAF8F4] pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Section - Logo and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-14 md:mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={logoImage}
                alt="Frame 2 Complex"
                className="h-16 brightness-0 mb-6"
              />
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Premier sports and recreation facilities
                offering world-class amenities for fitness,
                leisure, and entertainment.
              </p>

              {/* Social Media */}
              <div>
                <h4 className="text-gray-800 mb-4 text-sm uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex gap-3">
                  <motion.a
                    href="#"
                    className="w-11 h-11 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center hover:from-purple-900 hover:to-purple-950 transition-all shadow-lg group"
                    aria-label="Facebook"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-11 h-11 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center hover:from-purple-900 hover:to-purple-950 transition-all shadow-lg group"
                    aria-label="Instagram"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="w-11 h-11 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center hover:from-purple-900 hover:to-purple-950 transition-all shadow-lg group"
                    aria-label="LinkedIn"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-gray-800 mb-6 text-sm uppercase tracking-wider">
                {footerLinks.navigation.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.navigation.links.map(
                  (link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.1 + index * 0.05,
                      }}
                    >
                      <Link
                        to={link.path}
                        className="text-gray-600 hover:text-purple-900 transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
            </motion.div>
          </div>

          {/* Our Facilities */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-gray-800 mb-6 text-sm uppercase tracking-wider">
                {footerLinks.facilities.title}
              </h3>
              <ul className="space-y-3">
                {footerLinks.facilities.links.map(
                  (link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.05,
                      }}
                    >
                      <Link
                        to={link.path}
                        className="text-gray-600 hover:text-purple-900 transition-colors text-sm inline-block hover:translate-x-1 transform duration-200"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ),
                )}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Information Section */}

        {/* Divider */}
        <div className="border-t border-gray-300/50 mb-8"></div>

        {/* Bottom Section - Copyright */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">
              Frame 2 Complex
            </span>{" "}
            - Sports Clubs & Recreation Centers
          </p>
          <p className="text-gray-600 text-xs leading-relaxed">
            Feather Rd, Bradford BD3 9DJ, United Kingdom
          </p>
          <p className="text-gray-500 text-xs">
            © Copyright 2025 Frame 2 Complex. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}