/* globals stdout __dirname stderr process */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');

gulp.task('server:start', () => {
  return require('./server');
});

// gulp.task('nodemon:start', () => {
//   livereload.listen();
//   nodemon({
//     script: './server.js',
//     ext: 'js pug',
//     stdout: false,
//   }).on('readable', function() {
//     stdout.on('data', function(chunk) {
//       if (/^Express server listening on port/.test(chunk)) {
//         livereload.changed(__dirname);
//       }
//     });
//     stdout.pipe(process.stdout);
//     stderr.pipe(process.stderr);
//   });
// });

gulp.task('nodemon', function(cb) {
  const started = false;

  return nodemon({
    script: 'server.js',
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});
