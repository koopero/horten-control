module.exports = bundle

const _ = require('lodash')
    , gulp = require( 'gulp' )
    , $ = require( 'gulp-load-plugins' )()
    , browserify = require( 'browserify' )
    , watchify = require( 'watchify' )
    , babelify = require( 'babelify' )
    , source = require( 'vinyl-source-stream' )
    , buffer = require( 'vinyl-buffer' )
    , assign = _.assign

/**
 * Tasks for JS
 */

// browserify with babelify the JS code, and watchify
function bundle( options ) {
  var opts = assign({}, watchify.args, {
    entries: options.entries,
    extensions: ['.js'],
    debug: true
  })

  let b = browserify(opts)

  b.transform(babelify, {
    // global: true,
    // ignore: /\/node_modules\/(?!horten\/)/,
    // presets: ['es2015','react']
  })

  var rebundle = () =>
    b.bundle()
    // log errors if they happen
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source(options.output))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.size({ showFiles: true }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
    .pipe($.livereload() )

  if (bundle.isWatchify) {
    b = watchify(b)
    b.on('update', rebundle)
    b.on('log', $.util.log)
  }

  return rebundle()
}
