import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const productionPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: { warnings: false }
  })
]

export default {
  devtool: isDev ? 'source-map' : null,

  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/[name].js',
    publicPath: '/'
  },

  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new HtmlPlugin({
      template: 'html!src/index.html',
      filename: 'index.html',
      chunks: ['index']
    })
  ].concat(isProd ? productionPlugins : []),

  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    jquery: 'jQuery'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap!postcss-loader')
      },
      {
        test: /\.(svg|jpe?g|png|gif)$/,
        loaders: ['file?name=img/[name].[ext]'].concat(isProd ? ['image-webpack'] : [])
      }
    ]
  },

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
}
