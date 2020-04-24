const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')
const isProd = process.env.NODE_ENV === 'production'

module.exports = (env = {}) => ({
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  entry: path.resolve(process.cwd(), './examples/src/main.ts'),
  output: {
    path: path.resolve(process.cwd(), './examples/element-ui/'),
    publicPath: '',
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: config.alias,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: config.jsexclude,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              appendTsxSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
    }),
  ],
  optimization: {
    minimizer: [],
  },
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    publicPath: '/',
    overlay: true,
  },
})
