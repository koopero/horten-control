'use strict';

const gulp       = require('gulp')
    , $          = require('gulp-load-plugins')()
    , sync       = $.sync(gulp).sync
    , source     = require('vinyl-source-stream')
    , gutil      = require('gulp-util')
    , reload     = require('gulp-livereload')
    , bundle     = require('./gulp/bundle')
    , runSequence = require( 'run-sequence' )

const pathlib = require('path')

var bundles = [
  {
    entries: ['./bundle/test.js'],
    output: 'test.js',
  },
  // {
  //   entries: ['./bundle/bootstrap.js'],
  //   output: 'bootstrap.js',
  // },
  // {
  //   entries: ['./bundle/HortenControl.js'],
  //   output: 'HortenControl.js',
  // }
]

gulp.task('scripts', () =>
  $.all( bundles.map( options =>
    bundle( options )
  ) )
)


gulp.task('clean', function () {
  return gulp.src('dist/', { read: false })
  .pipe( $.clean() )
})

gulp.task('reload', function () {
  reload.reload()
})

//
// Style
//

var lessFile = './less/horten-control.less'

gulp.task('style', sync([
  'less',
  'less-copy',
  'hljs-css-copy',
  'reload'
]))

gulp.task('less', function () {
  return gulp.src(lessFile)
  .pipe($.lessSourcemap({
    // paths: [ pathlib.join(__dirname, 'node_modules', 'bootstrap', 'less' ) ],
    paths: [
      './node_modules/bootswatch/slate',
      './node_modules/bootstrap/less'
    ],
    sourceMap: {
      sourceMapRootpath: './source',
      sourceMapURL: 'horten-control.css.map'
    }
  }))
  .on('error', function (error) {
      gutil.log(gutil.colors.red(error.message))
      // Notify on error. Uses node-notifier
      notifier.notify({
          title: 'Less compilation error',
          message: error.message
      })
  })
  .pipe(gulp.dest('./dist/'))
})

gulp.task('hljs-css-copy', function() {
  return gulp.src('./node_modules/highlight.js/styles/*.css')
  .pipe( gulp.dest('./dist/vendor/hljs/' ) )
})

gulp.task('less-copy', function () {
  return gulp.src(lessFile)
  .pipe( gulp.dest('./dist/source'))
})

// gulp.task('bootstrap-copy-less', function () {
//   return gulp.src('./node_modules/bootstrap/less/**')
//   .pipe( gulp.dest('./dist/source/node_modules/bootstrap/less/' ) )
// })
//
// gulp.task('bootstrap-copy-fonts', function () {
//   return gulp.src('./node_modules/bootstrap/dist/fonts/**')
//   .pipe( gulp.dest('./dist/fonts/' ) )
// })
//
// gulp.task('bootstrap-copy-js', function () {
//   return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.js')
//   .pipe( gulp.dest('./dist/vendor' ) )
// })

gulp.task('bower-copy', function () {
  return gulp.src([
    './bower/jquery/dist/jquery.js',
    './bower/modernizr/modernizr.js'
  ])
  .pipe( gulp.dest('./dist/vendor' ) )
})

gulp.task('html', function() {
  return gulp.src('./html/*')
  .pipe( gulp.dest('dist/') )
})

gulp.task('fonts', function() {
  return gulp.src(['font/*.ttf'])
    .pipe(gulp.dest('dist/fonts/'))
    .pipe($.size());
});

gulp.task('extra', function () {
  return gulp.src(['extra/*'])
  .pipe(gulp.dest('dist/'))
  .pipe($.size())
})

var demoLoopin
  , demoServer

gulp.task('demo-run', function() {
  demoLoopin = require('./demo/loopin.js')
  demoServer = demoLoopin.plugin(require('loopin-server'), {
    port: 7004
  })
})

gulp.task('demo', ['build','demo-run','watch'] )

// gulp.task('set-production', function() {
//   process.env.NODE_ENV = 'production';
// });

gulp.task('build', [
  'html',
  'style',
  // 'scripts',
  // 'bootstrap-copy-fonts',
  // 'bootstrap-copy-js',
  'bower-copy',
  'fonts',
  'extra'
])

var connect = $.connect
gulp.task('serve', () => {
  connect.server( {
    root: 'dist',
    livereload: true
  })
})

// gulp.task('reload', () => {
//   connect.reload()
// })

gulp.task('default', sync(['clean','build','serve','watch']))

gulp.task('watch', function() {
  bundle.isWatchify = true
  runSequence(['scripts'])

  reload.listen()
  gulp.watch('html/*', ['html', 'reload'])
  gulp.watch('less/**.less', ['style', 'reload'])
  gulp.watch([ 'src/**/*.js', 'bundle/*.js'], ['scripts', 'reload'])
})
