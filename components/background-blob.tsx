"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface BackgroundBlobProps {
  color?: string
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  opacity?: number
  blur?: number
  className?: string
}

export default function BackgroundBlob({
  color = "#f3f3f3",
  size = 600,
  top,
  left,
  right,
  bottom,
  opacity = 0.6,
  blur = 70,
  className = "",
}: BackgroundBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    let animationFrameId: number
    let angle = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw blob
      ctx.fillStyle = color
      ctx.beginPath()

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const outerRadius = size * 0.4

      // Create a blob shape with varying radius
      for (let i = 0; i < Math.PI * 2; i += 0.01) {
        const xOffset = Math.cos(i * 3 + angle) * 15
        const yOffset = Math.sin(i * 2 + angle) * 15
        const radius = outerRadius + xOffset + yOffset

        const x = centerX + Math.cos(i) * radius
        const y = centerY + Math.sin(i) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.closePath()
      ctx.fill()

      // Animate
      angle += 0.005
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, size])

  const style: React.CSSProperties = {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    top,
    left,
    right,
    bottom,
    opacity,
    filter: `blur(${blur}px)`,
    zIndex: -1,
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={style}
      className={className}
    >
      <canvas ref={canvasRef} width={size} height={size} />
    </motion.div>
  )
}
