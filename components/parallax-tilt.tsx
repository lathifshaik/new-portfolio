"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface ParallaxTiltProps {
  children: React.ReactNode
  className?: string
  perspective?: number
  tiltMaxAngle?: number
  scale?: number
  transitionSpeed?: number
  gyroscope?: boolean
}

export default function ParallaxTilt({
  children,
  className = "",
  perspective = 1000,
  tiltMaxAngle = 10,
  scale = 1.05,
  transitionSpeed = 400,
  gyroscope = true,
}: ParallaxTiltProps) {
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const centerX = rect.left + width / 2
    const centerY = rect.top + height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateX = (tiltMaxAngle * mouseY) / (height / 2)
    const rotateY = (-tiltMaxAngle * mouseX) / (width / 2)

    setTiltX(rotateX)
    setTiltY(rotateY)
  }

  // Handle device orientation for gyroscope effect
  useEffect(() => {
    if (!gyroscope) return

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isHovering || !e.beta || !e.gamma) return

      const beta = Math.min(Math.max(e.beta, -45), 45) // Limit beta to -45 to 45 degrees
      const gamma = Math.min(Math.max(e.gamma, -45), 45) // Limit gamma to -45 to 45 degrees

      const rotateX = (tiltMaxAngle * beta) / 45
      const rotateY = (tiltMaxAngle * gamma) / 45

      setTiltX(rotateX)
      setTiltY(rotateY)
    }

    window.addEventListener("deviceorientation", handleDeviceOrientation)
    return () => window.removeEventListener("deviceorientation", handleDeviceOrientation)
  }, [isHovering, tiltMaxAngle, gyroscope])

  return (
    <motion.div
      ref={elementRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setTiltX(0)
        setTiltY(0)
      }}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: `${tiltX}deg`,
        rotateY: `${tiltY}deg`,
        scale: isHovering ? scale : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: transitionSpeed / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}
