"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  }

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-black/10 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-black/10 to-transparent rounded-full blur-3xl"
      />

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success overlay */}
        {isSubmitted && (
          <motion.div
            className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <Check size={32} className="text-green-600" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-gray-500">Thank you for reaching out. I'll get back to you soon.</p>
          </motion.div>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div custom={0} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Your name"
              />
            </motion.div>
            <motion.div custom={1} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Your email"
              />
            </motion.div>
          </div>
          <motion.div custom={2} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Subject"
            />
          </motion.div>
          <motion.div custom={3} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Your message"
            ></textarea>
          </motion.div>
          <motion.div custom={4} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3 font-medium flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={16} className="ml-1" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.form>
    </div>
  )
}
