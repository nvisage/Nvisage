//IMPORTS//
import gulp from 'gulp';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import watchify from 'watchify';
import browserify from 'browserify';
import uglify from 'gulp-uglify';

import bsync from 'browser-sync';

import size from 'gulp-size';


//CONFIG//
const CONFIG = {
  production: false //set true if in production mode
};


//PATHS//
const PATH = {
  HTML: 'app/*.html',
  ASSETS: 'app/assets/**',
  ALL: ['app/js/*.jsx', 'app/js/**/*.jsx', 'app/index.html'],
  JS: 'app/js/main.jsx',
  JSDIR: 'app/js',
  MINIFIED_OUT: 'build.min.js',
  DEST: 'dist',
  DEST_ASSETS: 'dist/assets',
  BUNDLE: 'bundle.js'
};


//constants//
let browserSync = bsync.create()

let bundlejs = ()=>{
  let k = jsbundler.bundle()
    .on("error", function(err){
      gutil.log(err.toString());
      this.emit('end');
    })
    .pipe(source(PATH.BUNDLE))
    .pipe(buffer());
  if(CONFIG.production){
    k = k.pipe(uglify());
  }
    k = k.pipe(size())
    .pipe(gulp.dest(PATH.DEST))
    .pipe(browserSync.stream({once: true}));
    return k;
};

let jsbundler = watchify(browserify(PATH.JS, watchify.args));
jsbundler.transform(babelify, {presets: ["es2015", "react"]});
jsbundler.transform('browserify-css', { autoInject: true, minify: true });
jsbundler.on('update', bundlejs);


//TASKS//
gulp.task('build-js', ()=>{
  return bundlejs();
});

gulp.task('build-html', ()=>{
  gulp.src(PATH.HTML)
    .pipe(gulp.dest(PATH.DEST))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build-assets', ()=>{
  gulp.src(PATH.ASSETS)
    .pipe(gulp.dest(PATH.DEST_ASSETS));
})

gulp.task('build', ['build-html', 'build-assets', 'build-js']);

gulp.task('browser-sync', ['build'], ()=>{
    browserSync.init({
        server: {
            baseDir: PATH.DEST
        }
    });

    gulp.watch(PATH.HTML, ['build-html']);
});


gulp.task('serve', ['build', 'browser-sync']);

gulp.task('default', ['serve']);
