module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003/',
        // target: 'https://www.zhengbeining.com/api/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
      '/juhe': {
        target: 'http://apis.juhe.cn/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/juhe': ''
        },
      },
    }
  }
}