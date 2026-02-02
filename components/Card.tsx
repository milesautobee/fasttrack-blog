'use client'

import Image from './Image'
import Link from './Link'
import { motion } from '@/components/motion'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <motion.div
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 20px 40px -15px rgba(253, 73, 135, 0.2)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 25 
      }}
      className={`${
        imgSrc && 'h-full'
      } overflow-hidden rounded-md border-2 border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-900 cursor-pointer`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center md:h-36 lg:h-48 transition-transform duration-500"
                width={544}
                height={306}
              />
            </motion.div>
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="p-6">
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        {href && (
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="inline-block"
          >
            <Link
              href={href}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-base leading-6 font-medium"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  </div>
)

export default Card
