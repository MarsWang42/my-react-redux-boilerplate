var gulp = require('gulp');
var gutil = require("gulp-util");
var clean = require("gulp-clean");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var webpackProdConfig = require("./webpack.production.config.js");
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var stream = require('webpack-stream');
var browserSync = require('browser-sync');

var path = {
  HTML: 'src/index.html',
  ALL: ['src/**/*.jsx', 'src/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist',
};

// Task to remove previous compilations
gulp.task('clean-dist', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean());
});


// Task to build production assets
gulp.task('build:prod', ['clean-dist'], function() {
  return gulp.src(path.ALL)
    .pipe(stream(webpackProdConfig))
    .pipe(gulp.dest(path.DEST_BUILD));
});


// Task to run React-Hot-Reload Dev Server
var bundler = webpack(webpackConfig);
gulp.task('dev', function() {
  browserSync.init({
    server: {
      baseDir: [path.DEST_BUILD],
      // This middleware ensures that all requests on the webserver are funnelled through Webpack.
      // The webpackHotMiddleware gives all involved the heads up to transform and reload just
      // our react components.
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
            historyApiFallback: true,
            inline: false,
            hot: true,
            // It suppress error shown in console, so it has to be set to false.
            quiet: false,
            // It suppress everything except error, so it has to be set to false as well
            // to see success build.
            noInfo: false,
            assets: true,
            version: false,
            hash: false,
            timings: false,
            // These two can make the build much quieter.
            chunks: false,
            chunkModules: false,
          },
        }),
        webpackHotMiddleware(bundler),
      ],
    },
  });
});
