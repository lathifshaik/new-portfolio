"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FloatingIconProps {
  icon: LucideIcon
  size?: number
  color?: string
  className?: string
  delay?: number
}

export default function FloatingIcon({
  icon: Icon,
  size = 24,
  color = "currentColor",
  className = "",
  delay = 0,
}: FloatingIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay + Math.random(),
        }}
      >
        <Icon size={size} color={color} />
      </motion.div>
    </motion.div>
  )
}
