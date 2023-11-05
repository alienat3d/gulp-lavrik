const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

// Подключим весьма спорным методом Normalize, чтобы потестить concat. Т.к. обычно подключаем через препроцессор или с помощью bower. Но сейчас подключим его напрямую. Хоть способ и топорный, но это самый быстрый способ подключить Normalize.css без препроцессоров.
// Если бы мы работали с препроцессорами, то всё было куда проще, но здесь мы рассмотрим сборку под CSS, то для упорядочивания подключения создадим массив.
const cssFiles = [
  './node_modules/normalize.css/normalize.css',
  './app/css/style.css',
  './app/css/media.css'
]

const jsFiles = [
  './app/js/lib.js',
  './app/js/index.js',
]

// Начинается с return gulp.src() и заканчивается .pipe(gulp.dest()). Т.е. откуда мы что-то берём и куда направляем.
// '> 0.1%' означает, что для всех браузеров, которые используются в мире на более, чем 1\10 процента, для них нужно префиксы расставить.
// 'level: 2' для cleanCSS означает самый жёстки предустановленный способ минификации. О других можно почитать в доке к пакету.
function styles() {
  return gulp.src(cssFiles)
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({
      "overrideBrowserslist": [
        "> 0.1%"
      ],
      cascade: false
    }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/css'))
}

function scripts() {
  return gulp.src(jsFiles)
  .pipe(concat('main.min.js'))
  .pipe(uglify({
    toplevel: true
  }))
  .pipe(gulp.dest('./dist/js'))
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);