"use client"

import React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Code, Database, Braces, Layers, Server, Cloud, Brain, Cpu, X } from "lucide-react"

interface Skill {
  name: string
  icon: React.ReactNode
  level: number // 1-5
  description: string
  color: string
}

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: <Code size={24} />,
    skills: [
      {
        name: "Python",
        icon: <Code size={20} />,
        level: 5,
        description: "Expert in Python with experience in data science, ML, and backend development.",
        color: "#3776AB",
      },
      {
        name: "Swift",
        icon: <Code size={20} />,
        level: 4,
        description: "Proficient in Swift for iOS app development with UIKit and SwiftUI.",
        color: "#F05138",
      },
      {
        name: "C/C++",
        icon: <Code size={20} />,
        level: 4,
        description: "Strong knowledge of C/C++ for system programming and algorithm implementation.",
        color: "#00599C",
      },
      {
        name: "Java",
        icon: <Code size={20} />,
        level: 3,
        description: "Experienced in Java for Android development and backend services.",
        color: "#007396",
      },
      {
        name: "Go",
        icon: <Code size={20} />,
        level: 3,
        description: "Working knowledge of Go for building efficient microservices.",
        color: "#00ADD8",
      },
      {
        name: "SQL",
        icon: <Database size={20} />,
        level: 4,
        description: "Expert in SQL for database design, optimization, and complex queries.",
        color: "#4479A1",
      },
      {
        name: "HTML/CSS",
        icon: <Braces size={20} />,
        level: 4,
        description: "Proficient in creating responsive and accessible web interfaces.",
        color: "#E34F26",
      },
      {
        name: "JavaScript",
        icon: <Braces size={20} />,
        level: 4,
        description: "Strong knowledge of modern JavaScript including ES6+ features.",
        color: "#F7DF1E",
      },
    ],
  },
  {
    name: "Frameworks",
    icon: <Layers size={24} />,
    skills: [
      {
        name: "ReactJS",
        icon: <Layers size={20} />,
        level: 4,
        description: "Experienced in building complex UIs with React, Redux, and Next.js.",
        color: "#61DAFB",
      },
      {
        name: "Django",
        icon: <Server size={20} />,
        level: 5,
        description: "Expert in Django for building scalable web applications and REST APIs.",
        color: "#092E20",
      },
      {
        name: "Flask",
        icon: <Server size={20} />,
        level: 4,
        description: "Proficient in Flask for lightweight web services and APIs.",
        color: "#000000",
      },
    ],
  },
  {
    name: "Cloud/DB",
    icon: <Cloud size={24} />,
    skills: [
      {
        name: "AWS",
        icon: <Cloud size={20} />,
        level: 4,
        description: "Experienced with EC2, S3, Lambda, and other AWS services.",
        color: "#FF9900",
      },
      {
        name: "Azure",
        icon: <Cloud size={20} />,
        level: 3,
        description: "Working knowledge of Azure services for cloud deployment.",
        color: "#0089D6",
      },
      {
        name: "MongoDB",
        icon: <Database size={20} />,
        level: 4,
        description: "Proficient in MongoDB for NoSQL database design and operations.",
        color: "#47A248",
      },
      {
        name: "MySQL",
        icon: <Database size={20} />,
        level: 5,
        description: "Expert in MySQL database administration and optimization.",
        color: "#4479A1",
      },
    ],
  },
  {
    name: "AI/ML",
    icon: <Brain size={24} />,
    skills: [
      {
        name: "TensorFlow",
        icon: <Brain size={20} />,
        level: 4,
        description: "Experienced in building and training neural networks with TensorFlow.",
        color: "#FF6F00",
      },
      {
        name: "scikit-learn",
        icon: <Brain size={20} />,
        level: 5,
        description: "Expert in using scikit-learn for machine learning models and pipelines.",
        color: "#F7931E",
      },
      {
        name: "LLMs",
        icon: <Cpu size={20} />,
        level: 4,
        description: "Proficient in working with large language models like GPT for AI applications.",
        color: "#10a37f",
      },
    ],
  },
]

export default function EnhancedSkillSection() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <div ref={ref} className="relative">
      {/* Skill categories */}
      <div className="space-y-16">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black rounded-full p-3">
                {React.cloneElement(category.icon as React.ReactElement, { className: "text-white" })}
              </div>
              <h3 className="text-2xl font-semibold">{category.name}</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.3,
                    delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    type: "spring",
                    stiffness: 300,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="h-1" style={{ backgroundColor: skill.color }}></div>
                  <div className="p-4 flex flex-col items-center text-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <div className="flex items-center justify-center mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-6 mx-0.5 rounded-full ${i < skill.level ? "bg-black" : "bg-gray-200"}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill detail popup */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2" style={{ backgroundColor: selectedSkill.color }}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {selectedSkill.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{selectedSkill.name}</h3>
                  </div>
                  <button onClick={() => setSelectedSkill(null)} className="p-1 rounded-full hover:bg-gray-100">
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Proficiency</span>
                    <span className="text-sm font-medium">
                      {["Beginner", "Basic", "Intermediate", "Advanced", "Expert"][selectedSkill.level - 1]}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: selectedSkill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level * 20}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>

                <p className="text-gray-600">{selectedSkill.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
