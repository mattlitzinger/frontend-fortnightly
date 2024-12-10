// gulpfile.js

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('node-sass'));
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const mode = require('gulp-mode')();

gulp.task('css:build', () => {
	return gulp.src('src/scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['> 1%']
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js:build', () => {
	return gulp.src('src/js/app.js')
		.pipe(webpack({
			mode: 'development',
			// watch: true,
			output: {
				filename: 'bundle.js'
			}
		}))
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(sourcemaps.init())
		.pipe(uglify().on('error', (uglify) => {
			console.error(uglify.message);
			this.emit('end');
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('default', () => {

	gulp.watch(
		['src/scss/*.scss','src/scss/*/*.scss'],
		{ ignoreInitial: false },
		gulp.series('css:build')
	);

	gulp.watch(
		['src/js/*.js','src/js/*/*.js'],
		{ ignoreInitial: false },
		gulp.series('js:build')
	);

});