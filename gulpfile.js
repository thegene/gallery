var gulp = require('gulp');
var webpack = require('webpack-stream');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var clean = require('gulp-clean');
var mocha = require('gulp-mocha');
var babel = require('gulp-babel');
require('babel-core/register');
var selenium = require('selenium-standalone');
var webdriver = require('gulp-webdriver');
var runSequence = require('run-sequence');

gulp.task('build', function(){
  return gulp.src('*.js', { cwd: 'app/' })
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

gulp.task('test', function(){
  gulp.src('*_test.js', {read: false, cwd: 'test/'})
    .pipe(babel())
    .pipe(mocha());
});

//https://semaphoreci.com/community/tutorials/setting-up-an-end-to-end-testing-workflow-with-gulp-mocha-and-webdriverio
gulp.task('e2e', function(done){
  runSequence('build:development', 'e2e:run', 'e2e:cleanup');
});

gulp.task('e2e:cleanup', function(done){
  seleniumServer.kill();
});

gulp.task('e2e:run', ['selenium'], function(){
  return gulp.src('wdio.conf.js')
    .pipe(webdriver())
    .on('error', function(){
      seleniumServer.kill();
      process.exit(1);
    });
});

var seleniumServer;
gulp.task('selenium', function(done){
  selenium.install({logger: console.log}, function(){
    selenium.start(function(error, child){
      if (error){
        return done(error)
      } else {
        seleniumServer = child;
        done();
      }
    });
  });
});

gulp.task('build:development', ['clean', 'build'], function(done){
  return gulp.src('**', { cwd: 'development' })
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
  gulp.src('dist/*')
    .pipe(clean());
});
