'use client'

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { motion, FadeInUp, FadeInLeft, FadeInRight, HeroAnimation } from '@/components/motion'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          {/* Header with Hero Animation */}
          <HeroAnimation>
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <motion.dl 
                  className="space-y-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </motion.dl>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <PageTitle>{title}</PageTitle>
                </motion.div>
              </div>
            </header>
          </HeroAnimation>

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            {/* Author Info - Fade in from left */}
            <FadeInLeft delay={0.3}>
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                    {authorDetails.map((author, index) => (
                      <motion.li 
                        className="flex items-center space-x-2" 
                        key={author.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {author.avatar && (
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Image
                              src={author.avatar}
                              width={38}
                              height={38}
                              alt="avatar"
                              className="h-10 w-10 rounded-full ring-2 ring-primary-500/20"
                            />
                          </motion.div>
                        )}
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                              >
                                {author.twitter
                                  .replace('https://twitter.com/', '@')
                                  .replace('https://x.com/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </motion.li>
                    ))}
                  </ul>
                </dd>
              </dl>
            </FadeInLeft>

            {/* Main Content - Fade in from bottom */}
            <FadeInUp delay={0.4} className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <motion.div 
                className="prose dark:prose-invert max-w-none pt-10 pb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {children}
              </motion.div>
              <motion.div 
                className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.span whileHover={{ x: 2 }} className="inline-block">
                  <Link href={discussUrl(path)} rel="nofollow" className="hover:text-primary-500 transition-colors">
                    Discuss on Twitter
                  </Link>
                </motion.span>
                {` • `}
                <motion.span whileHover={{ x: 2 }} className="inline-block">
                  <Link href={editUrl(filePath)} className="hover:text-primary-500 transition-colors">
                    View on GitHub
                  </Link>
                </motion.span>
              </motion.div>
              {siteMetadata.comments && (
                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </FadeInUp>

            {/* Footer/Sidebar */}
            <FadeInRight delay={0.5}>
              <footer>
                <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                  {tags && (
                    <div className="py-4 xl:py-8">
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Tag text={tag} />
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      {prev && prev.path && (
                        <motion.div
                          whileHover={{ x: -5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Previous Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
                            <Link href={`/${prev.path}`}>&larr; {prev.title}</Link>
                          </div>
                        </motion.div>
                      )}
                      {next && next.path && (
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Next Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
                            <Link href={`/${next.path}`}>{next.title} &rarr;</Link>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
                <motion.div 
                  className="pt-4 xl:pt-8"
                  whileHover={{ x: -5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Link
                    href={`/${basePath}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                    aria-label="Back to the blog"
                  >
                    &larr; Back to the blog
                  </Link>
                </motion.div>
              </footer>
            </FadeInRight>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
