import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

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
    author: "Head Coach Lee",
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
    author: "Pro Player Mark",
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
    author: "Fitness Trainer Sarah",
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
    image: "/images/cricket/IR5A8754.webp",
    category: "Cricket",
    date: "Dec 15, 2025",
    readTime: "9 min read",
    author: "Sports Psychologist Dr. Khan",
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
    image: "/images/swimming/IMG_2355.webp",
    category: "Swimming",
    date: "Dec 10, 2025",
    readTime: "6 min read",
    author: "Physio Tom",
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
    author: "Wellness Coach Emily",
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

export function BlogPost() {
  const { blogId } = useParams();
  const post = blogPosts.find(post => post.slug === blogId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Blog Post Not Found</h1>
          <Link to="/blog" className="text-purple-600 hover:text-purple-800 underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden pt-16 md:pt-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.image})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-8 h-full flex items-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="flex items-center gap-4 mb-4 mt-6">
              <span className="px-4 py-2 bg-purple-900 text-white text-sm uppercase tracking-wider rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#F5F1E8] py-16 mt-16 md:mt-0">
        <div className="max-w-4xl mx-auto px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-purple-900">{post.author}</p>
                <p className="text-sm text-purple-900/60">Author</p>
              </div>
            </div>

            {/* Blog Content */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Text Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-purple-900 prose-p:text-gray-700 prose-strong:text-purple-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Side Image */}
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative w-full max-w-md"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto rounded-2xl shadow-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
                </motion.div>
              </div>
            </div>
          </motion.article>

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}