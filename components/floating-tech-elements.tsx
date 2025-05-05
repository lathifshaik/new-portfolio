"use client"

import { useEffect, useRef, useState, JSX } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Code, Database, Braces, Layers, Server, Cloud, Brain, Cpu } from "lucide-react"

interface FloatingElement {
  id: number
  icon: JSX.Element
  size: number
  position: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  delay: number
  duration: number
}

export default function FloatingTechElements() {
  const [isClient, setIsClient] = useState(false)
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  useEffect(() => {
    setIsClient(true)
    
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    if (!isClient) return

    const generateElements = (): FloatingElement[] => {
      const icons = [
        <Code key="code" size={24} />,
        <Database key="database" size={24} />,
        <Braces key="braces" size={24} />,
        <Layers key="layers" size={24} />,
        <Server key="server" size={24} />,
        <Cloud key="cloud" size={24} />,
        <Brain key="brain" size={24} />,
        <Cpu key="cpu" size={24} />,
      ]

      return Array.from({ length: 15 }, (_, i) => {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)]
        const size = Math.floor(Math.random() * 30) + 20 // 20-50px

        // Generate random positions
        const position: {
          top?: string
          left?: string
          right?: string
          bottom?: string
        } = {}

        if (Math.random() > 0.5) {
          position.top = `${Math.floor(Math.random() * 100)}%`
        } else {
          position.bottom = `${Math.floor(Math.random() * 100)}%`
        }


        if (Math.random() > 0.5) {
          position.left = `${Math.floor(Math.random() * 100)}%`
        } else {
          position.right = `${Math.floor(Math.random() * 100)}%`
        }


        return {
          id: i,
          icon: randomIcon,
          size,
          position,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 15, // 15-25s
        }
      })
    }


    setFloatingElements(generateElements())
  }, [isClient])

  if (!isClient) {
    return null
  }

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-black/5 dark:text-white/5"
          style={{
            ...element.position,
            width: element.size,
            height: element.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -100, -200],
            rotate: [0, 180],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}
