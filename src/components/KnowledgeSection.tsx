import { motion } from 'framer-motion';

// Blog articles data
const articles = [
  {
    id: 1,
    image: "/images/badminton/IR5A8724.webp",
    categories: ["Badminton", "Training", "Wellness"],
    title: "Mastering the Smash: Tips from the Pros"
  },
  {
    id: 2,
    image: "/images/snooker/IR5A8646.webp",
    categories: ["Snooker", "Focus", "Technique"],
    title: "The Art of Precision: Improving Your Cue Action"
  },
  {
    id: 3,
    image: "/images/football/IR5A8719.webp",
    categories: ["Football", "Teamwork", "Fitness"],
    title: "Building Endurance for the 90-Minute Game"
  }
];

export function KnowledgeSection() {
  return (
    <section className="bg-[#F5F1E8] py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side - Heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <h2 className="text-gray-700 text-4xl lg:text-5xl leading-tight">
              Access expert fitness and wellness knowledge
            </h2>
          </motion.div>

          {/* Right Side - Article Cards */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]">
                    {/* Image */}
                    <div className="h-64 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="text-gray-600 text-sm"
                          >
                            {category}
                            {idx < article.categories.length - 1 && (
                              <span className="ml-2 text-gray-400">•</span>
                            )}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-gray-800 text-xl leading-snug group-hover:text-purple-900 transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}