"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, X } from "lucide-react"
import GlassCard from "@/components/glass-card"

interface ChatbotInterfaceProps {
  onClose: () => void
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatbotInterface({ onClose }: ChatbotInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm Abdul's AI clone. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real implementation, you would use the AI SDK to generate a response
      // For now, we'll simulate a response

      // This is a placeholder for the actual AI SDK implementation
      // const { text } = await generateText({
      //   model: openai("gpt-4o"),
      //   prompt: `You are Abdul's AI clone. Respond to: ${input}`,
      //   system: "You are an AI assistant that mimics Abdul's personality. You are friendly, professional, and knowledgeable about technology, especially AI and software development."
      // })

      // Simulating AI response for demo purposes
      setTimeout(() => {
        const aiResponse: Message = {
          role: "assistant",
          content: getSimulatedResponse(input),
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ])
      setIsLoading(false)
    }
  }

  const getSimulatedResponse = (input: string) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hey there! Great to meet you. I'm Abdul's digital twin. What would you like to know about my work or experience?"
    }

    if (lowerInput.includes("project") || lowerInput.includes("work")) {
      return "I've worked on several exciting projects! My portfolio includes AI assistants, smart home applications, and finance tracking tools. Each project focuses on creating intuitive user experiences with cutting-edge technology."
    }

    if (lowerInput.includes("skill") || lowerInput.includes("technology")) {
      return "I specialize in JavaScript/TypeScript, React, Next.js, and Node.js for frontend and backend development. I'm also experienced with Python for machine learning projects and have a strong foundation in UI/UX design principles."
    }

    if (lowerInput.includes("contact") || lowerInput.includes("hire")) {
      return "I'd love to discuss potential collaborations! You can reach out through the contact form on this site, or if you prefer, send me a direct email. I typically respond within 24 hours."
    }

    return "That's an interesting question! As Abdul's AI clone, I try to capture his approach to problem-solving and creativity. Is there something specific about my work or expertise you'd like to know more about?"
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="fixed bottom-0 right-0 md:right-8 md:bottom-8 z-50 w-full md:w-96 h-[500px] md:h-[600px] flex flex-col overflow-hidden"
    >
      <GlassCard className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/50">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-semibold mr-3">
              A
            </div>
            <div>
              <h3 className="font-semibold">Abdul's AI Clone</h3>
              <p className="text-xs text-gray-500">Ask me anything</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-black text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 text-gray-800 rounded-tl-none">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="ml-2 bg-black hover:bg-gray-800 text-white rounded-full h-10 w-10 flex items-center justify-center transition-colors duration-300"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
