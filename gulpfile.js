
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create(); /* After requiring browser-sync, we chain a create()
that will recreate a browser-sync web server. The server will 'listen' to changes in files and auto reload
the page */


/* A gulp task looks like this:
- We call gulp.task() with the name of the task and a callback that will return the src() method in which we supply a source folder
- ... then we use the pipe() to execute a series of actions in the selected files and folders
- ... then the last pipe will call gulp.dest() to test the 'destination-folder' as the arg.
- ... we can then run this task by running gulp 'task-name' in the cmd prompt
gulp.task('name', function () {
  return gulp.src('source-folder')
                .pipe(function)
                .pipe(anotherFunction)
                .pipe(gulp.dest('destination-folder'))
});
*/

/* 1. CSS prepocessing */
gulp.task('css', function () {
  return gulp.src('src/sass/styles.scss')
                .pipe(sass())
                .pipe(gulp.dest('dist/css'));
});
