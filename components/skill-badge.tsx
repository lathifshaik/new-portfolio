"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface SkillBadgeProps {
  name: string
  icon?: LucideIcon
}

export default function SkillBadge({ name, icon: Icon }: SkillBadgeProps) {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-2"
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {Icon && <Icon size={14} />}
      <span className="font-medium text-sm">{name}</span>
    </motion.div>
  )
}
