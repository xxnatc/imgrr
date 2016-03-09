const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const mocha = require('gulp-mocha');
const KarmaServer = require('karma').Server;

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!**/node_modules/*', '!**/build/*', '!**/*bundle.js'])
    .pipe(eslint(__dirname + '/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('html:dev', () => {
  gulp.src(__dirname + '/app/**/*.html')
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('sass:dev', () => {
  gulp.src(__dirname + '/app/sass/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(__dirname + '/build/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch(__dirname + '/app/sass/*.scss', ['sass:dev']);
});

gulp.task('build:dev', ['html:dev', 'webpack:dev', 'sass:dev']);


gulp.task('mocha', function() {
  return gulp.src(['test/backend/*test.js'], { read: false })
    .pipe(mocha());
});

gulp.task('webpack:test', () => {
  gulp.src(__dirname + '/test/client/test_entry.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
      },
      htmlLoader: {
        ignoreCustomFragments: [/\{\{.*?}}/]
      },
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client/'));
});

gulp.task('karma', ['webpack:test'], (done) => {
  // added set timeout to avoid webpack delay
  setTimeout(() => {
    new KarmaServer({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done).start();
  }, 1000);
});

gulp.task('test', ['mocha', 'karma']);

gulp.task('default', ['build:dev', 'lint']);
