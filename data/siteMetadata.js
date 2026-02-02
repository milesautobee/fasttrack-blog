/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Fast Track Girl',
  author: 'Kierra',
  headerTitle: 'Fast Track Girl',
  description: 'TikTok Shop affiliate tips, strategies, and real talk from someone doing it daily. Learn how to grow your affiliate business the smart way.',
  language: 'en-us',
  theme: 'light', // system, dark or light
  siteUrl: 'https://fasttrack-blog.vercel.app',
  siteRepo: 'https://github.com/milesautobee/fasttrack-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'hello@fasttrackgirl.com',
  tiktok: 'https://tiktok.com/@FastTrackGirl',
  instagram: 'https://www.instagram.com/fasttrackgirl',
  locale: 'en-US',
  // set to true if you want a navbar fixed to the top
  stickyNav: true,
  analytics: {
    // Analytics can be added later
  },
  newsletter: {
    // Newsletter can be configured later
    provider: 'buttondown',
  },
  comments: {
    // Comments disabled for now
    provider: '', 
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
