"use client"

import type React from "react"

import { motion } from "framer-motion"

interface EnhancedGlassCardProps {
  children: React.ReactNode
  className?: string
  blur?: number
  opacity?: number
  borderGlow?: boolean
  hoverEffect?: boolean
}

export default function EnhancedGlassCard({
  children,
  className = "",
  blur = 10,
  opacity = 0.7,
  borderGlow = false,
  hoverEffect = true,
}: EnhancedGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }
          : {}
      }
      className={`relative overflow-hidden rounded-2xl ${
        borderGlow ? "border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]" : ""
      } ${className}`}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
