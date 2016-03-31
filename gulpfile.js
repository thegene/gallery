var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require('webpack-stream');

gulp.task('default', ['copy-static', 'build-js']);

gulp.task('clean-js', function(){
  gulp.src('dist/build.js')
    .pipe(clean());
});

gulp.task('build-js', ['clean-js'], function(){
  gulp.src('test.js', { cwd: 'app/' })
    .pipe(webpack({
      module: {
        loaders:[{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }]
      },
      output: {
        filename: 'build.js'
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean-static', function(){
  gulp.src('dist/index.html')
    .pipe(clean());
});

gulp.task('copy-static', ['clean-static'], function(){
  gulp.src('index.html', { cwd: 'app/' })
    .pipe(gulp.dest('dist/'));
});
