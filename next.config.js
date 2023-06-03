const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  poweredByHeader: false,

  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
})
