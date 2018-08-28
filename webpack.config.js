const resolve = require('path').resolve.bind( null, __dirname )
const GoogleFontsPlugin = require("google-fonts-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')


// const extractLess = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     allChunks: true,
//     disable: process.env.NODE_ENV === "development"
// });

module.exports = {
  devtool: 'source-map',
  entry: ['./src/entry/bootstrap.js','./src/style/index.less'],
  output: {
    path: resolve( 'dist/' ),
    filename: '[name].js'
  },
  module : {
    loaders : [
      // {
      //   test: /\.less$/,
      //   use: extractLess.extract({
      //     use: [
      //       { loader: "css-loader",options:{ sourceMap: true }},
      //       { loader: "less-loader",options:{ sourceMap: true }}
      //     ],
      //     fallbackLoader: 'style-loader'
      //   })
      // },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: "css-loader",options:{ sourceMap: true }},
          { loader: "less-loader",options:{ sourceMap: true }}
        ],
      },
      {
        test : /\.jsx?/,
        include : resolve('src/'),
        loader : 'babel-loader'
      },
      {
        test: /node_modules\/horten\/.*\.js/,
        loader: "babel-loader"
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
    // extractLess,
    new HtmlWebpackPlugin({
      template: 'src/template/index.html'
    }),
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
