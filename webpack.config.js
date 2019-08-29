const resolve = require('path').resolve.bind( null, __dirname )
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./src/entry/bootstrap.js','./src/style/index.less'],
  output: {
    path: resolve( 'dist/' ),
    filename: '[name].js'
  },
  module : {
    rules : [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader",options:{ sourceMap: true }},
          { loader: "less-loader",options:{ sourceMap: true }}
        ],
      },
      {
        test : /\.jsx?/,
        include : resolve('src/'),
        use: {
          loader : 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['lodash'],
          }
        },
      },
      // {
      //   test: /node_modules\/horten\/.*\.js/,
      //   loader: "babel-loader"
      // },
      // {
      //   test: /deepcolour\/.*\.js/,
      //   loader: "babel-loader"
      // },
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'style/[name].css' : 'style/[name].[hash].css',
      chunkFilename: devMode ? 'style/[id].css' : 'style/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/template/index.html'
    }),
    new GoogleFontsPlugin({
      name: 'fonts',
      fonts: [
        { family: "Source Sans Pro", variants: [ '200', 'regular', '600' ] },
        { family: "Source Code Pro" },
        { family: "Raleway" },
        { family: "Roboto", variants: [ '100', '300', 'regular', '500' ] }
      ]
    }),
    new CopyWebpackPlugin([
      { from: resolve('src/static/') }
    ])
  ]
}
