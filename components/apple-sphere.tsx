"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AppleSphereProps {
  size?: number
  color?: string
  position: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  delay?: number
  duration?: number
  blur?: number
}

export default function AppleSphere({
  size = 100,
  color = "rgba(0, 0, 0, 0.05)",
  position,
  delay = 0,
  duration = 20,
  blur = 30,
}: AppleSphereProps) {
  const sphereRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sphere = sphereRef.current
    if (!sphere) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const rect = sphere.getBoundingClientRect()
      const sphereCenterX = rect.left + rect.width / 2
      const sphereCenterY = rect.top + rect.height / 2

      // Calculate distance from mouse to sphere center
      const distX = clientX - sphereCenterX
      const distY = clientY - sphereCenterY

      // Calculate movement based on distance (inverse relationship)
      const moveX = distX * 0.02
      const moveY = distY * 0.02

      // Apply subtle movement
      sphere.style.transform = `translate(${moveX}px, ${moveY}px)`
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      ref={sphereRef}
      className="absolute rounded-full"
      style={{
        ...position,
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: [0.8, 1.2, 0.9, 1.1, 1],
        y: [0, -20, 0, -10, 0],
      }}
      transition={{
        opacity: { duration: 2, delay },
        scale: { duration: 3, delay },
        y: {
          duration,
          delay,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    />
  )
}
