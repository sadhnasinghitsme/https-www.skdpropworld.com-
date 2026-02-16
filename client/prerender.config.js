export default {
  routes: [
    '/',
    '/about',
    '/projects',
    '/contact',
    '/services',
    '/faq',
    '/career',
    '/blogs',
    '/inventory',
    '/gallery',
    '/youtube-series',
    '/office-bearers',
    '/global-presence'
  ],
  renderer: '@prerenderer/renderer-puppeteer',
  rendererOptions: {
    maxConcurrentRoutes: 4,
    renderAfterTime: 2000,
    headless: true
  }
}
