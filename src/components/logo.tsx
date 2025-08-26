import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className} text-center`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      > */}
        {/* Circular border */}
        {/* <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        /> */}
        
        {/* Leaf decorations */}
        {/* <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        > */}
          {/* Top leaves */}
          {/* <path
            d="M25 15 Q30 10, 35 15 Q30 20, 25 15"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M30 12 Q35 7, 40 12 Q35 17, 30 12"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M35 9 Q40 4, 45 9 Q40 14, 35 9"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          /> */}
          
          {/* Bottom leaves */}
          {/* <path
            d="M75 85 Q70 90, 65 85 Q70 80, 75 85"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M70 88 Q65 93, 60 88 Q65 83, 70 88"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M65 91 Q60 96, 55 91 Q60 86, 65 91"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          /> */}
        {/* </motion.g> */}

        {/* Stylized JL monogram */}
        {/* <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        > */}
          {/* J */}
          {/* <path
            d="M35 35 Q40 30, 45 35 L45 55 Q45 65, 35 65 Q25 65, 25 55"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="font-playfair"
          /> */}
          
          {/* L */}
          {/* <path
            d="M55 35 L55 60 L70 60"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="font-playfair"
          /> */}
          
          {/* Connecting flourish */}
          {/* <path
            d="M45 50 Q55 45, 55 50"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          /> */}
        {/* </motion.g> */}
      {/* </svg> */}
      <Image src="/logo.png" alt="Logo" width={100} height={100} className='text-center mx-auto'/>
    </motion.div>
  )
}