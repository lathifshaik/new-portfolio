"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ContactIconButtonProps {
  icon: LucideIcon
  label: string
  value: string
  color?: string
  delay?: number
}

export default function ContactIconButton({
  icon: Icon,
  label,
  value,
  color = "#000",
  delay = 0,
}: ContactIconButtonProps) {
  const handleClick = () => {
    if (label === 'Email') {
      window.location.href = `mailto:${value}`
    } else if (label === 'Phone') {
      // Show phone number in a simple alert for copy/paste
      alert(`Phone: ${value}`)
    } else if (label === 'GitHub') {
      window.open(`https://github.com/${value}`, '_blank')
    } else if (label === 'LinkedIn') {
      window.open(`https://linkedin.com/in/${value}`, '_blank')
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      }}
      onClick={handleClick}
      className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 group relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon size={20} color={color} />
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {label === 'Email' ? 'Email me' : label === 'Phone' ? 'Click to view' : `View on ${label}`}
      </span>
    </motion.button>
  )
}
