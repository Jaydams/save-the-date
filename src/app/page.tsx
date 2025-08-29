"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Heart, MapPin, Clock, Users, Sparkles } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Countdown } from '@/components/countdown'
import { CalendarButton } from '@/components/calendar-button'
import { RsvpModal } from '@/components/rsvp-modal'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0.3])
  const floatItems = useMemo(() => {
    if (typeof window === 'undefined') return [] as Array<{ x: number; y: number; scale: number; duration: number }>
    const width = window.innerWidth
    const height = window.innerHeight
    return [...Array(20)].map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 10,
    }))
  }, [])
  
  const weddingDate = new Date('2025-11-15T16:00:00')
  
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  } satisfies Variants

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  } satisfies Variants

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 data-[color-mode=purple]:from-purple-50 data-[color-mode=purple]:via-white data-[color-mode=purple]:to-purple-100 data-[color-mode=purple]:dark:from-gray-900 data-[color-mode=purple]:dark:via-purple-900/20 data-[color-mode=purple]:dark:to-gray-900">
      {/* Header */}
      {/* <motion.header 
        className="fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="sm" className="text-teal-600 data-[color-mode=purple]:text-purple-600" />
          <ThemeToggle />
        </div>
      </motion.header> */}

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 pb-40 mb-40 transform-gpu will-change-transform will-change-opacity"
        style={{ y, opacity }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-center bg-cover opacity-35"
          style={{ backgroundImage: 'url("/Couple\'s-image.jpg")' }}
        />
        {/* Upward Fading Gradient Overlay (appears only near bottom) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(to top, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 70%, transparent 80%)'
          }}
        />
        <div
          className="absolute inset-0 z-0 pointer-events-none hidden dark:block"
          style={{
            backgroundImage:
              'linear-gradient(to top, rgba(17,24,39,0.92) 0%, rgba(17,24,39,0.7) 30%, rgba(17,24,39,0.45) 22%, rgba(17,24,39,0.25) 50%, transparent 70%)'
          }}
        />
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {floatItems.map((item, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20 will-change-transform transform-gpu"
              initial={{ x: item.x, y: item.y, scale: item.scale }}
              animate={prefersReducedMotion ? undefined : { y: [0, -30, 0], rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: item.duration, repeat: Infinity, ease: 'linear' }}
            >
              <Heart className="w-4 h-4 text-teal-400 data-[color-mode=purple]:text-purple-400" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="container mx-auto px-4 text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div 
            className="flex justify-center mb-3"
            variants={itemVariants}
          >
            <Logo size="lg" className="text-teal-600 data-[color-mode=purple]:text-purple-600" />
          </motion.div>

          {/* Save the Date */}
          <motion.div variants={itemVariants}>
            <motion.h1 
              className="text-xl md:text-3xl lg:text-4xl font-light text-teal-700 dark:text-teal-300 data-[color-mode=purple]:text-purple-700 data-[color-mode=purple]:dark:text-purple-300 mb-4 tracking-wider uppercase"
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Save the Date
            </motion.h1>
          </motion.div>

          {/* Names */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="font-snell text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-4">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Jojo
              </motion.span>
              
              <motion.span 
                className="text-teal-300 data-[color-mode=purple]:text-purple-700"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
               {" "} & {" "}
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
              L.jay
              </motion.span>
            </h2>
          </motion.div>

          {/* Date */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent data-[color-mode=purple]:via-purple-400 w-20"></div>
              <Clock className="w-6 h-6 text-teal-600 data-[color-mode=purple]:text-purple-600" />
              <div className="h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent data-[color-mode=purple]:via-purple-400 w-20"></div>
            </div>
            <p className="text-xl md:text-3xl font-playfair text-gray-700 dark:text-gray-300 mb-2">
              November 15, 2025
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400">
              Abuja, Nigeria
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={itemVariants} className="mb-12">
            <Countdown targetDate={weddingDate} />
          </motion.div>

          {/* Calendar Buttons */}
          <motion.div variants={itemVariants} className="mb-16">
            <CalendarButton
              title="Dr. Josephine Gaza & Dr. Lucky James Wedding"
              description="Join us for our special day as we unite in love and celebration."
              startDate={weddingDate}
              endDate={new Date(weddingDate.getTime() + (4 * 60 * 60 * 1000))} // 4 hours later
              location="Wedding Venue (Details to follow)"
            />
            
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 mb-10 left-1/2 transform "
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-teal-400 data-[color-mode=purple]:border-purple-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-teal-400 data-[color-mode=purple]:bg-purple-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Details Section */}
      <motion.section 
        className="mt-10 py-16 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <motion.h3 
            className="text-4xl font-snell text-gray-800 dark:text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Celebrate With Us
          </motion.h3>

          {/* <div className="grid md:grid-cols-3 gap-12 mb-16">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Location",
                description: "Venue details will be shared closer to the date",
                delay: 0.3
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Reception",
                description: "Dinner and dancing to follow the ceremony",
                delay: 0.4
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Dress Code",
                description: "Formal attire requested for this special occasion",
                delay: 0.5
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item.delay, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 data-[color-mode=purple]:bg-purple-100 text-teal-600 data-[color-mode=purple]:text-purple-600 rounded-full mb-6">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div> */}

          <motion.div
            className="bg-gradient-to-r from-teal-50 to-teal-100 data-[color-mode=purple]:from-purple-50 data-[color-mode=purple]:to-purple-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 font-playfair italic">
              "Two hearts, one love, one beautiful journey ahead."
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              More details including venue location, accommodation recommendations, 
              and RSVP information will be shared in the coming months.
            </p>

            <div className="mt-6 flex justify-center">
              <RsvpModal />
            </div>
          </motion.div>
        </div>

        
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-8 px-4 bg-teal-900 data-[color-mode=purple]:bg-purple-900 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.div
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Logo size="sm" className="text-white" />
          </motion.div>
          
        </div>
      </motion.footer>
    </div>
  )
}