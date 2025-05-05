"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

interface TimelineItem {
  title: string
  company: string
  location: string
  period: string
  description: string[]
}

const experiences: TimelineItem[] = [
  {
    title: "Founder & AI Product Designer",
    company: "Workzen",
    location: "Remote, India",
    period: "Jan 2025 – Present",
    description: [
      "Founded and launched Workzen, an AI recruitment platform streamlining job matching using proprietary algorithms.",
      "Developed and deployed a scalable MVP end-to-end, including frontend, backend, and a custom LLM-based recommendation engine (Zen AI).",
      "Defined product vision and managed design, development, and strategy independently.",
      "Attracted early users and generated organic interest through an intuitive and efficient UX.",
      "Website: workzen.cc",
    ],
  },
  {
    title: "Web Developer Intern",
    company: "ConnectFor",
    location: "Remote",
    period: "May 2023 – Aug 2023",
    description: [
      "Led a small team in building responsive web pages, increasing session time and usability.",
      "Designed and integrated Flask APIs to streamline backend data flows.",
      "Optimised Python scripts, reducing server response time by 20%.",
    ],
  },
]

export default function ExperienceTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <div ref={ref} className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-black to-gray-300"></div>

      {/* Timeline items */}
      <div className="space-y-12 relative">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            className="relative pl-12"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-0 top-1 w-8 h-8 rounded-full bg-black flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: index * 0.2 + 0.2,
              }}
            >
              <Briefcase size={16} className="text-white" />
            </motion.div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-gray-100">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                <h3 className="text-2xl font-semibold">{experience.title}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Calendar size={14} />
                  <span>{experience.period}</span>
                </div>
              </div>

              <h4 className="text-lg text-gray-700 mb-4">
                {experience.company} | {experience.location}
              </h4>

              <ul className="space-y-2 text-gray-600">
                {experience.description.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.3 + i * 0.1 }}
                  >
                    <span className="text-black mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
