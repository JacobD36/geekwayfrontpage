const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

//compile scss in to css
gulp.task('style', function() {
  return gulp.src('./mombo/static/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./mombo/static/css'))
		.pipe(browserSync.stream());
});


gulp.task('watch', function() {
  	browserSync.init({
		server: {
			baseDir: './mombo'
		}
	});
	gulp.watch('./mombo/static/scss/**/*.scss', gulp.series('style'))
	gulp.watch('./**/*.html').on('change', browserSync.reload);
	gulp.watch('./mombo/static/scss/**/*.scss').on('change', browserSync.reload);
	gulp.watch('./mombo/static/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('prefix', function() {
  	gulp.src('./mombo/static/css/style.css')
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "> 1%", "ie 11", "Firefox ESR"],
            cascade: false
    }))
    .pipe(gulp.dest('./mombo/static/css'))
});


gulp.task('sass', gulp.parallel('prefix', 'style', 'watch')); // Combine




// function style() {
//	return gulp.src('./mombo/static/scss/**/*.scss').pipe(sass()).pipe(gulp.dest('./mombo/static/css'))
//	.pipe(browserSync.stream());
//}
/*
function watch() {
	
}


gulp.task('prefix', () =>
    gulp.src('./mombo/static/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('./mombo/static/css'))
);*/