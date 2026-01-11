import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Users, CreditCard, Clock, Dumbbell, Calendar } from 'lucide-react';
import { useState } from 'react';

const faqCategories = [
  {
    icon: Users,
    title: 'Membership',
    questions: [
      {
        question: 'What types of memberships do you offer?',
        answer: 'We offer a range of memberships including Individual, Joint, and Family memberships. Each membership gives you access to our full range of facilities including gym, swimming pools, tennis courts, group exercise classes, and spa facilities. You can also choose from Peak or Off-Peak memberships depending on your schedule.'
      },
      {
        question: 'Can I pause or freeze my membership?',
        answer: 'Yes, you can freeze your membership for a minimum of 2 weeks and up to 3 months per year. A small administrative fee may apply. Simply contact your club reception or manage it through our member portal.'
      },
      {
        question: 'Is there a joining fee?',
        answer: 'Joining fees vary by club and the time of year. We regularly run promotions with reduced or waived joining fees. Contact your nearest club or enquire online for current offers.'
      },
      {
        question: 'Can I use any Frame 2 Complex with my membership?',
        answer: 'Yes! Your membership gives you access to all 97+ Frame 2 Complex clubs across the UK. You can book facilities and attend classes at any of our locations.'
      }
    ]
  },
  {
    icon: Dumbbell,
    title: 'Facilities & Classes',
    questions: [
      {
        question: 'What facilities are included in my membership?',
        answer: 'Your membership includes unlimited access to our state-of-the-art gym, indoor and outdoor swimming pools, tennis and padel courts, group exercise classes, sauna and steam rooms, and our luxurious spa facilities. Many clubs also feature dedicated kids zones and cafés.'
      },
      {
        question: 'How do I book a tennis court or fitness class?',
        answer: 'You can book facilities and classes through our mobile app, online member portal, or at your club reception. Most classes and courts can be booked up to 7 days in advance.'
      },
      {
        question: 'Do you offer personal training?',
        answer: 'Yes, we have experienced personal trainers available at all our clubs. Personal training sessions are charged separately from your membership. Contact your club to book a complimentary consultation.'
      },
      {
        question: 'Are classes suitable for beginners?',
        answer: 'Absolutely! We offer classes for all fitness levels, from beginners to advanced. Our instructors will help you find the right level and modify exercises to suit your abilities.'
      }
    ]
  },
  {
    icon: CreditCard,
    title: 'Payment & Billing',
    questions: [
      {
        question: 'How do I pay for my membership?',
        answer: 'Memberships are paid monthly by Direct Debit. Your first payment includes the joining fee (if applicable) and your first month\'s membership. Subsequent payments are taken on the same date each month.'
      },
      {
        question: 'Can I change my membership type?',
        answer: 'Yes, you can upgrade or downgrade your membership at any time. Changes typically take effect from your next billing date. Speak to your club reception team for assistance.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'We require 30 days written notice to cancel your membership. You can submit your cancellation through our member portal, in writing to your club, or via email. Your membership will remain active until the end of your notice period.'
      }
    ]
  },
  {
    icon: Clock,
    title: 'Opening Hours & Access',
    questions: [
      {
        question: 'What are your opening hours?',
        answer: 'Most clubs are open from 6:00 AM to 11:00 PM Monday to Sunday. Specific hours may vary by club and public holidays. Check your local club\'s hours on our website or app.'
      },
      {
        question: 'Can guests visit the club?',
        answer: 'Yes! Members can bring guests to the club. Guest passes can be purchased at reception or through the member portal. Some membership types include complimentary guest passes each month.'
      },
      {
        question: 'Is there parking available?',
        answer: 'Yes, all our clubs offer free parking for members and guests. Some city-center locations may have limited parking - please check with your specific club.'
      }
    ]
  }
];

export function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-[#F5F1E8]/30 to-white py-24 px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgb(var(--color-purple-900)) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {faqCategories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveCategory(index);
                setActiveQuestion(null);
              }}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-gradient-to-r from-purple-900 to-purple-950 text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-100'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Questions */}
        <motion.div 
          className="space-y-4"
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {faqCategories[activeCategory].questions.map((faq, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-purple-950/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

              {/* Card */}
              <div className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                {/* Question Button */}
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-8 text-left group/button"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-950 rounded-2xl flex items-center justify-center flex-shrink-0"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <HelpCircle className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl text-gray-800 group-hover/button:text-purple-900 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  
                  <motion.div
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 ml-4 group-hover/button:bg-purple-900 group-hover/button:text-white transition-colors"
                    animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeQuestion === index ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {activeQuestion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-0">
                        <div className="pl-16 pr-14">
                          <motion.div
                            className="h-px bg-gradient-to-r from-gray-200 via-purple-900/20 to-gray-200 mb-6"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6 }}
                          />
                          <motion.p
                            className="text-gray-600 leading-relaxed"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-purple-900 to-purple-950 rounded-[2.5rem] p-12 md:p-16 overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '40px 40px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Floating Orb */}
            <motion.div
              className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Our team is here to help. Get in touch with us and we'll respond within 24 hours.
              </p>
              <motion.button
                className="bg-white text-purple-900 px-10 py-5 rounded-2xl hover:bg-gray-100 transition-colors shadow-xl text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
