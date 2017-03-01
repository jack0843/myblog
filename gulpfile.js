var gulp = require('gulp'),
	less = require('gulp-less');
	
var config = {
	lessMain:[
		'./src/less/**/*.less'
	]
}
gulp.task('testLess',function(){
	gulp.src(config.lessMain)
		.pipe(less())
		.pipe(gulp.dest('src/css'));
})
gulp.task('default',['testLess']);
