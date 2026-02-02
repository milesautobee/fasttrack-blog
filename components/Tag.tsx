'use client'

import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="inline-block px-3 py-1 text-xs font-medium uppercase rounded-full 
                 bg-primary-100 text-primary-700 
                 dark:bg-primary-900/30 dark:text-primary-300
                 hover:bg-primary-200 dark:hover:bg-primary-800/40
                 transition-all duration-200 ease-out
                 hover:shadow-sm hover:shadow-primary-500/20"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
