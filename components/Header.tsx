'use client'

import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { motion, useScroll, useTransform } from '@/components/motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  // Transform values based on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  )
  
  const headerBackgroundDark = useTransform(
    scrollY,
    [0, 100],
    ['rgba(3, 7, 18, 0)', 'rgba(3, 7, 18, 0.95)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  let headerClass = 'flex items-center w-full justify-between py-6 transition-all duration-300'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }
  if (isScrolled) {
    headerClass += ' backdrop-blur-md bg-white/90 dark:bg-gray-950/90 shadow-sm'
  }

  return (
    <motion.header 
      className={headerClass}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <motion.div 
          className="flex items-center justify-between"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="mr-3"
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Logo />
          </motion.div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <motion.div 
              className="hidden h-6 text-2xl font-semibold sm:block bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {siteMetadata.headerTitle}
            </motion.div>
          ) : (
            siteMetadata.headerTitle
          )}
        </motion.div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.4 + index * 0.1 
                }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 relative group"
                >
                  {link.title}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                </Link>
              </motion.div>
            ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <SearchButton />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <ThemeSwitch />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <MobileNav />
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
