'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Calendar, MapPin, Code, Award, Users, Rocket } from 'lucide-react'

const experiences = [
  {
    id: 1,
    title: "Senior Associate Flutter Developer",
    company: "F1Soft International",
    location: "Pulchowk Lalitpur, Nepal",
    period: "2024 - Present",
    type: "Full-time",
    achievements: [
      "Actively engaged in designing an open architecture that powers mobile development for F1Soft.",
      "Researched and implemented several core utilities like Logger Architecture, Custom Navigation,SDK development, and Data Management.",
      "Designed a security system that ensures all apps built with F1System meet OWASP-recommended standards.",
      "Mentored 5+ associate developers in Flutter best practices",
      "Actively contributed to the development of 5+ major Flutter applications serving 100K+ users",
      "Built complex UI that includes Animations, Complex UI structure which need high customizations, multilevel transitions,  complex mathematics an vector knowledge."
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Huawei", "Architecture", "Design System", "Security", "SDK", "Custom UI", "Animations"],
    color: "from-blue-400 to-purple-600",
    icon: <Rocket size={24} />
  },
  {
    id: 2,
    title: "Flutter Developer",
    company: "Dynamic Technosoft",
    location: "kathmandu, Nepal",
    period: "2022 - 2024",
    type: "Full-time",
    achievements: [
      "Took lead on ERP app that which served 100+ clients and 1M+ users",
      "Developed real-time location tracking system, SMS server, POS printing like tools",
      "Implemented secure payment gateway of Nepal and India",
      "Implemented purchase and sales, ledger-voucher creation, inventory management, attendance like ERP features",
      "Mobile UI design with complex graphs, charts, table and animations",
      "Developed OTT platform with smooth video streaming",
      "home widget and quick actions for android and IOS"
    ],
    technologies: ["Flutter", "Firebase", "Location", "Socket.io", "REST APIs", "POS", "ERP/HRM"],
    color: "from-green-400 to-emerald-600",
    icon: <Code size={24} />
  },
  {
    id: 3,
    title: "Junior Flutter Developer",
    company: "SlashPlus",
    location: "Kathmandu, Nepal",
    period: "2021 - 2022",
    type: "Full-time",
    achievements: [
      "Developed Subscription-based content management, delivery application system used on different enterprises like BBSM",
      "Specialized in cross-platform development with Flutter",
      "Leaded Ticket Management and printing app for Sajha Bus",
      "Developed Android TV video application real-time updates, GPS positing system using USB g-mouse and auto power on/off system using USBsignals"
    ],
    technologies: ["Flutter", "Dart", "SQLite", "Bloc", "Android TV" , "Socket", "Firebase", "Video Streaming"],
    color: "from-orange-400 to-red-600",
    icon: <Users size={24} />
  }
]

export function ExperienceSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

  return (
    <section id="experience" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Building exceptional mobile experiences through continuous learning and innovation
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline Node */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r ${exp.color} rounded-full border-4 border-slate-900 z-10`}
                  style={{ top: '2rem' }}
                />

                {/* Experience Card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    rotateY: index % 2 === 0 ? 5 : -5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
                  }}
                  onClick={() => setSelectedExperience(selectedExperience === exp.id ? null : exp.id)}
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  } ml-16 md:ml-0 cursor-pointer`}
                  style={{ perspective: 1000 }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          className={`p-3 rounded-full bg-gradient-to-r ${exp.color}`}
                        >
                          {exp.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-gray-300 font-semibold">{exp.company}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${exp.color} text-white`}>
                        {exp.type}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar size={16} className="mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin size={16} className="mr-2" />
                        {exp.location}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-slate-700/50 text-blue-400 rounded-full text-xs font-medium border border-blue-400/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Achievements (Expandable) */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: selectedExperience === exp.id ? 'auto' : '0',
                        opacity: selectedExperience === exp.id ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-700/50 pt-4">
                        <h4 className="text-sm font-semibold text-gray-300 mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={selectedExperience === exp.id ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="text-sm text-gray-400 flex items-start"
                            >
                              <span className="text-green-400 mr-2 mt-1">•</span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Expand Indicator */}
                    <div className="text-center mt-4">
                      <motion.div
                        animate={{ rotate: selectedExperience === exp.id ? 180 : 0 }}
                        className="inline-block text-gray-400 cursor-pointer"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Years Experience", value: "3+", icon: "⏰" },
            { label: "Apps Developed", value: "15+", icon: "📱" },
            { label: "Happy Clients", value: "25+", icon: "😊" },
            { label: "Code Commits", value: "2K+", icon: "💻" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
    </section>
  )
}
