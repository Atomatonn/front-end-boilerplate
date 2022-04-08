// load plugins
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const postcss = require('postcss');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create();

// compile sass into css task 
function scssTask(){
    return src('./scss/!main.scss', {sourcemaps: true})
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('./dist/css', {sourcemaps: '.'}));
}


// Javascript task
function jsTask(){
    return src('./js/*.js', {sourcemaps: true})
        .pipe(concat('scripts.js'))
        .pipe(terser())
        .pipe(dest('./dist/scripts', {sourcemaps: '.'}));
}

// Browsersync tasks
function browsersyncServer(cb){
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browsersyncReload(cb){
    browsersync.reload();
    cb();
}

// Watch Task
function watchTasks(){
    watch('*.html', browsersyncReload);
    watch(['scss/**/*.scss', 'js/**/*.js'], series(scssTask, jsTask, browsersyncReload));
}

// Default Gulp task
exports.default = series(
    scssTask,
    jsTask,
    browsersyncServer,
    watchTasks
);