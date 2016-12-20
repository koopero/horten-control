const gulp = require('gulp')
    , googleWebFonts = require('gulp-google-webfonts')
    , options = {
        cssFilename: 'google-fonts.css'
      }

gulp.task('fonts-google', function () {
	return gulp.src('less/fonts.list')
		.pipe(googleWebFonts(options))
		.pipe(gulp.dest('dist/fonts'))
})

gulp.task('fonts-awesome', ['bower-install'], function () {
	return gulp.src('bower/font-awesome/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
})

gulp.task('font-awesome-css', ['bower-install'], function () {
	return gulp.src('bower/font-awesome/css/*')
		.pipe(gulp.dest('dist/vendor'))
})

gulp.task('fonts', ['fonts-google', 'fonts-awesome', 'font-awesome-css'])
