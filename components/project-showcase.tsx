"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  description: string
  image: string
  link?: string
  technologies: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Workzen - AI Recruitment Platform",
    description:
      "Founded and launched an AI recruitment platform streamlining job matching using proprietary algorithms.",
    image: "/workzen.png",
    link: "https://workzen.cc",
    technologies: ["AI", "LLMs", "React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Python LLM Assistant",
    description: "A terminal-based chatbot powered by Llama 3.2 for code generation and debugging assistance.",
    image: "/761B40F0-FD48-4384-8C4A-04AD1CEB839B.png",
    technologies: ["Python", "Llama 3.2", "LLMs", "Terminal UI"],
  },
  {
    id: 3,
    title: "Workout Application",
    description: "A browser-based fitness tracker with real-time pose detection using MediaPipe.",
    image: "/041E9BEC-BB25-49CA-87DC-8412C89D39ED.png",
    technologies: ["Deep Learning", "MediaPipe", "Web", "TensorFlow"],
  },
  {
    id: 4,
    title: "NYC Taxi Demand Anomaly Detection",
    description: "Detected ride demand anomalies using Isolation Forests with business-facing visual dashboards.",
    image: "/F89D8A6F-D9C5-4978-847D-9AFD9DC7FD6F.png",
    technologies: ["Pandas", "scikit-learn", "Isolation Forest", "Data Visualization"],
  },
]

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState<number>(1)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center" ref={ref}>
      <div className="order-2 md:order-1">
        <div className="space-y-4 md:space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeProject === project.id ? "bg-white shadow-xl" : "bg-[#f5f5f7] hover:bg-white hover:shadow-md"
              }`}
              onClick={() => setActiveProject(project.id)}
              whileHover={{ x: activeProject === project.id ? 0 : 5 }}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
            >
              <h3 className={`text-lg sm:text-xl font-semibold mb-1 sm:mb-2`}>{project.title}</h3>
              <p className={`text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base`}>{project.description}</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-2 sm:px-3 py-1 bg-[#f5f5f7] rounded-full text-gray-700 text-[10px] sm:text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && activeProject === project.id && (
                <Button asChild className="mt-4 bg-black hover:bg-gray-800 text-white rounded-full px-4 py-2 text-sm">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Visit Project <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="order-1 md:order-2 mx-auto w-full max-w-md md:max-w-none">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{
              opacity: activeProject === project.id ? 1 : 0,
              rotateY: activeProject === project.id ? 0 : 90,
              scale: activeProject === project.id ? 1 : 0.9,
            }}
            transition={{
              duration: 0.7,
              type: "spring",
              damping: 20,
            }}
            style={{
              display: activeProject === project.id ? "block" : "none",
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end">
              <div className="p-3 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
