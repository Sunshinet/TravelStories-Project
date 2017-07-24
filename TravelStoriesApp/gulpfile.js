const gulp = require('gulp');

gulp.task('server:start', () => {
  return require('./server');
});

gulp.task('default', [
  'develop',
]);
