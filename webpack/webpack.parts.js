const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Creates a developer server
exports.devServer = ({ host, port,BuilDir }) => ({
  watch: true,
  plugins: [
    new Serve({
      // open: true, // This will open the browser automatically
      host: host ||'localhost',
      port: port||3000,
      static: [BuilDir],
      liveReload: true,
      waitForBuild: true,
    })
  ],
})
//generate html file
exports.page = ({ title,template }) => ({
  plugins: [
    new HtmlWebpackPlugin({ 
      title,
      template
    }),
  ],
});

//load css file
exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

// creates a separate css file
// creates separate
exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [{ loader: MiniCssExtractPlugin.loader },
            {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            }
          }, ...loaders],
          sideEffects: true,
          include: /\.module\.css$/
        },
        {
          test: /\.(css|scss)$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            'css-loader'
          ],
          sideEffects: true,
          exclude: /\.module\.css$/
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: '[id].css',
    })],
  };
};

