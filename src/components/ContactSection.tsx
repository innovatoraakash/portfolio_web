'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import * as THREE from 'three'
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Phone } from 'lucide-react'
import emailjs from "@emailjs/browser"


export function ContactSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mountElement = mountRef.current
    if (!mountElement || !inView) return

    // 3D Contact Card Animation
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(300, 300)
    renderer.setClearColor(0x000000, 0)
    mountElement.appendChild(renderer.domElement)

    // Create floating contact icons
    const geometry = new THREE.SphereGeometry(0.3, 16, 16)
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x3b82f6 }), // Blue
      new THREE.MeshPhongMaterial({ color: 0x8b5cf6 }), // Purple
      new THREE.MeshPhongMaterial({ color: 0x06b6d4 }), // Cyan
      new THREE.MeshPhongMaterial({ color: 0x10b981 }), // Green
    ]

    const spheres: THREE.Mesh[] = []
    for (let i = 0; i < 4; i++) {
      const sphere = new THREE.Mesh(geometry, materials[i])
      sphere.position.x = (Math.random() - 0.5) * 4
      sphere.position.y = (Math.random() - 0.5) * 4
      sphere.position.z = (Math.random() - 0.5) * 4
      scene.add(sphere)
      spheres.push(sphere)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(ambientLight)
    scene.add(directionalLight)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)

      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.01
        sphere.rotation.y += 0.01
        sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002
      })

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [inView])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,   // your Service ID
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // your Template ID
      formData,                                     // data from state
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!   // your Public Key
    )

    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  } catch (err) {
    console.error("EmailJS Error:", err)
    alert("Failed to send message. Try again later.")
  } finally {
    setIsSubmitting(false)
  }
  }

  const socialLinks = [
    { icon: <Github size={24} />, href: "https://github.com/innovatoraakash", label: "GitHub", color: "hover:text-gray-400" },
    { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/aakash-ghimire-a36249166", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: <Twitter size={24} />, href: "https://twitter.com", label: "Twitter", color: "hover:text-cyan-400" },
    { icon: <Mail size={24} />, href: "mailto:ghimiresky2@gmail.com", label: "Email", color: "hover:text-green-400" },
  ]

  return (
    <section id="contact" ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your Flutter project to life? Let's discuss your ideas and create exceptional mobile experiences together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* 3D Animation */}
            <div className="flex justify-center lg:justify-start">
              <div ref={mountRef} className="w-72 h-72 flex items-center justify-center" />
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
              >
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">ghimiresky2@gmail.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
              >
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-gray-400">+977 9867204506</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center space-x-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
              >
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Location</h3>
                  <p className="text-gray-400">Kathmandu, Nepal</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 text-gray-400 ${social.color} transition-colors duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                  className="inline-block p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4"
                >
                  <Send className="text-white" size={32} />
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-300 font-medium">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-300 font-medium">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-gray-300 font-medium">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    placeholder="Project inquiry"
                  />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="space-y-2"
                >
                  <label className="text-gray-300 font-medium">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
    </section>
  )
}
