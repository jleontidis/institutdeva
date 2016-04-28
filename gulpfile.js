var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browsersync = require('browser-sync');
var minifyCSS = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var concatCSS = require('gulp-concat-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var pngquant = require('imagemin-pngquant');
var nano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');

//paths
var destPath = 'production';
var sourcePath = 'devfiles';

var vendorJsArray = [sourcePath+'/vendor/jquery.min.js',sourcePath+'/vendor/bootstrap/js/bootstrap.js',sourcePath+'/vendor/lodash.js',sourcePath+'/vendor/angular.min.js',sourcePath+'/vendor/angular-simple-logger.min.js',sourcePath+'/vendor/angular-route.min.js',sourcePath+'/vendor/angular-resource.min.js',sourcePath+'/vendor/textAngular/dist/textAngular.min.js',sourcePath+'/vendor/textAngular/dist/textAngular-sanitize.min.js',sourcePath+'/vendor/textAngular/dist/textAngular-rangy.min.js',sourcePath+'/vendor/datepicker/angular-datepicker.min.js',sourcePath+'/vendor/angular-google-maps.min.js'];

var vendorCssArray = [sourcePath+'/vendor/bootstrap/css/bootstrap.min.css',sourcePath+'/vendor/font-awesome/css/font-awesome.min.css',sourcePath+'/vendor/textAngular/dist/textAngular.min.css',sourcePath+'/vendor/datepicker/angular-datepicker.min.css'];

var devaJSArray = [sourcePath+'/js/deva-app.js',sourcePath+'/js/deva-routing.js',sourcePath+'/js/deva-factories.js',sourcePath+'/js/deva-controllers.js',sourcePath+'/js/custom-jquery.js'];

gulp.task('miniHtml', function(){
    
    return gulp.src(sourcePath+'/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(destPath));
    
});



gulp.task('miniTHtml',function(){
    
    return gulp.src(sourcePath+'/html/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(destPath+'/html/'));
})


//Style tasks
gulp.task('styles',function(){
	
	console.log('starting style...');
	gulp.src([sourcePath+'/css/style.css',sourcePath+'/css/about.css'])
        .pipe(concat('custom.min.css'))
		.pipe(prefix('last 2 versions'))
        .pipe(nano())
        .pipe(gulp.dest(destPath+'/css/'))
	    .pipe(browserSync.stream());
	console.log('Tasks for style have ended...');
});

gulp.task('styles:vendor', function(){
	
	console.log('starting styles:vendor...');
	gulp.src(vendorCssArray)
		.pipe(concatCSS('vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(destPath + '/css/'))
        .pipe(browserSync.stream());
	console.log('Tasks for styles:vendor have ended...');
});

//Script tasks
gulp.task('scripts', function () {
    console.log('starting scripts...');
    gulp.src(devaJSArray)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .on('error', function () {
            this.emit('end');
        })
        .pipe(concat('custom.min.js'))
        .pipe(gulp.dest(destPath + '/js/'))
        .pipe(browserSync.stream());
    
    console.log('Tasks for scripts have ended...');
});

gulp.task('scripts:vendor', function () {
    console.log('starting scripts');
    gulp.src(vendorJsArray)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/js/'))
        .pipe(browserSync.stream());
    
    console.log('Tasks for scripts:vendor have ended...');
});

//Image Tasks
gulp.task('img', function () {
    return gulp.src(sourcePath + '/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(destPath + '/img'));
});


//Watching over you :P
gulp.task('watch', function () {
 
	browserSync.init({
        proxy: "http://localhost/institutdeva/production/",
        port: 80
    });
	
	gulp.watch(sourcePath+'/*.html', ['miniHtml']).on('change', browserSync.reload);
    
    gulp.watch(sourcePath+'/html/*.html', ['miniTHtml']).on('change', browserSync.reload);
	
	gulp.watch(sourcePath + '/css/style.css', ['styles']);
	
	gulp.watch(vendorCssArray , ['styles:vendor']);

    gulp.watch(devaJSArray, ['scripts']);
    
    gulp.watch(vendorJsArray, ['scripts:vendor']);
    
    gulp.watch(sourcePath + '/img/*', ['img']).on('change', browserSync.reload);
    
});

//runs all gulp tasks
gulp.task('default', function () {
   gulp.start('miniHtml', 'miniTHtml', 'styles', 'styles:vendor', 'scripts', 'scripts:vendor', 'img');
});
