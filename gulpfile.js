var gulp = require('gulp');
var webpack = require('webpack-stream');
var HtmlWebpackPlugin = require('html-webpack-plugin');

gulp.task('build', function(){
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
        filename: '[hash].build.js'
      },
      plugins: [new HtmlWebpackPlugin({
        title: 'Gallery',
        template: 'app/index.html'
      })]
    }))
    .pipe(gulp.dest('dist/'));
});

