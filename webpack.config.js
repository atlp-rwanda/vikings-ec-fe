const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },

  devServer: {
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    hot: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpeg|jpg|webp|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: '**/node_modules',
  },
};
