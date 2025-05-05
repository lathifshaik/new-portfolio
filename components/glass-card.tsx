"use client"

import type React from "react"

import { motion } from "framer-motion"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  blur?: number
  opacity?: number
}

export default function GlassCard({ children, className = "", blur = 10, opacity = 0.7 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`relative overflow-hidden rounded-2xl ${className}`}
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
