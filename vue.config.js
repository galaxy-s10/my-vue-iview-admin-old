module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3003/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}