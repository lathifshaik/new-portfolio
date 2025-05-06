"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Send, X, ChevronDown } from "lucide-react"
import GlassCard from "@/components/glass-card"
import { generateChatResponse } from "@/lib/mistral-client"
import "@/app/chatbot.css"

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
      content: "Hey I'm Abdul Lathif but you can call me Lathif. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  // Check if user has scrolled and determine which buttons to show
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      // Show bottom button if not at bottom
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(prev => !isAtBottom);
    }
  }, []);

  // Scroll to bottom when messages change or when loading state changes
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior
      });
    };

    // Auto-scroll to bottom on new messages
    const timer = setTimeout(() => {
      scrollToBottom('auto');
    }, 100);

    // Add scroll event listener
    const scrollHandler = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(prev => !isAtBottom);
    };

    container.addEventListener('scroll', scrollHandler);
    scrollHandler(); // Initial check

    return () => {
      clearTimeout(timer);
      container.removeEventListener('scroll', scrollHandler);
    };
  }, [messages, isLoading]);

  // Scroll handlers for the buttons
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  const truncateResponse = (text: string, wordLimit: number = 20) => {
    if (!text) return '';
    
    // Split text into words
    const words = text.split(/\s+/);
    
    // If within word limit, return as is
    if (words.length <= wordLimit) return text;
    
    // Take first 20 words and add ellipsis
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const messageHistory = [...messages, userMessage]
      const aiResponse = await generateChatResponse(messageHistory)

      let responseContent = typeof aiResponse.content === "string"
        ? aiResponse.content
        : "Sorry, I couldn't generate a proper response.";

      // Limit response length
      responseContent = truncateResponse(responseContent, 1000);

      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("API Error:", err)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: getFallbackResponse(input),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const getFallbackResponse = (input: string) => {
    const q = input.toLowerCase()

    // Handle potentially sensitive topics with humor and redirection
    if (q.includes('kill') || q.includes('hurt') || q.includes('harm') || q.includes('violence')) {
      return "Oh wow, that got dark fast! 😅 I'm just a friendly AI assistant here to talk about tech, projects, and occasionally share bad jokes. How about we discuss something more uplifting, like my latest project or favorite programming language?"
    }

    if (q.includes("hello") || q.includes("hi")) {
      return "Hey there! I'm Lathif's digital twin. What would you like to know?"
    }
    if (q.includes("project") || q.includes("work")) {
      return "I've worked on AI projects like Workzen, AI assistants, fitness trackers, and data tools."
    }
    if (q.includes("skill") || q.includes("technology")) {
      return "I specialize in Python, React, and LLMs — building full-stack and AI systems."
    }
    if (q.includes("contact") || q.includes("hire")) {
      return "Reach me at abdullathifsk@icloud.com or on LinkedIn: https://www.linkedin.com/in/abdullathifsk/"
    }
    if (q.includes("poetry") || q.includes("poem")) {
      return `**Stardust and Echoes**

In the quiet of the night,
Under the moon's soft glow,
I find myself lost in thought,
In the space between stars we know.

Stars that whisper stories
Of time and cosmic grace,
Dreams that dance in moonlight,
And echoes of a distant place.

We're stardust, you and I,
Bound by threads of cosmic lore,
In this vast and endless sky,
We search for answers evermore.

---

**तारे और ख्वाब**

रात की खामोशी में,
तारों की चमक में,
मैं खोया हुआ हूँ,
सवालों के सागर में.

तारे दूर, चमकदार,
समय और अंतरिक्ष की कहानियाँ बताते हैं,
ख्वाब जो चाँदनी में धुंधलाते हैं,
और दूर के स्थानों की आवाजें.

हम तारों का धूल हैं,
ब्रह्मांड की कहानियों से जुड़े,
इस अनंत आकाश में,
हम हमेशा जवाब ढूँढ़ते हैं।`
    }

    // For other unexpected questions, respond with curiosity and redirection
    if (q.includes('?') && (q.length > 20 || q.split(' ').length > 5)) {
      const responses = [
        "Hmm, that's an interesting thought! I'm more comfortable discussing tech, AI, or creative projects. What's your favorite technology to work with?",
        "You've got me there! I'm better at talking about coding, AI, or my projects. Want to hear about what I've been working on?",
        "*adjusts virtual glasses* That's quite the question! I'm more of a tech and AI enthusiast myself. Have you checked out any interesting tech trends lately?"
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    return "Interesting! Want to know more about my projects, skills, or thoughts? I can also share some terrible programming jokes if you're into that!"
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div 
      ref={chatContainerRef}
      className="fixed bottom-0 right-0 md:right-8 md:bottom-8 z-50 w-full md:w-96 h-[500px] md:h-[600px] shadow-2xl rounded-t-xl md:rounded-xl"
      onClick={(e) => e.stopPropagation()}>
      <GlassCard className="h-full flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/70 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-semibold mr-3">
              AL
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Lathif's Digital Twin</h3>
              <p className="text-xs text-gray-500">Ask me anything about me or my work</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close chat">
            <X size={20} />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <div 
            ref={messagesContainerRef}
            className="h-full overflow-y-auto p-4 pb-84 space-y-4 scroll-container"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarGutter: 'stable',
              overscrollBehavior: 'contain',
              touchAction: 'pan-y',
              maxHeight: 'calc(100vh - 250px)'
            }}
            onTouchStart={(e: React.TouchEvent) => e.stopPropagation()}
            onTouchMove={(e: React.TouchEvent) => {
              e.stopPropagation();
              const { scrollTop, scrollHeight, clientHeight } = e.currentTarget as HTMLDivElement;
              if ((e.touches[0].clientY > 0 && scrollTop === 0) || 
                  (e.touches[0].clientY < 0 && scrollHeight - scrollTop <= clientHeight + 1)) {
                e.preventDefault();
              }
            }}
            onWheel={(e: React.WheelEvent) => {
              const element = e.currentTarget as HTMLDivElement;
              const { scrollTop, scrollHeight, clientHeight } = element;
              const isScrollingUp = e.deltaY < 0;
              const isScrollingDown = e.deltaY > 0;
              if ((isScrollingUp && scrollTop === 0) || 
                  (isScrollingDown && scrollHeight - scrollTop <= clientHeight + 1)) {
                e.stopPropagation();
              }
            }}>
            <div ref={messagesEndRef} style={{ height: '1px' }} />
            {/* Message bubbles */}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-6`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl break-words ${
                  msg.role === "user"
                    ? "bg-black text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            {/* Extra space at the bottom for better scrolling */}
            <div className="h-40"></div>
          </div>
          
          {/* Scroll buttons */}
          <div className="absolute right-4 bottom-20 flex flex-col gap-2">
            <button
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all z-50"
              aria-label="Scroll to top">
              <ChevronDown size={20} style={{ transform: 'rotate(180deg)' }} />
            </button>
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all z-50"
                aria-label="Scroll to bottom">
                <ChevronDown size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Input area - fixed at bottom */}
        <div className="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm absolute bottom-0 left-0 right-0">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/80 shadow-sm"
                rows={Math.min(4, input.split('\n').length)}
                style={{ minHeight: '44px', maxHeight: '160px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
                !input.trim() || isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
              }`}
              aria-label="Send message">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}