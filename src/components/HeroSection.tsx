'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()

  useEffect(() => {
    const mountElement = mountRef.current
    if (!mountElement) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    sceneRef.current = scene
    rendererRef.current = renderer

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountElement.appendChild(renderer.domElement)

    // Create floating Flutter logo shapes
    const geometry = new THREE.BoxGeometry(0.5, 0.1, 0.5)
    const material = new THREE.MeshPhongMaterial({
      color: 0x42a5f5,
      transparent: true,
      opacity: 0.8
    })

    const cubes: THREE.Mesh[] = []
    for (let i = 0; i < 20; i++) {
      const cube = new THREE.Mesh(geometry, material.clone())
      cube.position.x = (Math.random() - 0.5) * 10
      cube.position.y = (Math.random() - 0.5) * 10
      cube.position.z = (Math.random() - 0.5) * 10
      cube.rotation.x = Math.random() * Math.PI
      cube.rotation.y = Math.random() * Math.PI
      scene.add(cube)
      cubes.push(cube)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(ambientLight)
    scene.add(directionalLight)

    camera.position.z = 5

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountElement && renderer.domElement) {
        mountElement.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={mountRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 text-center space-y-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Flutter
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-2">
            Developer
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
        >
          Crafting beautiful cross-platform applications with Flutter & Dart
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(66, 165, 245, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg"
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-colors duration-300"
          >
            Download CV
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  )
}
