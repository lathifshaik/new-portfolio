"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Menu, X, ArrowRight, Github, Linkedin, Mail, Phone, Globe } from "lucide-react"
import ChatbotInterface from "@/components/chatbot-interface"
import BackgroundBlob from "@/components/background-blob"
import ParallaxTilt from "@/components/parallax-tilt"
import AppleButton from "@/components/apple-button"
import MagicGenieAnimation from "@/components/magic-genie-animation"
import ScrollReveal from "@/components/scroll-reveal"
import FloatingIcon from "@/components/floating-icon"
import ContactIconButton from "@/components/contact-icon-button"
import ProjectShowcase from "@/components/project-showcase"
import EducationCard from "@/components/education-card"
import ContactForm from "@/components/contact-form"
import AppleSphere from "@/components/apple-sphere"
import FloatingTechElements from "@/components/floating-tech-elements"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const sections = [
    { id: "hero", ref: heroRef, label: "Home" },
    { id: "about", ref: aboutRef, label: "About" },
    { id: "experience", ref: useRef<HTMLDivElement>(null), label: "Experience" },
    { id: "projects", ref: projectsRef, label: "Projects" },
    { id: "skills", ref: skillsRef, label: "Skills" },
    { id: "education", ref: educationRef, label: "Education" },
    { id: "contact", ref: contactRef, label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        if (!section.ref.current) continue

        const offsetTop = section.ref.current.offsetTop
        const offsetHeight = section.ref.current.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId)
    if (section && section.ref.current) {
      section.ref.current.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Floating Tech Elements */}
      <FloatingTechElements />

      {/* Apple-inspired Spheres - hide on small screens */}
      <div className="hidden sm:block">
        <AppleSphere size={200} position={{ top: "10%", left: "5%" }} color="rgba(0, 0, 0, 0.03)" blur={50} />
        <AppleSphere size={300} position={{ top: "40%", right: "5%" }} color="rgba(0, 0, 0, 0.02)" delay={2} blur={70} />
        <AppleSphere
          size={250}
          position={{ bottom: "20%", left: "10%" }}
          color="rgba(0, 0, 0, 0.03)"
          delay={1}
          blur={60}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-lg sm:text-xl md:text-2xl font-semibold">
              Abdul Lathif
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                className={`text-sm font-medium transition-colors ${
                  activeSection === section.id ? "text-black" : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {section.label}
              </motion.button>
            ))}
            <motion.button
              className="text-sm font-medium text-gray-500 hover:text-gray-800"
              onClick={() => setIsChatOpen(true)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Chat with Me
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-5">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`text-sm font-medium py-2 transition-colors ${
                    activeSection === section.id ? "text-black" : "text-gray-500"
                  }`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              ))}
              <button
                className="text-sm font-medium py-2 text-gray-500"
                onClick={() => {
                  setIsChatOpen(true)
                  setIsMobileMenuOpen(false)
                }}
              >
                Chat with Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        id="hero"
        className="min-h-screen pt-16 sm:pt-20 pb-12 flex flex-col justify-center items-center text-center px-4 sm:px-6 relative overflow-hidden"
        style={{ opacity, scale, y }}
      >
        <MagicGenieAnimation delay={0.2} duration={1.2}>
          <ParallaxTilt>
            <img
              src="/3CA15270-648C-4C60-A090-D707F95ACA09_1_201_a.jpeg"
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto object-cover border-4 border-gray-100 shadow-lg"
            />
          </ParallaxTilt>
        </MagicGenieAnimation>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 tracking-tight leading-tight"
        >
          Abdul Lathif Shaik
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-8 font-medium"
        >
          AI Entrepreneur & Computer Science Graduate
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex justify-center gap-6 mb-12"
        >
          <ContactIconButton icon={Mail} label="Email" value="abdullathifsk@icloud.com" delay={0} />
          <ContactIconButton icon={Phone} label="Phone" value="+91 89194 04059" delay={0.1} />
          <ContactIconButton icon={Github} label="GitHub" value="abdullathifsk" delay={0.2} />
          <ContactIconButton icon={Linkedin} label="LinkedIn" value="abdullathifsk" delay={0.3} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <AppleButton onClick={() => scrollToSection("projects")} size="lg">
            View My Work
          </AppleButton>
          <AppleButton onClick={() => setIsChatOpen(true)} variant="secondary" size="lg">
            Chat with My AI Clone
          </AppleButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <motion.button
            onClick={() => scrollToSection("about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <BackgroundBlob color="#f0f0f3" size={400} top="20%" left="5%" opacity={0.4} blur={60} />

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">About Me</h2>
              <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <ParallaxTilt>
                <img
                  src="/3CA15270-648C-4C60-A090-D707F95ACA09_1_201_a.jpeg"
                  alt="About Me"
                  className="rounded-2xl shadow-lg w-full"
                />
              </ParallaxTilt>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl font-semibold mb-4">Innovative AI Entrepreneur</h3>
                <p className="text-gray-600 mb-4">
                  Computer Science (Honours) graduate with expertise in data science, machine learning, and building
                  intelligent systems. Founder of Workzen, an AI-driven recruitment platform.
                </p>
                <p className="text-gray-600 mb-4">
                  Skilled in full-stack development, large language models (LLMs), backend infrastructure, and deploying
                  scalable AI solutions.
                </p>
                <p className="text-gray-600">
                  I've solved 500+ algorithmic challenges across Leetcode and Codeforces and earned the Amazon DeepRacer
                  scholarship for excellence in AI challenges.
                </p>
                <div className="pt-6">
                  <AppleButton onClick={() => scrollToSection("contact")}>
                    Get in Touch <ArrowRight size={16} className="ml-2" />
                  </AppleButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <BackgroundBlob color="#f5f5f7" size={450} top="20%" right="10%" opacity={0.4} blur={60} />

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Experience</h2>
              <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
              <p className="text-gray-600">
                My professional journey in technology and entrepreneurship.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Workzen Experience */}
            <ScrollReveal>
              <motion.div 
                className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                        🚀
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">Founder & AI Product Designer</h3>
                        <p className="text-lg text-gray-600">Workzen</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <div className="px-4 py-1 bg-black text-white rounded-full text-sm">Jan 2025 - Present</div>
                    <a href="https://workzen.cc" target="_blank" rel="noopener noreferrer" className="mt-2 text-gray-600 hover:text-black flex items-center">
                      <Globe size={14} className="mr-1" /> workzen.cc
                    </a>
                  </div>
                </div>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>Founded and launched Workzen, an AI recruitment platform streamlining job matching using proprietary algorithms.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>Developed and deployed a scalable MVP end-to-end, including frontend, backend, and a custom LLM-based recommendation engine (Zen AI).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>Defined product vision and managed design, development, and strategy independently.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>Attracted early users and generated organic interest through an intuitive and efficient UX.</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollReveal>

            {/* ConnectFor Experience */}
            <ScrollReveal>
              <motion.div 
                className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-100"
                whileHover={{ y: -5, boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                        💻
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">Web Developer Intern</h3>
                        <p className="text-lg text-gray-600">ConnectFor</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <div className="px-4 py-1 bg-black text-white rounded-full text-sm">May 2023 - Aug 2023</div>
                    <div className="mt-2 text-gray-600 flex items-center">
                      <Globe size={14} className="mr-1" /> Remote
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>Led a small team in building responsive web pages, increasing session time and usability.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>Designed and integrated Flask APIs to streamline backend data flows.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-black mt-1">•</span>
                    <span>Optimised Python scripts, reducing server response time by 20%.</span>
                  </li>
                </ul>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <BackgroundBlob color="#f5f5f7" size={500} bottom="10%" right="5%" opacity={0.5} blur={70} />

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">My Projects</h2>
              <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
              <p className="text-gray-600">
                Here are some of my recent projects that showcase my skills and expertise.
              </p>
            </div>
          </ScrollReveal>

          <ProjectShowcase />
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 relative">
        <BackgroundBlob color="#e8e8ed" size={400} top="30%" left="10%" opacity={0.4} blur={60} />

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">My Skills</h2>
              <p className="text-gray-600">I've developed expertise in various technologies and methodologies.</p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Languages */}
            <div>
              <ScrollReveal>
                <h3 className="text-2xl font-semibold mb-6">Languages</h3>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🐍</div>
                    <h4 className="font-semibold">Python</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🍎</div>
                    <h4 className="font-semibold">Swift</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">⚙️</div>
                    <h4 className="font-semibold">C/C++</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.25}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">☕</div>
                    <h4 className="font-semibold">Java</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🐹</div>
                    <h4 className="font-semibold">Go</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.35}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🗃️</div>
                    <h4 className="font-semibold">SQL</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.4}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🌐</div>
                    <h4 className="font-semibold">HTML/CSS</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.45}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">📜</div>
                    <h4 className="font-semibold">JavaScript</h4>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>

            {/* Libraries */}
            <div>
              <ScrollReveal>
                <h3 className="text-2xl font-semibold mb-6">Libraries</h3>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🔢</div>
                    <h4 className="font-semibold">NumPy</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🐼</div>
                    <h4 className="font-semibold">Pandas</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">📊</div>
                    <h4 className="font-semibold">Matplotlib</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.25}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">👁️</div>
                    <h4 className="font-semibold">OpenCV</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🧠</div>
                    <h4 className="font-semibold">TensorFlow</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.35}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🔬</div>
                    <h4 className="font-semibold">scikit-learn</h4>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>

            {/* Frameworks */}
            <div>
              <ScrollReveal>
                <h3 className="text-2xl font-semibold mb-6">Frameworks</h3>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">⚛️</div>
                    <h4 className="font-semibold">ReactJS</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🦄</div>
                    <h4 className="font-semibold">Django</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🧪</div>
                    <h4 className="font-semibold">Flask</h4>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>

            {/* Tools */}
            <div>
              <ScrollReveal>
                <h3 className="text-2xl font-semibold mb-6">Tools</h3>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🐳</div>
                    <h4 className="font-semibold">Docker</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🐙</div>
                    <h4 className="font-semibold">GitHub</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🎨</div>
                    <h4 className="font-semibold">Blender</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.25}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🎮</div>
                    <h4 className="font-semibold">Unity</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🐘</div>
                    <h4 className="font-semibold">Hadoop</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.35}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">📨</div>
                    <h4 className="font-semibold">Apache Kafka</h4>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>

            {/* Cloud/Databases */}
            <div>
              <ScrollReveal>
                <h3 className="text-2xl font-semibold mb-6">Cloud/Databases</h3>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">☁️</div>
                    <h4 className="font-semibold">Azure</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">📦</div>
                    <h4 className="font-semibold">AWS S3</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">⚡</div>
                    <h4 className="font-semibold">DynamoDB</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.25}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🍃</div>
                    <h4 className="font-semibold">MongoDB</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🐬</div>
                    <h4 className="font-semibold">MySQL</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.35}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">✨</div>
                    <h4 className="font-semibold">Databricks</h4>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>

            {/* Other */}
            <div>
              <ScrollReveal>
                <h3 className="text-2xl font-semibold mb-6">Other</h3>
              </ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <ScrollReveal direction="up" delay={0.1}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">👥</div>
                    <h4 className="font-semibold">Team Leadership</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.15}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🎨</div>
                    <h4 className="font-semibold">Product Design</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🔄</div>
                    <h4 className="font-semibold">Agile</h4>
                  </motion.div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.25}>
                  <motion.div
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-gray-100"
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl mb-3">🤖</div>
                    <h4 className="font-semibold">LLMs</h4>
                  </motion.div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} id="education" className="py-20 bg-gradient-to-b from-white to-gray-50 relative">
        <BackgroundBlob color="#f0f0f3" size={500} top="20%" right="10%" opacity={0.5} blur={70} />

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Education & Certifications</h2>
              <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <EducationCard />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 relative">
        <BackgroundBlob color="#f0f0f3" size={600} top="10%" right="5%" opacity={0.5} blur={80} />

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Get in Touch</h2>
              <div className="w-20 h-1 bg-black mx-auto mb-8"></div>
              <p className="text-gray-600">Have a project in mind or want to collaborate? Feel free to reach out!</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
            <div className="md:col-span-2 space-y-6">
              <ScrollReveal direction="left">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-semibold mb-4">Contact Info</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <Mail size={18} className="text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">abdullathifsk@icloud.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <Phone size={18} className="text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">+91 89194 04059</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <Linkedin size={18} className="text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <a href="https://www.linkedin.com/in/abdullathifsk/" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-black">linkedin.com/in/abdullathifsk</a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <Github size={18} className="text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">GitHub</p>
                        <a href="https://github.com/abdullathifsk" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-black">github.com/abdullathifsk</a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="left" delay={0.2}>
                <div className="bg-black rounded-2xl p-6 shadow-xl text-white">
                  <h3 className="text-xl font-semibold mb-4">Response Time</h3>
                  <p className="text-gray-300">I typically respond to all inquiries within 24 hours. For urgent matters, please reach out via phone.</p>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="md:col-span-3">
              <ScrollReveal direction="right">
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <FloatingIcon icon={Github} delay={0} />
            <FloatingIcon icon={Linkedin} delay={0.1} />
            <FloatingIcon icon={Mail} delay={0.2} />
            <FloatingIcon icon={Globe} delay={0.3} />
          </div>
          <p className="text-gray-600">© {new Date().getFullYear()} Abdul Lathif Shaik. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot */}
      <AnimatePresence>
        {isChatOpen && <ChatbotInterface onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
