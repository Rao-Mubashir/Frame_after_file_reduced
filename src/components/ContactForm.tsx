import { motion, useAnimation } from "framer-motion";
import axios from 'axios';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

interface ContactDetails {
  email?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string | null;
}

export function ContactForm({ contact }: { contact?: ContactDetails }) {
  const phone = contact?.phone ?? "+44 1274 722303";
  const email = contact?.email ?? "hello@Frame2Complex.com";
  const address1 = contact?.address_line1 ?? "Feather Rd, Bradford BD3 9DJ";
  const address2 = contact?.address_line2 ?? "United Kingdom";

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: phone,
      subtext: "Mon - Fri, 8am - 8pm",
      gradient: "from-purple-900 to-purple-950",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: email,
      subtext: "We'll respond within 24 hours",
      gradient: "from-purple-950 to-purple-900",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: address1,
      subtext: address2,
      gradient: "from-purple-900 to-purple-950",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: "Mon - Sun: 6am - 11pm",
      subtext: "Public holidays may vary",
      gradient: "from-purple-950 to-purple-900",
    },
  ];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    club: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<
    string | null
  >(null);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const API_URL = '/api/contact/query';
      await axios.post(API_URL, formData);
      setStatus('success');
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        club: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to submit query:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      subject: value,
    });
  };

  return (
    <section className="relative bg-gradient-to-br from-[#F5F1E8] via-white to-[#F5F1E8] py-16 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                {/* Gradient Accent on Hover */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15 + 0.5,
                    duration: 0.8,
                  }}
                />

                {/* Icon with Animated Background */}
                <motion.div
                  className="relative w-16 h-16 mb-6"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-purple-900/10 rounded-2xl group-hover:bg-purple-900/20 transition-all"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div
                    className={`relative w-full h-full bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl mb-3 text-gray-800">
                  {info.title}
                </h3>
                <p className="text-gray-700 mb-2">
                  {info.details}
                </p>
                <p className="text-sm text-gray-500">
                  {info.subtext}
                </p>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full bg-purple-900 rounded-tl-full"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left - Form (3 columns) */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Glassmorphism Card */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-14 shadow-2xl border border-white/50 overflow-hidden">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-purple-900/5 opacity-50"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-purple-900" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl text-gray-800">
                    Send us a message
                  </h2>
                </div>

                <p className="text-gray-600 mb-10 text-lg">
                  Fill out the form below and one of our team
                  members will get back to you shortly.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        htmlFor="firstName"
                        className="block text-sm mb-3 text-gray-700"
                      >
                        First Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          onFocus={() =>
                            setFocusedField("firstName")
                          }
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-900 focus:shadow-lg transition-all duration-300 bg-white/50"
                          placeholder="John"
                        />
                        {focusedField === "firstName" && (
                          <motion.div
                            className="absolute inset-0 border-2 border-purple-900 rounded-2xl pointer-events-none"
                            layoutId="inputHighlight"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        htmlFor="lastName"
                        className="block text-sm mb-3 text-gray-700"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() =>
                          setFocusedField("lastName")
                        }
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-900 focus:shadow-lg transition-all duration-300 bg-white/50"
                        placeholder="Smith"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm mb-3 text-gray-700"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-900 focus:shadow-lg transition-all duration-300 bg-white/50"
                        placeholder="john.smith@example.com"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label
                        htmlFor="phone"
                        className="block text-sm mb-3 text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-900 focus:shadow-lg transition-all duration-300 bg-white/50"
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-7">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <label
                        htmlFor="subject"
                        className="block text-sm mb-3 text-gray-700"
                      >
                        Subject *
                      </label>
                      <Select
                        onValueChange={handleSelectChange}
                        value={formData.subject}
                      >
                        <SelectTrigger
                          id="subject"
                          className="w-full px-5 py-8 border-2 border-gray-200 rounded-2xl focus:border-purple-900 focus:shadow-lg transition-all duration-300 bg-white/50"
                        >
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="membership">Membership Enquiry</SelectItem>
                          <SelectItem value="facilities">Facilities Information</SelectItem>
                          <SelectItem value="tour">Book a Tour</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="booking">Booking Queries</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm mb-3 text-gray-700"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-900 focus:shadow-lg transition-all duration-300 resize-none bg-white/50"
                      placeholder="Tell us how we can help you..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-purple-900 to-purple-950 text-white py-5 rounded-2xl font-medium relative overflow-hidden group shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                    whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {status === 'submitting' ? 'Sending...' : 'Send Message'}
                      <Send className="w-5 h-5" />
                    </span>
                  </motion.button>
                  {status === 'success' && (
                    <div className="p-4 bg-green-100 text-green-700 rounded-xl text-center">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="p-4 bg-red-100 text-red-700 rounded-xl text-center">
                      Failed to send message. Please try again later.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>

          {/* Right - Images and CTAs (2 columns) */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Image Card */}
            <motion.div
              className="relative h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1661333587575-25c87c14f398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBsdXh1cnl8ZW58MXx8fHwxNzY2NDA1NjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Frame 2 Complex Pool"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Floating Text */}
              <motion.div
                className="absolute bottom-8 left-8 right-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-3xl text-white mb-2">
                  Premium Facilities
                </h3>
                <p className="text-white/80">
                  Experience luxury wellness
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Card 1 */}
            <motion.div
              className="relative bg-gradient-to-br from-purple-900 via-purple-900 to-purple-950 rounded-[2.5rem] p-10 text-white shadow-2xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "40px 40px",
                }}
                animate={{
                  backgroundPosition: ["0px 0px", "40px 40px"],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-3xl mb-4">
                  Ready to visit?
                </h3>
                <p className="mb-8 text-white/90 leading-relaxed">
                  Book a complimentary tour of your nearest club
                  and experience our facilities firsthand.
                </p>
                <motion.button
                  className="bg-white text-purple-900 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Club Tour
                </motion.button>
              </div>

              {/* Decorative Element */}
              <motion.div
                className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* CTA Card 2 */}
            <motion.div
              className="relative bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative z-10">
                <h3 className="text-3xl mb-4 text-gray-800">
                  Quick question?
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Check out our FAQ section for instant answers
                  to common questions.
                </p>
                <motion.button
                  className="border-2 border-purple-900 text-purple-900 px-8 py-4 rounded-2xl hover:bg-purple-900 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit FAQs
                </motion.button>
              </div>

              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-900/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}