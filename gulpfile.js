var gulp = require('gulp'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	imageMin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	htmlMin = require('gulp-htmlmin'),
	gulpWebpack = require('gulp-webpack'),
	watch = require('gulp-watch'),
	del = require('del'),
	livereload = require('gulp-livereload');
	
var config = {
	cleanSrc: [
		'./dist/**/*'
	],
	lessMain:[
		'./src/less/**/*.less'
	],
	jsMain:[
		'./src/js/**/*.js'
	],
	cssMain:[
		'./src/css/**/*.css'
	],
	imgMain:[
		'./src/img/**/*.{png,jpg,gif,ico}'
	],
	htmlMain:[
		'./src/html/**/*.html'
	]
}

/* 打包前删除现有的所有压缩文件 */
gulp.task('clean',function(cb){
	return del(config.cleanSrc,cb);
})

gulp.task('testAutoprefixer',function(){
	return gulp.src(config.cssMain)
		.pipe(autoprefixer({
			browsers:['last 5 versions']
		}))
		.pipe(gulp.dest('dist/css'));
})
gulp.task('testLess',function(){
	return gulp.src(config.lessMain)
		.pipe(less())
		.pipe(gulp.dest('src/css'));
})
gulp.task('testUglify',function(){
	return gulp.src(config.jsMain)
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
/* 压缩css */
gulp.task('cssmin',function(){
	return gulp.src(config.cssMain)
		.pipe(minifyCss({
			keepSpecialComments: '*'
		}))
		.pipe(gulp.dest('dist/css'));
})
/* 压缩图片 */
gulp.task('imagemin',function(){
	return gulp.src(config.imgMain)
		.pipe(cache(imageMin({
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
		})))
		.pipe(gulp.dest('dist/img'));
})
/* 压缩html代码 */
gulp.task('htmlmin',function(){
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
	gulp.src(config.htmlMain)
		.pipe(htmlMin(options))
		.pipe(gulp.dest('dist/html'));
})

/* 监视 */
gulp.task("watch-js",function(){
	gulp.watch(config.lessMain,["testLess"]);
})
gulp.task("watch-css",function(){
	gulp.watch(config.cssMain,["cssmin"])
})
		
gulp.task('default',['testLess']);
