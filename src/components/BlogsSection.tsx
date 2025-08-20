'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, BookOpen } from 'lucide-react'
import { image } from 'framer-motion/client'

const blogs = [
  {
    title: "Debugging with Flutter DevTools: A Comprehensive Guide",
    link:
      "https://medium.com/@ghimiresky2/debugging-with-flutter-devtools-a-comprehensive-guide-301f6da6b9d6",
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*U5oqfE3UJ2g22eBf",
    tags: ["Flutter", "Performance", "DevTools", "Debugging"],
    color: "from-blue-400 to-cyan-400"
  },
  {
    title: "The Ultimate Task Completion Checklist for Flutter Developers",
    link:
      "https://medium.com/@ghimiresky2/the-ultimate-task-completion-checklist-for-flutter-developers-fea4f163a5aa",

    image:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*tMT2dDiqLq60Azca",
    tags: ["Flutter", "Checklist", "Best Practices"],
    color: "from-green-900 to-emerald-400"
  },
  {
    title:
      "Is Dart Ready for Backend/System Development? Weighing the Pros and Cons", 
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*aPjWQu-TIx2tyeVAZdoOtg.png",
    link:
      "https://medium.com/@ghimiresky2/is-dart-ready-for-backend-system-development-weighing-the-pros-and-cons-b46307798066",
    tags: ["Performance", "Dart"],
    color: "from-purple-400 to-pink-400"
  },
  {
    title:
      "Understanding Reference and Value Assignments in Dart: Lists, Classes, and Beyond",
    image: "https://miro.medium.com/v2/resize:fit:960/format:webp/0*l_yX_fdEIAMhNX2J.gif",
    link:
      "https://medium.com/@ghimiresky2/understanding-reference-and-value-assignments-in-dart-lists-classes-and-beyond-401c29be88c6",
    tags: ["Flutter", "Programming", "Dart"],
    color: "from-blue-400 to-cyan-400"
  },
  {
    title:
      "Mastering Future.wait() in Flutter: Boost Your App's Efficiency",
    image: "https://miro.medium.com/v2/resize:fit:960/format:webp/0*SVLU-Hs2GuZXJlms.gif",
    link:
      "https://medium.com/@ghimiresky2/mastering-future-wait-in-flutter-boost-your-apps-efficiency-485fedf0628d",
    tags: ["Dart", "Parallelism", "Best Practices"],
    color: "from-green-900 to-emerald-400"
  }
]

export function BlogSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="blogs" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Latest Blogs
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sharing my learnings and experiences in Flutter development, state management, and app security.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.a
              key={blog.title}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative block"
              style={{ perspective: 1000 }}
            >
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${blog.color} opacity-40`} />

                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                    >
                      <BookOpen size={16} className="text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                    {blog.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-slate-700/50 text-pink-400 rounded-full text-xs font-medium border border-pink-400/20"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex space-x-4">
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-400 group-hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Read More</span>
                    </motion.span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-r ${blog.color} opacity-5 rounded-2xl`} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All Blogs Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://medium.com/@ghimiresky2"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(236, 72, 153, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            View All Blogs
          </motion.a>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  )
}
