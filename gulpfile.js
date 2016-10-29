'use strict';

var gulp       = require('gulp');
var $          = require('gulp-load-plugins')();
var sync       = $.sync(gulp).sync;
var browserify = require('browserify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var gutil = require('gulp-util');

const reload = require('gulp-livereload')

const pathlib = require('path')

var bundler = {
  w: null,
  init: function() {
    this.w = watchify(browserify({
      entries: ['./component/test.js'],
      insertGlobals: true,
      cache: {},
      packageCache: {},
      standalone: 'loopin-control'
    }));
  },
  bundle: function() {
    return this.w && this.w.bundle()
      .on('error', $.util.log.bind($.util, 'Browserify Error'))
      .pipe(source('loopin-control-react.js'))
      .pipe(gulp.dest('dist/client/js'))
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

const lessFile = './less/loopin-client.less'

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
      sourceMapRootpath: '../source',
      sourceMapURL: 'loopin-client.css.map',

      // sourceMapBasepath: './dist/client/css'
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
  .pipe(gulp.dest('./dist/client/css/'))
})

gulp.task('hljs-css-copy', function() {
  return gulp.src('./node_modules/highlight.js/styles/*.css')
  .pipe( gulp.dest('./dist/client/css/hljs/' ) )
})

gulp.task('less-copy', function () {
  return gulp.src(lessFile)
  .pipe( gulp.dest('./dist/client/source/'))
})

gulp.task('bootstrap-copy-less', function () {
  return gulp.src('./node_modules/bootstrap/less/**')
  .pipe( gulp.dest('./dist/client/source/node_modules/bootstrap/less/' ) )
})

gulp.task('bootstrap-copy-fonts', function () {
  return gulp.src('./node_modules/bootstrap/dist/fonts/**')
  .pipe( gulp.dest('./dist/client/fonts/' ) )
})

gulp.task('bootstrap-copy-js', function () {
  return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.js')
  .pipe( gulp.dest('./dist/client/js/' ) )
})

gulp.task('bower-copy', function () {
  return gulp.src([
    './bower/jquery/dist/jquery.js',
    './bower/modernizr/modernizr.js'
  ])
  .pipe( gulp.dest('./dist/client/js' ) )
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
    .pipe(gulp.dest('dist/font'))
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

const connect = $.connect
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
