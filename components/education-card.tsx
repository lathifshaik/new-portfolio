"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, Award, Calendar } from "lucide-react"

interface Education {
  school: string
  degree: string
  graduationDate: string
}

interface Certification {
  title: string
  issuer: string
  date: string
}

interface Achievement {
  description: string
}

const education: Education = {
  school: "Lovely Professional University, Punjab, India",
  degree: "Bachelor of Technology (Honours) in Computer Science",
  graduationDate: "Jul 2024",
}

const certifications: Certification[] = [
  {
    title: "CS50X Introduction to Computer Science",
    issuer: "Harvard University",
    date: "Jul 2021",
  },
  {
    title: "CS50P Introduction to Programming with Python",
    issuer: "Harvard University",
    date: "Jun 2022",
  },
  {
    title: "Elements of AI",
    issuer: "University of Helsinki",
    date: "Feb 2022",
  },
  {
    title: "Google Cloud ML & Big Data Fundamentals",
    issuer: "Google",
    date: "Aug 2022",
  },
  {
    title: "NLP Specialisation",
    issuer: "Coursera",
    date: "Apr 2023",
  },
]

const achievements: Achievement[] = [
  {
    description: "Solved 500+ algorithmic challenges across Leetcode and Codeforces.",
  },
  {
    description: "Earned the Amazon DeepRacer scholarship for excellence in AI challenges.",
  },
]

export default function EducationCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <div ref={ref} className="space-y-6 md:space-y-8">
      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="bg-black text-white p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap size={24} />
            <h3 className="text-xl sm:text-2xl font-semibold">Education</h3>
          </div>
          <h4 className="text-lg sm:text-xl font-medium">{education.school}</h4>
          <p className="text-gray-300 mt-1 text-sm sm:text-base">{education.degree}</p>
        </div>
        <div className="p-4 sm:p-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar size={16} />
            <span>Graduated</span>
          </div>
          <span className="font-medium">{education.graduationDate}</span>
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="bg-black text-white p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award size={24} />
            <h3 className="text-xl sm:text-2xl font-semibold">Certifications</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="font-medium text-sm sm:text-base">{cert.title}</span>
                  <span className="text-xs sm:text-sm text-gray-500">{cert.date}</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="bg-black text-white p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award size={24} />
            <h3 className="text-2xl font-semibold">Achievements</h3>
          </div>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-black mt-1">•</span>
                <span>{achievement.description}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
