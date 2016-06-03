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
var path = require('path');
var rename = require('gulp-rename');
var fs = require('fs');

gulp.task('build', ['environment', 'copyManifest', 'clean'], function(){
  return gulp.src('entry.js', { cwd: 'app/' })
    .pipe(webpack({
      module: {
        loaders:[{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }

        }, {
          test: /\.json$/,
          exclude: /node_modules/,
          loader: 'json'
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
    .pipe(gulp.dest(buildDir));
});

gulp.task('default', ['environment', 'copyManifest', 'build']);

gulp.task('watch', function(){
  gulp.watch('app/*', ['development:build']);
});

gulp.task('test', ['unit', 'e2e']);

gulp.task('unit', function(){
  gulp.src('*_test.js', {read: false, cwd: 'test/'})
    .pipe(babel())
    .pipe(mocha());
});


var buildDir,
    forceClean,
    configDir,
    gallery,
    environment;


gulp.task('environment', function(){
  buildDir = process.env.BUILD_DIR || 'dist';
  forceClean = process.env.FORCE_CLEAN === 'true';
  environment = process.env.GALLERY_ENV || 'development';
  gallery = process.env.GALLERY;
  setConfigDir();
});

var setConfigDir = function() {
  if (configDir == undefined) {
    var base;

    if (process.env.CONFIG_DIR != undefined){
      base = process.env.CONFIG_DIR;
    } else if (gallery == undefined) {
      throw 'GALLERY must be specified';
    } else {
      base = path.join(__dirname, 'config');
    }

    console.log('Building ' + gallery + ' ' + environment);
    configDir = path.join(base, gallery); 
  }
  console.log('USING ' + configDir);
}

//https://semaphoreci.com/community/tutorials/setting-up-an-end-to-end-testing-workflow-with-gulp-mocha-and-webdriverio
gulp.task('e2e', function(done){
  runSequence('development:build', 'e2e:run', 'e2e:cleanup');
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

gulp.task('development:build', function(done){
  configDir = 'development';
  runSequence('build', 'development:copyImages',  done);
});

gulp.task('development:copyImages', ['environment'], function(){
  return gulp.src('images/**/*', { cwd: 'development' })
    .pipe(gulp.dest(buildDir));
});

gulp.task('copyManifest', function(){
  var sourceManifest = path.join(configDir, environment + '.json');
  fs.access(sourceManifest, function(err){
    if (err) {
      throw 'Cannot find source manifest: ' + sourceManifest;
    }
  });
  return gulp.src(environment + '.json', { cwd: configDir })
    .pipe(rename('manifest.json'))
    .pipe(gulp.dest(path.join(__dirname, 'config')));
});

gulp.task('clean', ['environment'], function(){
  return gulp.src(buildDir + '/*')
    .pipe(clean({ force: forceClean }));
});
