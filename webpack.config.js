var path = require('path')
var webpack = require('webpack')
var ExtractText = require("extract-text-webpack-plugin");

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
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new ExtractText("app.css"),
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
      config : path.join(__dirname, 'config'),
      resources : path.join(__dirname, 'resources'),
      assets : path.join(__dirname, 'resources/assets'),
      views : path.join(__dirname, 'resources/views'),
      lang : path.join(__dirname, 'resources/lang'),
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
