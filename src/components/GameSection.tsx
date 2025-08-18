'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Trophy, RotateCcw } from 'lucide-react'

interface DartPosition {
  x: number
  y: number
  id: number
  score: number
}

export function GameSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const [darts, setDarts] = useState<DartPosition[]>([])
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [dartsThrown, setDartsThrown] = useState(0)
  const maxDarts = 5
  const targetRef = useRef<HTMLDivElement>(null)

  const calculateScore = (x: number, y: number) => {
    const centerX = 150
    const centerY = 150
    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

    if (distance <= 20) return 100 // Bullseye
    if (distance <= 40) return 50  // Inner ring
    if (distance <= 60) return 25  // Middle ring
    if (distance <= 80) return 10  // Outer ring
    return 0 // Miss
  }

  const throwDart = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!gameStarted || dartsThrown >= maxDarts) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const dartScore = calculateScore(x, y)

    const newDart: DartPosition = {
      x,
      y,
      id: Date.now(),
      score: dartScore
    }

    setDarts(prev => [...prev, newDart])
    setScore(prev => prev + dartScore)
    setDartsThrown(prev => prev + 1)
  }

  const startGame = () => {
    setGameStarted(true)
    setShowInstructions(false)
    setDarts([])
    setScore(0)
    setDartsThrown(0)
  }

  const resetGame = () => {
    setGameStarted(false)
    setShowInstructions(true)
    setDarts([])
    setScore(0)
    setDartsThrown(0)
  }

  const getPerformanceMessage = () => {
    if (score >= 300) return "🏆 Flutter Master!"
    if (score >= 200) return "🥇 Dart Expert!"
    if (score >= 100) return "🥈 Good Aim!"
    if (score >= 50) return "🥉 Not Bad!"
    return "🎯 Keep Practicing!"
  }

  return (
    <section id="game" ref={ref} className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Dart Throwing Challenge
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your precision! Click on the dartboard to throw darts and show off your Flutter skills
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Game Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Trophy className="mr-2 text-yellow-400" />
                Game Stats
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Score:</span>
                  <motion.span
                    key={score}
                    initial={{ scale: 1.5, color: "#60A5FA" }}
                    animate={{ scale: 1, color: "#FFFFFF" }}
                    className="text-xl font-bold text-white"
                  >
                    {score}
                  </motion.span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Darts Left:</span>
                  <span className="text-xl font-bold text-white">
                    {maxDarts - dartsThrown}
                  </span>
                </div>

                {dartsThrown === maxDarts && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30"
                  >
                    <div className="text-lg font-bold text-white mb-2">
                      {getPerformanceMessage()}
                    </div>
                    <div className="text-gray-300">
                      Final Score: {score}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {!gameStarted ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold shadow-lg"
                  >
                    Start Game
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg flex items-center justify-center"
                  >
                    <RotateCcw className="mr-2" size={18} />
                    Reset Game
                  </motion.button>
                )}
              </div>
            </div>

            {/* Scoring Guide */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h4 className="text-lg font-bold text-white mb-4">Scoring Guide</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-400">● Bullseye</span>
                  <span className="text-white">100 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-400">● Inner Ring</span>
                  <span className="text-white">50 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-400">● Middle Ring</span>
                  <span className="text-white">25 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-400">● Outer Ring</span>
                  <span className="text-white">10 pts</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dartboard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div
              ref={targetRef}
              onClick={throwDart}
              className={`relative w-80 h-80 rounded-full cursor-crosshair ${
                gameStarted && dartsThrown < maxDarts ? 'hover:scale-105' : ''
              } transition-transform duration-200`}
              style={{
                background: `
                  radial-gradient(circle at center,
                    #dc2626 0%, #dc2626 6.25%,
                    #ea580c 6.25%, #ea580c 12.5%,
                    #ca8a04 12.5%, #ca8a04 18.75%,
                    #16a34a 18.75%, #16a34a 25%,
                    #1f2937 25%, #1f2937 100%
                  )
                `,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            >
              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Target className="text-white/30" size={48} />
              </div>

              {/* Ring Labels */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white/40 text-xs font-bold">100</span>
                </div>
              </div>

              {/* Darts */}
              <AnimatePresence>
                {darts.map((dart) => (
                  <motion.div
                    key={dart.id}
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    exit={{ scale: 0 }}
                    className="absolute w-4 h-4 -translate-x-2 -translate-y-2 pointer-events-none"
                    style={{ left: dart.x, top: dart.y }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full shadow-lg border-2 border-white">
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-black/80 text-white text-xs px-2 py-1 rounded"
                        >
                          +{dart.score}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Instructions Overlay */}
              <AnimatePresence>
                {showInstructions && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center pointer-events-none"
                  >
                    <div className="text-center text-white">
                      <Target size={48} className="mx-auto mb-4 text-blue-400" />
                      <p className="text-lg font-semibold mb-2">Click to Start!</p>
                      <p className="text-sm text-gray-300">Aim for the center</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">🎯 Fun Fact</h3>
            <p className="text-gray-300">
              Just like throwing darts requires precision and practice, developing with Flutter
              requires attention to detail and continuous learning. Both reward accuracy and patience!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl" />
    </section>
  )
}
