const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api/**', {
      target: 'https://shopping.watsonserve.com/', //跨域地址
      secure: false,
      changeOrigin: true,
      onProxyRes: (proxyRes, req, res) => {
        const cookies = proxyRes.headers['set-cookie']
        if (cookies) {
          proxyRes.headers['set-cookie'] = cookies.map(cookie => {
            return cookie.replace('; Secure', '')
          })
        }
      }
    })
  )
}
