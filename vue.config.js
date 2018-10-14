const path = require('path');
const WebfontPlugin = require('webpack-webfont').default;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // proxyTable: {
  //   '/api': {
  //     target: 'http://localhost:8081/api',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': '/'
  //     }
  //   }
  // },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      // new WebfontPlugin({
      //   fontName: 'icon-font',
      //   files: resolve('src/assets/fonts/icons/*.svg'),
      //   css: true,
      //   cssFormat: 'css',
      //   cssTemplateClassName: 'icon-font',
      //   cssTemplateFontName: 'icon-font',
      //   cssTemplateFontPath: '../fonts/',
      //   template: resolve('src/assets/fonts/icon-font.less.njk'),
      //   dest: {
      //     fontsDir: resolve('src/assets/fonts'),
      //     stylesDir: resolve('src/assets/style/')
      //   }
      // })
    ]
  }
};
