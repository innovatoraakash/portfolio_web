'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Trophy, RotateCcw, Zap, Timer, Star, Play, Pause, Space } from 'lucide-react'

interface DartHit {
  x: number
  y: number
  id: number
  score: number
  angle: number
}

interface MovingTarget {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  size: number
  value: number
  color: string
}

export function GameSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const [darts, setDarts] = useState<DartHit[]>([])
  const [movingTargets, setMovingTargets] = useState<MovingTarget[]>([])
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameMode, setGameMode] = useState<'swing' | 'collector' | 'typing'>('swing')
  const [timeLeft, setTimeLeft] = useState(30)
  const [combo, setCombo] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [dartsThrown, setDartsThrown] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // Swinging dart game states
  const [swingAngle, setSwingAngle] = useState(0)
  const [swingDirection, setSwingDirection] = useState(1)
  const [swingSpeed, setSwingSpeed] = useState(2)
  const [isSwinging, setIsSwinging] = useState(false)

  // Collector game states
  const [playerX, setPlayerX] = useState(200)
  const [fallingItems, setFallingItems] = useState<Array<{id: number, x: number, y: number, type: 'dart' | 'flutter'}>>([])

  // Typing game states
  const [currentWord, setCurrentWord] = useState('')
  const [typedWord, setTypedWord] = useState('')
  const [wordsCompleted, setWordsCompleted] = useState(0)

  const maxDarts = 5
  const targetRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  const flutterWords = [
    'Flutter', 'Dart', 'Widget', 'StatefulWidget', 'StatelessWidget', 'BuildContext',
    'MaterialApp', 'Scaffold', 'Container', 'Column', 'Row', 'Stack', 'Positioned',
    'ListView', 'GridView', 'AppBar', 'FloatingActionButton', 'Navigator', 'Route',
    'Animation', 'Tween', 'Controller', 'Provider', 'Riverpod', 'Bloc', 'setState',
    'initState', 'dispose', 'build', 'runApp', 'main', 'async', 'await', 'Future'
  ]

  // Swing animation
  useEffect(() => {
    if (!isSwinging || !gameStarted) return

    const interval = setInterval(() => {
      setSwingAngle(prev => {
        const newAngle = prev + (swingDirection * swingSpeed)
        if (newAngle >= 45 || newAngle <= -45) {
          setSwingDirection(prev => -prev)
        }
        return Math.max(-45, Math.min(45, newAngle))
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isSwinging, gameStarted, swingDirection, swingSpeed])

  // Collector game animation
  useEffect(() => {
    if (gameMode !== 'collector' || !gameStarted) return

    const spawnInterval = setInterval(() => {
      if (fallingItems.length < 5) {
        setFallingItems(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 350,
          y: -20,
          type: Math.random() > 0.3 ? 'dart' : 'flutter'
        }])
      }
    }, 1500)

    const moveInterval = setInterval(() => {
      setFallingItems(prev => prev
        .map(item => ({ ...item, y: item.y + 3 }))
        .filter(item => item.y < 400)
      )
    }, 50)

    return () => {
      clearInterval(spawnInterval)
      clearInterval(moveInterval)
    }
  }, [gameMode, gameStarted, fallingItems.length])

  // Typing game word management
  useEffect(() => {
    if (gameMode === 'typing' && gameStarted && !currentWord) {
      setCurrentWord(flutterWords[Math.floor(Math.random() * flutterWords.length)])
    }
  }, [gameMode, gameStarted, currentWord])

  // Game timer
  useEffect(() => {
    if (!gameStarted) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          setGameStarted(false)
          setIsSwinging(false)
          if (score > bestScore) setBestScore(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, score, bestScore])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) return

      if (gameMode === 'swing') {
        if (e.code === 'Space' && isSwinging && dartsThrown < maxDarts) {
          e.preventDefault()
          throwDart()
        }
      } else if (gameMode === 'collector') {
        if (e.key === 'ArrowLeft' && playerX > 20) {
          setPlayerX(prev => prev - 15)
        } else if (e.key === 'ArrowRight' && playerX < 380) {
          setPlayerX(prev => prev + 15)
        }
      } else if (gameMode === 'typing') {
        if (e.key === 'Backspace') {
          setTypedWord(prev => prev.slice(0, -1))
        } else if (e.key.length === 1) {
          setTypedWord(prev => prev + e.key)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, gameMode, isSwinging, dartsThrown, playerX, currentWord])

  // Check word completion in typing game
  useEffect(() => {
    if (gameMode === 'typing' && typedWord.toLowerCase() === currentWord.toLowerCase()) {
      const wordScore = currentWord.length * 10
      setScore(prev => prev + wordScore)
      setWordsCompleted(prev => prev + 1)
      setCombo(prev => prev + 1)
      setCurrentWord(flutterWords[Math.floor(Math.random() * flutterWords.length)])
      setTypedWord('')
    }
  }, [typedWord, currentWord, gameMode])

  // Check collision in collector game
  useEffect(() => {
    if (gameMode !== 'collector') return

    fallingItems.forEach(item => {
      if (item.y > 320 && item.y < 380 &&
          item.x > playerX - 20 && item.x < playerX + 20) {
        const points = item.type === 'flutter' ? 50 : 20
        setScore(prev => prev + points)
        setCombo(prev => prev + 1)
        setFallingItems(prev => prev.filter(i => i.id !== item.id))
      }
    })
  }, [fallingItems, playerX, gameMode])

  const throwDart = () => {
    const centerX = 200
    const centerY = 200

    // Calculate dart position based on swing angle
    const radians = (swingAngle * Math.PI) / 180
    const dartX = centerX + Math.sin(radians) * 150
    const dartY = centerY + Math.cos(radians) * 150

    const distance = Math.sqrt((dartX - centerX) ** 2 + (dartY - centerY) ** 2)

    let dartScore = 0
    if (distance <= 20) dartScore = 100
    else if (distance <= 40) dartScore = 50
    else if (distance <= 60) dartScore = 25
    else if (distance <= 80) dartScore = 10

    const comboMultiplier = Math.floor(combo / 3) + 1
    const finalScore = dartScore * comboMultiplier

    const newDart: DartHit = {
      x: dartX,
      y: dartY,
      id: Date.now(),
      score: finalScore,
      angle: swingAngle
    }

    setDarts(prev => [...prev, newDart])
    setScore(prev => prev + finalScore)
    setDartsThrown(prev => prev + 1)
    if (dartScore > 0) setCombo(prev => prev + 1)
    else setCombo(0)
  }

  const startGame = (mode: 'swing' | 'collector' | 'typing') => {
    setGameMode(mode)
    setGameStarted(true)
    setGameOver(false)
    setDarts([])
    setScore(0)
    setDartsThrown(0)
    setCombo(0)
    setTimeLeft(mode === 'typing' ? 60 : 30)
    setSwingAngle(0)
    setSwingDirection(1)
    setPlayerX(200)
    setFallingItems([])
    setCurrentWord('')
    setTypedWord('')
    setWordsCompleted(0)

    if (mode === 'swing') {
      setIsSwinging(true)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setIsSwinging(false)
    setDarts([])
    setScore(0)
    setDartsThrown(0)
    setCombo(0)
    setFallingItems([])
    setCurrentWord('')
    setTypedWord('')
    setWordsCompleted(0)
  }

  const getPerformanceMessage = () => {
    if (gameMode === 'typing') {
      if (wordsCompleted >= 20) return "🏆 Flutter Typing Master!"
      if (wordsCompleted >= 15) return "🥇 Dart Coding Pro!"
      if (wordsCompleted >= 10) return "🥈 Widget Expert!"
      if (wordsCompleted >= 5) return "🥉 Getting Started!"
      return "🎯 Keep Practicing!"
    }

    if (score >= 500) return "🏆 Flutter Legend!"
    if (score >= 300) return "🥇 Dart Master!"
    if (score >= 150) return "🥈 Good Skills!"
    if (score >= 50) return "🥉 Not Bad!"
    return "🎯 Keep Trying!"
  }

  return (
    <section id="game" ref={ref} className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Flutter Interactive Games
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto">
            Choose your challenge! Master different skills with keyboard-controlled games.
          </p>
        </motion.div>

        {/* Game Mode Selection */}
        {!gameStarted && !gameOver && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center mb-12"
          >
            <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-6">Choose Your Challenge</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
              {[
                {
                  mode: 'swing' as const,
                  title: 'Swinging Darts',
                  desc: 'Time your spacebar press perfectly!',
                  icon: <Target />,
                  color: 'from-blue-500 to-cyan-500',
                  controls: 'SPACEBAR to throw'
                },
                {
                  mode: 'collector' as const,
                  title: 'Flutter Collector',
                  desc: 'Catch falling Dart logos!',
                  icon: <Zap />,
                  color: 'from-purple-500 to-pink-500',
                  controls: 'ARROW KEYS to move'
                },
                {
                  mode: 'typing' as const,
                  title: 'Code Typing',
                  desc: 'Type Flutter keywords fast!',
                  icon: <Timer />,
                  color: 'from-green-500 to-emerald-500',
                  controls: 'KEYBOARD to type'
                }
              ].map((game) => (
                <motion.button
                  key={game.mode}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startGame(game.mode)}
                  className={`p-6 bg-gradient-to-br ${game.color} rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="text-3xl mb-3">{game.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{game.title}</h4>
                  <p className="text-sm opacity-90 mb-2">{game.desc}</p>
                  <p className="text-xs opacity-75 font-mono">{game.controls}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Game Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 dark:border-gray-600/50">
              <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-4 flex items-center">
                <Trophy className="mr-2 text-yellow-400" />
                Game Stats
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 dark:text-gray-300">Score:</span>
                  <motion.span
                    key={score}
                    initial={{ scale: 1.5, color: "#60A5FA" }}
                    animate={{ scale: 1, color: "#FFFFFF" }}
                    className="text-xl font-bold text-white dark:text-gray-100"
                  >
                    {score.toLocaleString()}
                  </motion.span>
                </div>

                {combo > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 dark:text-gray-300">Combo:</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="flex items-center"
                    >
                      <Star className="text-yellow-400 mr-1" size={16} />
                      <span className="text-yellow-400 font-bold">x{combo}</span>
                    </motion.div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-400 dark:text-gray-300">Time:</span>
                  <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white dark:text-gray-100'}`}>
                    {timeLeft}s
                  </span>
                </div>

                {gameMode === 'swing' && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 dark:text-gray-300">Darts Left:</span>
                    <span className="text-xl font-bold text-white dark:text-gray-100">
                      {maxDarts - dartsThrown}
                    </span>
                  </div>
                )}

                {gameMode === 'typing' && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 dark:text-gray-300">Words:</span>
                    <span className="text-xl font-bold text-white dark:text-gray-100">
                      {wordsCompleted}
                    </span>
                  </div>
                )}

                {bestScore > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 dark:text-gray-300">Best:</span>
                    <span className="text-yellow-400 font-bold">{bestScore.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Game Controls */}
            {gameStarted && (
              <div className="bg-slate-800/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 dark:border-gray-600/50">
                <h4 className="text-lg font-bold text-white dark:text-gray-100 mb-4">Controls</h4>
                <div className="space-y-2 text-sm text-gray-300 dark:text-gray-400">
                  {gameMode === 'swing' && (
                    <>
                      <div className="flex items-center justify-center">
                        <Space className="mr-2" size={20} />
                        <span>Press SPACEBAR to throw dart</span>
                      </div>
                      <div className="text-center text-yellow-400">
                        Swing Angle: {swingAngle.toFixed(1)}°
                      </div>
                    </>
                  )}
                  {gameMode === 'collector' && (
                    <div className="flex justify-center space-x-4">
                      <span>← → Arrow Keys to Move</span>
                    </div>
                  )}
                  {gameMode === 'typing' && (
                    <div className="text-center">
                      <span>Type the word exactly as shown</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Game Results */}
            {(dartsThrown === maxDarts || gameOver) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30"
              >
                <div className="text-2xl font-bold text-white dark:text-gray-100 mb-2">
                  {getPerformanceMessage()}
                </div>
                <div className="text-gray-300 dark:text-gray-400 mb-4">
                  Final Score: {score.toLocaleString()}
                  {gameMode === 'typing' && <span className="ml-2">• Words: {wordsCompleted}</span>}
                  {combo > 0 && <span className="text-yellow-400 ml-2">• Max Combo: {combo}</span>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg flex items-center mx-auto"
                >
                  <RotateCcw className="mr-2" size={18} />
                  Play Again
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Game Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div
              ref={gameRef}
              className="relative w-96 h-96 rounded-2xl bg-slate-800/50 dark:bg-gray-800/50 backdrop-blur-sm border border-slate-700/50 dark:border-gray-600/50 overflow-hidden"
            >
              {/* Swing Dart Game */}
              {gameMode === 'swing' && (
                <>
                  {/* Dartboard */}
                  <div
                    className="absolute inset-4 rounded-full"
                    style={{
                      background: `radial-gradient(circle at center,
                        #dc2626 0%, #dc2626 5%,
                        #ea580c 5%, #ea580c 10%,
                        #ca8a04 10%, #ca8a04 15%,
                        #16a34a 15%, #16a34a 20%,
                        #1f2937 20%, #1f2937 100%
                      )`
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Target className="text-white/30" size={48} />
                    </div>
                  </div>

                  {/* Swinging Dart */}
                  {isSwinging && (
                    <motion.div
                      className="absolute top-8 left-1/2 origin-bottom"
                      style={{
                        transform: `translateX(-50%) rotate(${swingAngle}deg)`,
                        height: '150px'
                      }}
                    >
                      <div className="w-1 h-full bg-gradient-to-b from-gray-400 to-gray-600"></div>
                      <div className="absolute bottom-0 w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white transform -translate-x-1/2"></div>
                    </motion.div>
                  )}

                  {/* Thrown Darts */}
                  <AnimatePresence>
                    {darts.map((dart) => (
                      <motion.div
                        key={dart.id}
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        exit={{ scale: 0 }}
                        className="absolute w-4 h-4 -translate-x-2 -translate-y-2"
                        style={{ left: dart.x, top: dart.y }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white">
                          <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: -30 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded"
                          >
                            +{dart.score}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}

              {/* Collector Game */}
              {gameMode === 'collector' && (
                <>
                  {/* Player */}
                  <motion.div
                    className="absolute bottom-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white"
                    style={{ left: playerX - 16 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />

                  {/* Falling Items */}
                  <AnimatePresence>
                    {fallingItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={`absolute w-6 h-6 rounded-full ${
                          item.type === 'flutter' ? 'bg-gradient-to-br from-blue-400 to-cyan-400' : 'bg-gradient-to-br from-orange-400 to-red-400'
                        }`}
                        style={{ left: item.x - 12, top: item.y }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                          {item.type === 'flutter' ? 'F' : 'D'}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </>
              )}

              {/* Typing Game */}
              {gameMode === 'typing' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <div className="text-2xl font-bold text-white dark:text-gray-100 mb-4">
                      Type This Word:
                    </div>
                    <div className="text-3xl font-mono font-bold text-blue-400 bg-slate-700/50 dark:bg-gray-700/50 px-6 py-3 rounded-lg">
                      {currentWord}
                    </div>
                    <div className="text-xl font-mono text-white dark:text-gray-100 bg-slate-600/50 dark:bg-gray-600/50 px-6 py-3 rounded-lg min-h-[60px] flex items-center justify-center">
                      {typedWord || <span className="text-gray-500 dark:text-gray-400">Start typing...</span>}
                      <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-pulse"></span>
                    </div>
                    {typedWord && (
                      <div className="text-sm">
                        {typedWord.split('').map((char, i) => (
                          <span
                            key={i}
                            className={
                              char.toLowerCase() === currentWord[i]?.toLowerCase()
                                ? 'text-green-400'
                                : 'text-red-400'
                            }
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Instructions Overlay */}
              <AnimatePresence>
                {!gameStarted && !gameOver && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  >
                    <div className="text-center text-white">
                      <Play size={48} className="mx-auto mb-4 text-blue-400" />
                      <p className="text-lg font-semibold mb-2">Choose a Game Mode!</p>
                      <p className="text-sm text-gray-300">Use keyboard controls</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Game Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 dark:border-gray-600/50 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white dark:text-gray-100 mb-4">🎮 Game Tips</h3>
            <div className="grid md:grid-cols-3 gap-4 text-gray-300 dark:text-gray-400">
              <div>
                <strong className="text-blue-400">Swinging Darts:</strong> Watch the pendulum and time your spacebar press for the perfect shot!
              </div>
              <div>
                <strong className="text-purple-400">Flutter Collector:</strong> Use arrow keys to catch blue Flutter logos (50pts) and orange Dart logos (20pts)
              </div>
              <div>
                <strong className="text-green-400">Code Typing:</strong> Type Flutter/Dart keywords quickly and accurately to build your score
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
