import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import webp from 'gulp-webp';
import svgstore from 'gulp-svgstore';
import del from 'del';
import squoosh from 'gulp-libsquoosh';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';


// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
}


//Images

export const optimizeImage = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}
const copyImages=()=>{
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

//Scripts

export const scripts = ()=> {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

//Html

export const html =()=>{
  return gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace:true}))
  .pipe(gulp.dest('build'));
}



//WebP

export const createWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('build/img'))
}



//Svg

export const sprite = () => {
  return gulp.src('source/img/**/icon-*.svg')
  .pipe(svgstore())
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
}


// Server

export const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//reload

const reload = (done) => {
  browser.reload();
  done();
}


// Watcher

export const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html').on('change', browser.reload);
}

//clean

const clean = () => {
return del('build');
};


//Copy

export const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/img/**/*.{jpg,png,svg}',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();
}

//build

export const build = gulp.series(
  clean,
  copy,
  optimizeImage,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  )
);

export default gulp.series(
    clean,
    copy,
    optimizeImage,
    gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp),gulp.series(server,watcher));
