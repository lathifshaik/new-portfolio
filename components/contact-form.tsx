"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formError, setFormError] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Initialize EmailJS with environment variables
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error('EmailJS public key is not defined');
      return;
    }
    emailjs.init(publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !publicKey) {
        throw new Error('EmailJS configuration is incomplete');
      }
      
      // Get template IDs from environment variables
      const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
      const autoReplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      
      if (!contactTemplateId || !autoReplyTemplateId) {
        throw new Error('EmailJS template configuration is incomplete');
      }
      
      // Step 1: Send notification to your email using the Contact Us template
      const contactParams = {
        // These fields must match your Contact Us template variables
        name: formData.name,
        email: formData.email,
        title: formData.subject || 'No subject',
        message: formData.message,
        time: new Date().toLocaleString(),
        // Add these backup fields to ensure compatibility
        to_email: 'i.lathifshaik@gmail.com',
        reply_to: formData.email
      };
      
      console.log('Sending contact notification with params:', contactParams);
      
      const contactResponse = await emailjs.send(
        serviceId,
        contactTemplateId,
        contactParams,
        publicKey
      );
      
      // Step 2: Send auto-reply using the Auto-Reply template
      const autoReplyParams = {
        // These fields must match your Auto-Reply template variables
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Your message',
        message: formData.message,
        // Add these backup fields to ensure compatibility
        to_email: formData.email,
        from_name: 'Abdul Lathif',
        from_email: 'i.lathifshaik@gmail.com',
        reply_to: 'i.lathifshaik@gmail.com'
      };
      
      console.log('Sending auto-reply with params:', autoReplyParams);
      
      const autoReplyResponse = await emailjs.send(
        serviceId,
        autoReplyTemplateId,
        autoReplyParams,
        publicKey
      );

      console.log('Emails sent successfully:', { contactResponse, autoReplyResponse });
      if ((contactResponse.status === 200 || contactResponse.status === 0) && 
          (autoReplyResponse.status === 200 || autoReplyResponse.status === 0)) {
        // Success - show success message and reset form
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Hide success message after delay
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error: unknown) {
      console.error('Error sending email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStatus = (error as any)?.status;
      const errorText = (error as any)?.text;
      
      console.error('Error details:', {
        status: errorStatus,
        text: errorText,
        message: errorMessage
      });
      
      setFormError(`Failed to send message: ${errorMessage}. Please try again later.`);
      setIsSubmitting(false);
    }
  }
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    
    // Clear error when user types
    if (formError) setFormError('')
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto w-full"
    >
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
        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 relative overflow-hidden mx-auto max-w-2xl w-full"
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
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {formError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div custom={0} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>
            <motion.div custom={1} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>
          </div>
          <motion.div custom={2} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject (Optional)
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </motion.div>
          <motion.div custom={3} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 min-h-[120px] sm:min-h-[150px] resize-none text-sm sm:text-base"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div custom={4} variants={inputVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white rounded-full py-3 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
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
    </motion.div>
  )
}
