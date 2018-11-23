const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const babelCore = require('babel-core');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');

const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');



const sassIncludePaths = [
  require('node-normalize-scss').includePaths
];

const vendorsJs = [
  './node_modules/jquery/dist/jquery.js',
  './node_modules/almond/almond.js',
];

gulp.task('vendorjs', function() {
  return gulp.src(vendorsJs)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js', function() {
  return gulp
    .src(['./src/js/**/*.js'])
    .pipe(plumber())
    .pipe(eslint({
      configFile: '.eslintrc'
    }))
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env'],
      plugins: ['transform-es2015-modules-amd'],
      "moduleIds": true,
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('css', function() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: sassIncludePaths
    }).on('error', sass.logError))
    .pipe(cleanCss({ restructuring: false }))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('img', function() {
  const srcDir = './src/images/**/*';
  const destDir = './dist/images/';
  return gulp
    .src(srcDir)
    .pipe(plumber())
    .pipe(changed(destDir))
    .pipe(imagemin())
    .pipe(gulp.dest(destDir))
});

gulp.task('fonts', function() {
  return gulp
    .src('./src//fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/images/**/*', ['img']);
});

gulp.task('build', ['css', 'vendorjs', 'js', 'img', 'fonts']);
gulp.task('default', ['build', 'watch']);



