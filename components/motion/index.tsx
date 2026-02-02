'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

// Fade in from bottom on scroll
export const FadeInUp = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = ''
}: { 
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration, 
      delay,
      ease: [0.25, 0.4, 0.25, 1]
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Fade in from left
export const FadeInLeft = ({ 
  children, 
  delay = 0,
  className = ''
}: { 
  children: ReactNode
  delay?: number
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: [0.25, 0.4, 0.25, 1]
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Fade in from right
export const FadeInRight = ({ 
  children, 
  delay = 0,
  className = ''
}: { 
  children: ReactNode
  delay?: number
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.6, 
      delay,
      ease: [0.25, 0.4, 0.25, 1]
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Simple fade in
export const FadeIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = ''
}: { 
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

// Scale up on hover - for cards
export const HoverLift = ({ 
  children,
  className = ''
}: { 
  children: ReactNode
  className?: string
}) => (
  <motion.div
    whileHover={{ 
      y: -6, 
      scale: 1.02,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 25 
      }
    }}
    whileTap={{ scale: 0.98 }}
    className={className}
  >
    {children}
  </motion.div>
)

// Stagger children animations
export const StaggerContainer = ({ 
  children,
  className = '',
  staggerDelay = 0.1
}: { 
  children: ReactNode
  className?: string
  staggerDelay?: number
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerItem = ({ 
  children,
  className = ''
}: { 
  children: ReactNode
  className?: string
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.4, 0.25, 1]
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Page transition wrapper
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ 
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1]
    }}
  >
    {children}
  </motion.div>
)

// Hero section animation
export const HeroAnimation = ({ 
  children,
  className = ''
}: { 
  children: ReactNode
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1]
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Floating animation for decorative elements
export const Float = ({ 
  children,
  className = ''
}: { 
  children: ReactNode
  className?: string
}) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Pulse animation
export const Pulse = ({ 
  children,
  className = ''
}: { 
  children: ReactNode
  className?: string
}) => (
  <motion.div
    animate={{ 
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
    className={className}
  >
    {children}
  </motion.div>
)

// Export motion for custom usage
export { motion, useScroll, useTransform, AnimatePresence }
