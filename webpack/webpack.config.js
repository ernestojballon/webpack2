const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const parts = require('./webpack.parts');

const BuilDir = path.join(__dirname, 'dist');
const AppDir = path.join(__dirname, 'src');

const commonConfig = merge([
  {
    entry: [
      './publicPath.js',  // ← important: this is to redirect cdn assest for url in publicPath.js
      './src/app.js'], // ← important: this is required, where the magic happens in the browser
    output : {
      path : BuilDir,
      filename : 'app.bundle.js',
    },
    module:{
      rules:[
        {
          test : /\.(js|jsx)$/,
          include : AppDir,
          use : ['babel-loader']
        }
      ]
    },
   watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
    },
  },
 parts.page({ title: 'Webpack demo', template: './src/index.html' }),
//  parts.loadCSS(),
 parts.extractCSS(),
]);

const developmentConfig = merge([
  {
    entry: [
      'webpack-plugin-serve/client'
    ], // ← important: this is required, where the magic happens in the browser
    
  },
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
    BuilDir
  })
]);

const productionConfig = merge([]);

const getConfig = () => {
  const mode = process.env.MODE || 'development';
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }
  return merge(commonConfig, developmentConfig, { mode });

}
module.exports = getConfig();