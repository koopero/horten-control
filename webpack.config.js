// const resolve = require('path').resolve.bind( null, __dirname )
const resolve = require('path').resolve.bind( null, __dirname )

const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  // mode: 'production',

  devtool: 'source-map',
  entry: [ 
    './src/entry/bootstrap.js',
    './src/style/index.less',
  ],
  output: {
    path: resolve( 'dist/' ),
    filename: '[name].js'
  },
  resolve: {
    symlinks: false
  },
  optimization: {
    minimizer: [ new UglifyJsPlugin() ]
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
        include : [ 
          resolve('src'),
          resolve('node_modules/deepcolour'),
          resolve('node_modules/embarkdown'),
          resolve('node_modules/horten'),
          resolve('node_modules/horten-websocket'),
          resolve('node_modules/string2png'),
        ],
        exclude: [],
        use: {
          loader : 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',{
                "useBuiltIns": "entry",
                "modules": "commonjs"
              }], 
              '@babel/preset-react'
            ],
            plugins: [
              // 'babel-plugin-lodash',
              ['@babel/plugin-transform-runtime', {
                "absoluteRuntime": false,
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false,
                // "version": "7.0.0-beta.0"
              }],
              // '@babel/plugin-transform-regenerator',

              ['module-resolver', {
                "root": ["./node_modules"],
                alias: {
                  horten: 'horten'
                }
              }]
            ],
          }
        },
      },
      {
        test : /\.json/,
        include : resolve('node_modules/entities'),
        loader: 'json-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=font/[name].[ext]'
      },
      {
        test: /\.(png)$/,
        loader: 'file-loader?name=./image/[name].[ext]'
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
