'use strict';

const { gulp, src, dest, watch, series } = require('gulp');

let sass = require('gulp-sass');
let clean = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let rename = require('gulp-rename');
let babel = require('gulp-babel');
let concat = require('gulp-concat');
let terser = require('gulp-terser');
let concatCss = require('gulp-concat-css');
let smushit = require('gulp-smushit');
let svgo = require('gulp-svgo');

function buildSass(cb) {
	return src('./src/scss/app.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest('./dist/css/'))
		.pipe(clean({ compatibility: 'ie8' }))
		.pipe(sourcemaps.write('/'))
		.pipe(dest('./dist/css/'));
	cb();
}
// function buildVendorSass(cb) {
//   return src("static/plugins/css/*.css")
//     .pipe(sourcemaps.init())
//     .pipe(concatCss("vendor.css"))
//     .pipe(rename({ extname: ".min.css" }))
//     .pipe(dest("static/dist/css/"))
//     .pipe(clean({ compatibility: "ie8" }))
//     .pipe(sourcemaps.write("/"))
//     .pipe(dest("static/dist/css/"));
//   cb();
// }
function buildVendorSass(cb) {
	return src(
		[
			'node_modules/slick-carousel/slick/slick.css',
			'node_modules/slick-carousel/slick/slick-theme.css'
		],
		{
			base: 'node_modules/'
		}
	)
		.pipe(sourcemaps.init())
		.pipe(concatCss('vendor.css'))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest('./dist/css/'))
		.pipe(clean({ compatibility: 'ie8' }))
		.pipe(sourcemaps.write('/'))
		.pipe(dest('./dist/css/'));
	cb();
}
function buildScripts(cb) {
	return src('./src/js/app.js')
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env']
			})
		)
		.pipe(concat('app.bundle.js'))
		.pipe(terser())
		.pipe(dest('./dist/js/'))
		.pipe(sourcemaps.write('/'))
		.pipe(dest('./dist/js/'));
	cb();
}
function buildVendorScripts(done) {
	return src(
		[
			'node_modules/jquery/dist/jquery.js',
			'node_modules/slick-carousel/slick/slick.js',
			'node_modules/smooth-scroll/dist/smooth-scroll.polyfills.js',
			'node_modules/gsap/src/uncompressed/TweenMax.js',
			'node_modules/gsap/src/uncompressed/TweenMax.js',
			'node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
			'node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js',
			'node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
			// "node_modules/gumshoejs/dist/gumshoe.polyfills.js",
		],
		{
			base: 'node_modules/'
		}
	)
		.pipe(concat('./dist/js/vendor.bundle.js'))
		.pipe(terser())
		.pipe(dest('./'));
	done();
}
// function themeScripts(done) {
//   return src(
//     [
//       "static/plugins/js/bootstrap.min.js",
//       "static/plugins/js/ct-paper.js",
//       // "static/plugins/js/smartbanner.js/dist/smartbanner.js",
//     ],
//     {
//       base: 'static/'
//     }
//   )
//     .pipe(concat("theme.bundle.js"))
//     .pipe(terser())
//     .pipe(dest("static/dist/"));
//   done();
// }

// img compression tasks

function smush(done) {
	return src('./src/images/**/*.{jpg,png}')
		.pipe(smushit({ verbose: true }))
		.pipe(dest('./dist/images/'));
	done();
}
function smushSvg(done) {
	return src('.src/images/*')
		.pipe(svgo())
		.pipe(dest('.dist/images'));
	done();
}

// function build(cb) {
//   watch(
//     ["./src/scss/**/*.scss", "./src/js/*.js"],
//     series(buildSass, buildScripts)
//   );
//   cb();
// }
function build(cb) {
	series(smush, buildVendorSass, buildVendorScripts, buildSass, buildScripts);
	cb();
}
function buildVendorFiles(cb) {
	series(buildVendorSass, buildVendorScripts);
	cb();
}
function smushAssets(cb) {
	series(smush, smushSvg);
	cb();
}
exports.build = build;
exports.buildVendorFiles = buildVendorFiles;
exports.smushAssets = smushAssets;

exports.buildScripts = buildScripts;
exports.buildVendorScripts = buildVendorScripts;
exports.buildSass = buildSass;
exports.buildVendorSass = buildVendorSass;
exports.smush = smush;
exports.smushSvg = smushSvg;
exports.default = series(
	smush,
	buildVendorSass,
	buildVendorScripts,
	buildSass,
	buildScripts
);
