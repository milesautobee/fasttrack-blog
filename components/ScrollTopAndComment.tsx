'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from '@/components/motion'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed right-8 bottom-8 hidden flex-col gap-3 md:flex z-50"
        >
          {siteMetadata.comments?.provider && (
            <motion.button
              aria-label="Scroll To Comment"
              onClick={handleScrollToComment}
              className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-primary-100 hover:text-primary-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          )}
          <motion.button
            aria-label="Scroll To Top"
            onClick={handleScrollTop}
            className="rounded-full bg-primary-500 p-2 text-white transition-all hover:bg-primary-600 shadow-lg shadow-primary-500/30"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollTopAndComment
