'use strict';

const gulp       = require('gulp');
const $          = require('gulp-load-plugins')();
const sync       = $.sync(gulp).sync;
const browserify = require('browserify');
const babelify   = require('babelify');
const watchify   = require('watchify');
const source     = require('vinyl-source-stream');
const gutil      = require('gulp-util');

const reload = require('gulp-livereload')

const pathlib = require('path')

const bundler = {
  w: null,
  init: function() {
    this.browserify = browserify({
      entries: ['./browser.js'],
      // insertGlobals: true,
      // insertGlobalVars: true,
      cache: {},
      packageCache: {},
      // standalone: 'loopin-control'
    })



    this.browserify.require('./node_modules/react-dom/', { expose: 'react-dom' } )
    this.browserify.require('./node_modules/react/', { expose: 'react' } )
    this.browserify.require('./src/LoopinControl.js', { expose: 'horten-control' } )

    this.browserify.transform( babelify.configure( {
      // plugins: ["transform-es2015-classes"],
      global: true,
      // ignore: /\/node_modules\/(?!horten\/)/,
      presets: ['es2015','react'],
    } ) )

    this.w = watchify( this.browserify )
  },
  bundle: function() {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('horten-control.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(reload())
  },
  watch: function() {
    this.w && this.w.on('update', this.bundle.bind(this));
  },
  stop: function() {
    this.w && this.w.close();
  }
};

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
  'bootstrap-copy-less',
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

gulp.task('bootstrap-copy-less', function () {
  return gulp.src('./node_modules/bootstrap/less/**')
  .pipe( gulp.dest('./dist/source/node_modules/bootstrap/less/' ) )
})

gulp.task('bootstrap-copy-fonts', function () {
  return gulp.src('./node_modules/bootstrap/dist/fonts/**')
  .pipe( gulp.dest('./dist/fonts/' ) )
})

gulp.task('bootstrap-copy-js', function () {
  return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.js')
  .pipe( gulp.dest('./dist/vendor' ) )
})

gulp.task('bower-copy', function () {
  return gulp.src([
    './bower/jquery/dist/jquery.js',
    './bower/modernizr/modernizr.js'
  ])
  .pipe( gulp.dest('./dist/vendor' ) )
})

gulp.task('scripts', function() {
  bundler.init();
  return bundler.bundle();
});

gulp.task('html', function() {
  return gulp.src('./html/index.html')
  .pipe( $.sym('dist/index.html', { force: true } ) )
})

// gulp.task('images', function() {
//   return gulp.src('app/images/**/*')
//     .pipe($.cache($.imagemin({
//       optimizationLevel: 3,
//       progressive: true,
//       interlaced: true
//     })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe($.size());
// });

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

gulp.task('bundle', [
  'html',
  'style',
  'scripts',
  'bootstrap-copy-fonts',
  'bootstrap-copy-js',
  'bower-copy',
  // 'images',
  'fonts',
  'extra'
])

gulp.task('clean-bundle', sync(['clean', 'bundle']));

gulp.task('build', ['clean-bundle'], bundler.stop.bind(bundler));

var connect = $.connect
gulp.task('serve', () => {
  connect.server( {
    root: 'dist',
    livereload: true
  })
})

gulp.task('reload', () => {
  connect.reload()
})

gulp.task('default', sync(['build','serve', 'watch']));

gulp.task('watch', function() {
  bundler.watch()
  reload.listen()
  gulp.watch('html/*.html', ['html', 'reload'])
  gulp.watch('less/**.less', ['style', 'reload'])
  gulp.watch('component/**/*.js', ['scripts', 'reload'])
  // gulp.watch('app/images/**/*', ['images'])
  // gulp.watch('app/fonts/**/*', ['fonts'])
})
