"use client"

import React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Code,
  Database,
  Braces,
  Layers,
  Server,
  Cloud,
  Globe,
  Brain,
  Cpu,
  Terminal,
  Workflow,
  PenTool,
  Users,
  GitBranch,
} from "lucide-react"

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: {
    name: string
    icon: React.ReactNode
  }[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: <Code size={24} />,
    skills: [
      { name: "Python", icon: <Code size={16} /> },
      { name: "Swift", icon: <Code size={16} /> },
      { name: "C/C++", icon: <Code size={16} /> },
      { name: "Java", icon: <Code size={16} /> },
      { name: "Go", icon: <Code size={16} /> },
      { name: "SQL", icon: <Database size={16} /> },
      { name: "HTML/CSS", icon: <Braces size={16} /> },
      { name: "JavaScript", icon: <Braces size={16} /> },
    ],
  },
  {
    name: "Frameworks",
    icon: <Layers size={24} />,
    skills: [
      { name: "ReactJS", icon: <Layers size={16} /> },
      { name: "Django", icon: <Server size={16} /> },
      { name: "Flask", icon: <Server size={16} /> },
    ],
  },
  {
    name: "Cloud/DB",
    icon: <Cloud size={24} />,
    skills: [
      { name: "AWS", icon: <Cloud size={16} /> },
      { name: "Azure", icon: <Cloud size={16} /> },
      { name: "MongoDB", icon: <Database size={16} /> },
      { name: "MySQL", icon: <Database size={16} /> },
    ],
  },
  {
    name: "AI/ML",
    icon: <Brain size={24} />,
    skills: [
      { name: "TensorFlow", icon: <Brain size={16} /> },
      { name: "scikit-learn", icon: <Brain size={16} /> },
      { name: "LLMs", icon: <Cpu size={16} /> },
    ],
  },
  {
    name: "Tools",
    icon: <Terminal size={24} />,
    skills: [
      { name: "Docker", icon: <Terminal size={16} /> },
      { name: "GitHub", icon: <GitBranch size={16} /> },
      { name: "Blender", icon: <PenTool size={16} /> },
      { name: "Unity", icon: <Globe size={16} /> },
    ],
  },
  {
    name: "Other",
    icon: <Users size={24} />,
    skills: [
      { name: "Team Leadership", icon: <Users size={16} /> },
      { name: "Product Design", icon: <PenTool size={16} /> },
      { name: "Agile", icon: <Workflow size={16} /> },
    ],
  },
]

export default function SkillIconGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <div ref={ref} className="space-y-12">
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-black rounded-full p-2">
              {React.cloneElement(category.icon as React.ReactElement, { className: "text-white" })}
            </div>
            <h3 className="text-xl font-semibold">{category.name}</h3>
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center gap-2 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">{skill.icon}</div>
                <span className="font-medium text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
