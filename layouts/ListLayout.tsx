'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { motion, FadeInUp, HeroAnimation, StaggerContainer, StaggerItem } from '@/components/motion'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <FadeInUp delay={0.3}>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <nav className="flex justify-between">
          {!prevPage && (
            <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
              Previous
            </button>
          )}
          {prevPage && (
            <motion.div whileHover={{ x: -5 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link
                href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
                rel="prev"
                className="text-primary-500 hover:text-primary-600"
              >
                &larr; Previous
              </Link>
            </motion.div>
          )}
          <span className="text-gray-500 dark:text-gray-400">
            {currentPage} of {totalPages}
          </span>
          {!nextPage && (
            <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
              Next
            </button>
          )}
          {nextPage && (
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Link 
                href={`/${basePath}/page/${currentPage + 1}`} 
                rel="next"
                className="text-primary-500 hover:text-primary-600"
              >
                Next &rarr;
              </Link>
            </motion.div>
          )}
        </nav>
      </div>
    </FadeInUp>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero Section */}
        <HeroAnimation>
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <motion.h1 
              className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {title}
            </motion.h1>
            <motion.div 
              className="relative max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label>
                <span className="sr-only">Search articles</span>
                <input
                  aria-label="Search articles"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search articles"
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100 transition-shadow duration-300 focus:shadow-lg focus:shadow-primary-500/20"
                />
              </label>
              <svg
                className="absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>
          </div>
        </HeroAnimation>

        {/* Posts List with Stagger */}
        <StaggerContainer>
          {!filteredBlogPosts.length && (
            <motion.p 
              className="py-8 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No posts found.
            </motion.p>
          )}
          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post
            return (
              <StaggerItem key={path}>
                <motion.li 
                  className="py-4 list-none"
                  whileHover={{ 
                    x: 8,
                    transition: { type: 'spring', stiffness: 300 }
                  }}
                >
                  <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="text-2xl leading-8 font-bold tracking-tight">
                          <Link 
                            href={`/${path}`} 
                            className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                          >
                            {title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tags?.map((tag) => (
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
                  </article>
                </motion.li>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
