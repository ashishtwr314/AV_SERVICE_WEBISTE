const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public',
        sw: '/sw.js',
    },
    images: {
        domains: ['127.0.0.1', 'localhost', 'av-feedback.ddns.net'],
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://av-feedback.ddns.net/:path*' // Proxy to Backend
          }
        ]
    }
})