'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { motion, FadeInUp } from '@/components/motion'

export default function Footer() {
  return (
    <FadeInUp>
      <footer>
        <div className="mt-16 flex flex-col items-center">
          {/* Social Icons with Stagger */}
          <motion.div 
            className="mb-3 flex space-x-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {[
              { kind: 'mail', href: `mailto:${siteMetadata.email}` },
              { kind: 'instagram', href: siteMetadata.instagram },
            ].filter(s => s.href).map((social, index) => (
              <motion.div
                key={social.kind}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  transition: { type: 'spring', stiffness: 400 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <SocialIcon kind={social.kind} href={social.href} size={6} />
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <motion.span whileHover={{ color: '#fd4987' }}>
              <Link href="/">{siteMetadata.title}</Link>
            </motion.span>
          </motion.div>

          {/* Theme Credit */}
          <motion.div 
            className="mb-8 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Made with 💕 for the TikTok Shop community
          </motion.div>
        </div>
      </footer>
    </FadeInUp>
  )
}
