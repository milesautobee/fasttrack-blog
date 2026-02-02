interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'TikTok Shop Affiliate Guide',
    description: `Everything you need to know about becoming a successful TikTok Shop affiliate. From getting started to scaling your income.`,
    imgSrc: '/static/images/tiktok-guide.jpg',
    href: '/blog',
  },
  {
    title: 'Join the Community',
    description: `Connect with other affiliates in our Clubhouse room. Real talk, live Q&As, and support from people who get it.`,
    imgSrc: '/static/images/community.jpg',
    href: 'https://clubhouse.com',
  },
]

export default projectsData
