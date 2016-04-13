var gulp = require('gulp');
var webpack = require('webpack-stream');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var clean = require('gulp-clean');

gulp.task('build', function(){
  gulp.src('*.js', { cwd: 'app/' })
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
        filename: 'build.[hash].js'
      },
      plugins: [new HtmlWebpackPlugin({
        title: 'Gallery',
        template: 'app/index.html'
      })]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function(){
  gulp.src('dist/*')
    .pipe(clean());
});
