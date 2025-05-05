"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface AppleButtonProps extends ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
}

export default function AppleButton({
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: AppleButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-black text-white hover:bg-gray-800"
      case "secondary":
        return "bg-white text-black hover:bg-gray-100 border border-gray-200"
      case "outline":
        return "bg-transparent text-black hover:bg-gray-100 border border-gray-300"
      default:
        return "bg-black text-white hover:bg-gray-800"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm px-4 py-2"
      case "lg":
        return "text-lg px-8 py-4"
      default:
        return "text-base px-6 py-3"
    }
  }

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button
        className={`rounded-full font-medium transition-all duration-300 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}
