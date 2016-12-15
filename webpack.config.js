var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
          template: 'index.html',
          inject: 'body',
          filename: 'index.html'
        }),
    new webpack.HotModuleReplacementPlugin(),
    // plugin to create a glabal constant which can tell the app
    // to behavior as development build
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('DEV')
    }),
  ],
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: false
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    },
    {
      test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
      loader: 'file'
    },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};
