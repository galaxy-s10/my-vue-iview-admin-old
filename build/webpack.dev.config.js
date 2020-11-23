/*
 * @Author: Tooyama(ZhenYe)
 * @Date: 2020-09-21 11:37:27
 * @LastEditors: Tooyama(ZhenYe)
 * @LastEditTime: 2020-09-25 13:27:40
 * @Description: file content
 * @FilePath: \hammer_admin\build\webpack.dev.config.js
 */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const fs = require('fs')
const package = require('../package.json')

fs.open('./build/env.js', 'w', function(err, fd) {
  const buf = 'export default "development";'
  //fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
  fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {})
})

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vender-exten', 'vender-base'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      title: 'iView admin v' + package.version,
      filename: '../index.html',
      inject: false
    }),
    new CopyWebpackPlugin(
      [
        {
          from: 'src/views/main-components/theme-switch/theme'
          // },
          // {
          //     from: 'src/views/my-components/text-editor/tinymce'
        }
      ],
      {
        ignore: ['text-editor.vue']
      }
    )
  ],
  // devServer:{
  //   host:'192.168.0.133'
  // }
})
