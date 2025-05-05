"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay,
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1],
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon size={20} color={color} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 min-w-[200px] z-10"
          >
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p className="font-medium">{value}</p>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
