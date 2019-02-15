const pathlib = require('path')

exports.staticDir = pathlib.resolve( __dirname, 'dist' )
exports.renderPageHTML = require('./src/util/renderPageHTML')
