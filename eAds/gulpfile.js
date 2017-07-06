/* globals __dirname stdout stderr process*/ 

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
// const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');


gulp.task('develop', function() {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade coffee',
    stdout: false,
  }).on('readable', function() {
    stdout.on('data', function(chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    stdout.pipe(process.stdout);
    stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'develop',
]);
