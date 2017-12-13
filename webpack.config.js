var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './bootstrap/app.js',
  output: {
    path: path.resolve(__dirname, './public/dist/'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.css"),
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.slim.min",
      jQuery: "jquery/dist/jquery.slim.min",
      "window.jQuery": "jquery/dist/jquery.slim.min"
    })
  ],
  resolve: {
    extensions: [' ', '.js', '.vue'],
    alias: {
      App : path.join(__dirname, 'app'),
      views : path.join(__dirname, 'views'),
      routes : path.join(__dirname, 'routes'),
      vue$ : 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: __dirname + '/public',
    host: '0.0.0.0',
    port: 8080,
  },
  devtool: '#eval-source-map'
}

// http://vue-loader.vuejs.org/en/workflow/production.html
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
