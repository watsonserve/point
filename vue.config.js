const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: 'production' === process.env.NODE_ENV ? '//zh-cn.static-res.store/wiki/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://wiki.watsonserve.com',
        secure: false
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
};
