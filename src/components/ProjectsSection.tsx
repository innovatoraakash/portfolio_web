'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Smartphone, Tablet } from 'lucide-react'

const projects = [
  {
    title: "Disha - Your navMate",
    description: "Disha brings you a powerful toolkit packed into one simple app — Compass, Level Meter, Altitude Tracker",
    tech: ["Flutter", "Dart", "Paint", "Sensors"],
    image: "https://play-lh.googleusercontent.com/7uWBzIMWtSkSam8LrmcoE6Jgpia7tTetsXr2egAdIKFp9DbpQn4zWGF1YSlwWgguXw=w480-h300-rw",
    github: "https://github.com",
    demo: "https://play.google.com/store/apps/details?id=com.aakash.disha",
    color: "from-blue-400 to-cyan-400"
  },
  {
    title: "Sensora - Noise, Light, Metal",
    description: "Sensor Kit helps you monitor your surroundings with real-time data from your phone's built-in sensors.",
    tech: ["Flutter", "TensorFlow", "Sensors","Charts"],
    image: "https://play-lh.googleusercontent.com/vfV5xSUglqVfRivJCPdi9iz6K3jevBzLu2At07q-G-IL1r9HGi-JAoiab9IHa8qv-Wg=w480-h960-rw?w=400&h=300&fit=crop",
    github: "https://github.com",
    demo: "https://play.google.com/store/apps/details?id=com.aakash.sensora",
    color: "from-green-400 to-emerald-400"
  },
  {
    title: "Social Media Dashboard",
    description: "Beautiful dashboard for managing multiple social media accounts with analytics and scheduling features.",
    tech: ["Flutter", "GraphQL", "Riverpod", "Charts"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    color: "from-purple-400 to-pink-400"
  }
]

export function ProjectsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="projects" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Showcasing innovative Flutter applications with cutting-edge features and beautiful UI/UX
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
              style={{ perspective: 1000 }}
            >
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />

                  {/* Device Icons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                    >
                      <Smartphone size={16} className="text-white" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -360 }}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                    >
                      <Tablet size={16} className="text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-slate-700/50 text-blue-400 rounded-full text-xs font-medium border border-blue-400/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Demo</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-5 rounded-2xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 35px rgba(66, 165, 245, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  )
}
