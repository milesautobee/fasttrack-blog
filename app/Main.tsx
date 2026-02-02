'use client'

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { motion, FadeInUp, HeroAnimation, StaggerContainer, StaggerItem } from '@/components/motion'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero Section with Animation */}
        <HeroAnimation>
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <motion.h1 
              className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Latest
            </motion.h1>
            <motion.p 
              className="text-lg leading-7 text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {siteMetadata.description}
            </motion.p>
          </div>
        </HeroAnimation>

        {/* Posts List with Stagger Animation */}
        <StaggerContainer className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags } = post
            return (
              <StaggerItem key={slug}>
                <motion.li 
                  className="py-12 list-none"
                  whileHover={{ 
                    x: 8,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl leading-8 font-bold tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {tags.map((tag) => (
                                <motion.span
                                  key={tag}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Tag text={tag} />
                                </motion.span>
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base leading-6 font-medium">
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                            className="inline-block"
                          >
                            <Link
                              href={`/blog/${slug}`}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                              aria-label={`Read more: "${title}"`}
                            >
                              Read more &rarr;
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.li>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>

      {/* View All Posts Link */}
      {posts.length > MAX_DISPLAY && (
        <FadeInUp delay={0.3}>
          <div className="flex justify-end text-base leading-6 font-medium pt-6">
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link
                href="/blog"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                aria-label="All posts"
              >
                All Posts &rarr;
              </Link>
            </motion.div>
          </div>
        </FadeInUp>
      )}

      {/* Newsletter Form */}
      {siteMetadata.newsletter?.provider && (
        <FadeInUp delay={0.4}>
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        </FadeInUp>
      )}
    </>
  )
}
