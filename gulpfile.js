var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

//added sourcemaps
var sourcemaps = require('gulp-sourcemaps');

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
  
    //added sourcemaps
    .pipe(sourcemaps.init())
    .pipe($.sass({
      includePaths: sassPaths
    })
    .on('error', $.sass.logError))    
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    
    //added sourcemaps
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('css'));
});

//gulp.task('default', ['sass'], function() {
//  gulp.watch(['scss/**/*.scss'], ['sass']);
//});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(['scss/**/*.scss'], ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]);



