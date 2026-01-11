import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    slug: "badminton-smash-technique",
    title: "Mastering the Smash: Advanced Badminton Techniques",
    excerpt: "Take your badminton game to the next level with our expert guide on perfecting your smash technique.",
    image: "/images/badminton/IR5A8724.webp",
    category: "Badminton",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    content: `
      <h2>The Art of the Smash</h2>
      <p>The smash is badminton's most powerful shot, often winning points instantly. However, power isn't everything – technique is key.</p>

      <h3>Positioning and Preparation</h3>
      <p>Get behind the shuttle early. Your body should be sideways to the net, with your non-racket arm pointing at the shuttle for balance and guidance.</p>

      <h3>The Strike</h3>
      <p>Explode upwards, rotating your hips and shoulders. Snap your wrist at the point of impact to generate maximum speed. Aim steeply downwards.</p>
      
      <h3>Recovery</h3>
      <p>Follow through and immediately return to your base position, ready for the next shot.</p>
    `
  },
  {
    id: 2,
    slug: "snooker-cue-action",
    title: "Precision Play: Improving Your Snooker Cue Action",
    excerpt: "Learn the fundamentals of a solid cue action to improve your consistency and potting success rate.",
    image: "/images/snooker/IR5A8646.webp",
    category: "Snooker",
    date: "Dec 25, 2025",
    readTime: "8 min read",
    content: `
      <h2>The Foundation of Snooker</h2>
      <p>A consistent cue action is the bedrock of any good snooker player's game. It ensures that you strike the cue ball exactly where you intend.</p>

      <h3>The Stance</h3>
      <p>Your stance should be stable and comfortable. Keep your chin close to the cue and ensure your bridge arm is straight.</p>

      <h3>The Grip</h3>
      <p>Visualise holding a bird – firm enough so it doesn't fly away, but loose enough not to crush it. A relaxed grip allows for a smoother delivery.</p>

      <h3>Follow Through</h3>
      <p>Don't stop the cue when you hit the white. drive the cue through the ball for better control and power.</p>
    `
  },
  {
    id: 3,
    slug: "football-fitness",
    title: "Match Fit: Building Endurance for 90 Minutes",
    excerpt: "Essential fitness tips and drills to keep you performing at your peak from kickoff to the final whistle.",
    image: "/images/football/IR5A8719.webp",
    category: "Football",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    content: `
      <h2>Endurance is Key</h2>
      <p>Modern football requires high-intensity running combined with technical skill. Fitness is just as important as ball control.</p>

      <h3>Interval Training</h3>
      <p>High-Intensity Interval Training (HIIT) mimics the stop-start nature of a football match. Mix sprints with jogging recovery periods.</p>

      <h3>Core Strength</h3>
      <p>A strong core improves balance and stability, making you harder to knock off the ball.</p>

      <h3>Nutrition and Hydration</h3>
      <p>Fuel your body with the right carbohydrates before a match and stay hydrated to maintain concentration levels.</p>
    `
  },
  {
    id: 4,
    slug: "cricket-mental-game",
    title: "The Mental Game: Concentration in Cricket",
    excerpt: "Cricket is a game of patience and focus. Learn how to maintain concentration for long innings.",
    image: "/images/cricket/IR5A8695.webp",
    category: "Cricket",
    date: "Dec 15, 2025",
    readTime: "9 min read",
    content: `
      <h2>The Batting Mindset</h2>
      <p>Batting is about playing one ball at a time. Switch on when the bowler runs in, and switch off between deliveries to conserve mental energy.</p>

      <h3>Handling Pressure</h3>
      <p>Focus on your routine. Breathe deeply and visualize your success. Trust your training.</p>

      <h3>Staying in the Present</h3>
      <p>Don't worry about the previous ball or the outcome of the match. Focus entirely on the next delivery.</p>
    `
  },
  {
    id: 5,
    slug: "swimming-recovery",
    title: "Active Recovery: Why Swimmers Recover Faster",
    excerpt: "Discover the benefits of swimming for active recovery and how it can help athletes of all sports.",
    image: "https://t4.ftcdn.net/jpg/02/23/81/95/360_F_223819518_cmZHuvTKcEBjxAYoyYf5XNP97ZYbRtxt.webp",
    category: "Swimming",
    date: "Dec 10, 2025",
    readTime: "6 min read",
    content: `
      <h2>Low Impact, High Reward</h2>
      <p>Swimming provides a full-body workout without the impact stress on joints associated with running or contact sports.</p>

      <h3>Circulation Boost</h3>
      <p> The water pressure and horizontal position help improve blood flow, flushing out toxins from tired muscles.</p>

      <h3>Flexibility</h3>
      <p>Moving through a full range of motion in the water helps maintain and improve flexibility.</p>
    `
  },
  {
    id: 6,
    slug: "leisure-relaxation",
    title: "Unwind and Recharge: The Importance of Leisure",
    excerpt: "Taking time to relax is crucial for mental wellness. Explore our leisure rooms for the perfect escape.",
    image: "/images/leisure-rooms/IR5A8648.webp",
    category: "Leisure",
    date: "Dec 5, 2025",
    readTime: "7 min read",
    content: `
      <h2>The Power of Downtime</h2>
      <p>Constant stress can lead to burnout. Taking time for leisure activities is essential for mental health.</p>

      <h3>Social Connection</h3>
      <p>Our leisure rooms provide a space to connect with friends and family, strengthening social bonds.</p>

      <h3>Mental Refresh</h3>
      <p>Engaging in a relaxing activity helps clear the mind and reduces stress levels, leaving you refreshed and energized.</p>
    `
  }
];

export function BlogGrid() {
  return (
    <section className="py-24 px-8 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-purple-900 uppercase tracking-wider mb-4">Latest Stories</p>
            <h2 className="text-5xl md:text-6xl text-purple-900 mb-6">Our Blog</h2>
            <p className="text-xl text-purple-900/70 max-w-2xl mx-auto">
              Expert advice, wellness tips, and inspiring stories from our community
            </p>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-purple-900 text-white text-sm uppercase tracking-wider rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-purple-900/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl text-purple-900 mb-3 group-hover:text-purple-900/80 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-purple-900/70 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-purple-900 font-semibold group-hover:gap-4 transition-all"
                >
                  Read More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
