// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    browserify = require('browserify')
    gutil = require('gulp-util')
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream');

// Whether in prod
var production   = process.env.NODE_ENV === 'production'

var handleError = function(err) {
  gutil.log(err);
  gutil.beep();
  return this.emit('end');
};

// Styles
gulp.task('styles', function() {
  return gulp.src('src/assets/styles/style.scss')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  var build, bundle;
  bundle = browserify({
    entries: ['./src/app/app.js'],
    debug: !production
  });
  build = bundle.bundle()
    .on('error', handleError)
    .pipe(source('app.js'));
  if (production) {
    build.pipe(streamify(ngAnnotate()))
      .pipe(streamify(uglify()));
  }
  return build.pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/assets/styles/**/*.scss', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('styles');
  });

  // Watch .js files
  gulp.watch('src/app/**/*.js', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('scripts');
  });

  gulp.watch('src/templates/**/**', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('templates');
  });

  gulp.watch('src/index.html', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('html');
  });
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/bundle.js'], {read: false})
    .pipe(clean());
});

gulp.task('fonts', function() {
  return gulp.src(['./node_modules/font-awesome/fonts/*', './bower_components/bootswatch-dist/fonts/*', 'src/assets/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('templates', function() {
  return gulp.src('src/templates/**/**')
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
  return browserSync({
    port: 8080,
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
});

// Default task
gulp.task('default', ['clean', 'html', 'templates', 'fonts', 'serve', 'styles', 'scripts', 'watch']);