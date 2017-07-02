
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
  return gulp.src('src/sass/**/*.scss') //set Gulp to find every .scss file not including partials for conversion
  //set gulp-sourcemaps so that source maps are created by adding 2 pipes: one for initialization and one for the source map writing itself
                .pipe(sourcemaps.init()) // init comes before the processing
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // compress output and log errors for debugging
                .pipe(autoprefixer({
                  browsers: ["last 2 versions"]
                })) // add autoprefixer just after the Sass conversion and before writing sourcemaps
                .pipe(sourcemaps.write('./maps')) // writing of the sourcemaps comes after processing
                .pipe(gulp.dest('dist/css'))
                .pipe(browserSync.stream());
});

/* 2. Images Optimization */

gulp.task('images', function(){
  // take every image in the images/ and run imagemin() on them and output them to the dist/images/
  return gulp.src('src/images/*')
                .pipe(imagemin())
                .pipe(gulp.dest('dist/images'));
});

/* 3. Create a copy task so that tasks that are not processed simply be copied to the dist/ */
gulp.task('copy', function(){
  return gulp.src('src/*.html')
                .pipe(gulp.dest('dist')) // if we just use gulp.dest() after gulp.src(), the result would be a copy of those files to the destination-folder
                .pipe(browserSync.stream());
});

/* 4. Configure browser-sync and tell it to reload the browser everytime the HTML or CSS files are changed */

gulp.task('browserSync', function(){
  browserSync.init({ // initializes browserSync and tell it the root of the server (dist folder of the Website)
    server: {
      baseDir: 'dist'
    }
  });
}); /* to tell browserSync to update the page We need to add one pipe to the css task
* and another to the copy task:.pipe(browserSync.stream())
* It is important that it is the last pipe to run as browserSync will reload just after new or modified files are in place
*/

/* 5 Configure the watch task to watch for html and sass files changes */

gulp.task('watch', ['browserSync', 'css'], function(){
  // supply the files to watch and the task to run in each case
  gulp.watch('src/sass/**/*.scss', ['css']); // if scss files are changed, run css
  gulp.watch('src/*.html', ['copy']); // if html files are changed run copy
});

/* now we can run gulp watch to start browserSync */
