'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

const skills = [
  { name: "Flutter", level: 95, color: "from-blue-400 to-blue-600", icon: "🦋" },
  { name: "Dart", level: 92, color: "from-cyan-400 to-cyan-600", icon: "🎯" },
  { name: "Firebase", level: 88, color: "from-orange-400 to-orange-600", icon: "🔥" },
  { name: "REST APIs", level: 90, color: "from-green-400 to-green-600", icon: "🔗" },
  { name: "SQLite", level: 85, color: "from-purple-400 to-purple-600", icon: "🗃️" },
  { name: "Git", level: 87, color: "from-red-400 to-red-600", icon: "📚" },
  { name: "C++", level: 65, color: "from-blue-400 to-blue-600", icon: "👨‍💻" },
  { name: "Node.js", level: 65, color: "from-yellow-400 to-yellow-600", icon: "📦" },
]

const technologies = [
  { name: "Flutter", description: "Cross-platform mobile development", icon: "🦋" },
  { name: "Dart", description: "Modern programming language", icon: "🎯" },
  { name: "Firebase/OneSignal", description: "Backend & Analytics, Push Notifications", icon: "🔥" },
  { name: "Riverpod/Bloc", description: "Advanced state management", icon: "🌊" },
  { name: "Hive/Sqlite", description: "Lightweight database", icon: "🍯" },
  { name: "GitHub/GitLab", description: "Version control", icon: "📚" },
  { name: "Animation/Custom UI", description: "UI/UX", icon: "🎨" },
]

export function SkillsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mastering the latest technologies to build exceptional mobile experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Skills Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Technical Proficiency</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <motion.span
                      animate={hoveredSkill === skill.name ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl"
                    >
                      {skill.icon}
                    </motion.span>
                    <span className="text-white font-semibold">{skill.name}</span>
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: (index * 0.1) + 0.5 }}
                    className="text-gray-400 font-medium"
                  >
                    {skill.level}%
                  </motion.span>
                </div>

                <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.5, delay: (index * 0.1) + 0.3, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-white/20 rounded-full blur-sm"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Technologies Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <h3 className="col-span-2 text-2xl font-bold text-white mb-4">Technologies & Tools</h3>
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 cursor-pointer group"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl mb-2"
                >
                  {tech.icon}
                </motion.div>
                <h4 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                  {tech.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Code Editor Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
        >
          <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400 text-sm ml-4">main.dart</span>
          </div>
          <div className="p-6 font-mono text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 2, delay: 1 }}
            >
              <span className="text-purple-400">import</span> <span className="text-green-400">'package:flutter/material.dart'</span><span className="text-gray-400">;</span><br/><br/>
              <span className="text-purple-400">class</span> <span className="text-yellow-400">MyApp</span> <span className="text-purple-400">extends</span> <span className="text-yellow-400">StatelessWidget</span> <span className="text-gray-400">{'{'}</span><br/>
              &nbsp;&nbsp;<span className="text-gray-400">@</span><span className="text-yellow-400">override</span><br/>
              &nbsp;&nbsp;<span className="text-blue-400">Widget</span> <span className="text-green-400">build</span>(<span className="text-blue-400">BuildContext</span> context) <span className="text-gray-400">{'{'}</span><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-yellow-400">MaterialApp</span>(<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;home: <span className="text-yellow-400">Scaffold</span>(<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body: <span className="text-yellow-400">Center</span>(<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;child: <span className="text-yellow-400">Text</span>(<span className="text-green-400">'Hello, Welcome to my Portfolio!'</span>),<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;),<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;);<br/>
              &nbsp;&nbsp;<span className="text-gray-400">{'}'}</span><br/>
              <span className="text-gray-400">{'}'}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
    </section>
  )
}
