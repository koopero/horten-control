const resolve = require('path').resolve.bind( null, __dirname )
    , GoogleFontsPlugin = require("google-fonts-webpack-plugin")
    , CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: './src/entry/bootstrap.js',
  output: {
    path: resolve( 'dist/' ),
    filename: 'bootstrap.js'
  },
  module : {
    loaders : [
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test : /\.jsx?/,
        include : resolve('src/'),
        loader : 'babel-loader'
      },
      {
        test: /node_modules\/horten\/.*\.js/,
        loader: "babel-loader",
        options: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /deepcolour\/.*\.js/,
        loader: "babel-loader"
      },
      {
        test : /\.json/,
        include : resolve('node_modules/entities'),
        loader: 'json-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=font/[name].[ext]'
      }
    ]
  },
  plugins: [
    new GoogleFontsPlugin({
      fonts: [
        { family: "Source Sans Pro", variants: [ '200', 'regular', '600' ] },
        { family: "Source Code Pro" },
        { family: "Roboto", variants: [ '100', '300', 'regular', '500' ] }

      ]
    }),
    new CopyWebpackPlugin([
      { from: resolve('src/static/') }
    ])
  ]
}
