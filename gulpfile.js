var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlClean = require("gulp-htmlclean");
var jsuglify = require("gulp-uglify");
var stripDebugger = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");

var devMode = process.env.NODE_ENV == "development";

console.log(process.env.NODE_ENV == "development")

var folder = {
    src:"src/",//开发目录文件夹
    dist:"dist/"//压缩打包后目录文件夹
}

gulp.task("html",function(){
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
     if(!devMode){
         page.pipe(htmlClean())
     }
     page.pipe(gulp.dest(folder.dist+"html"))
})

gulp.task("images",function(){
    gulp.src(folder.src + "images/*")
        .pipe(connect.reload())
        .pipe(newer(folder.dist+"images"))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist+"images"))
})

gulp.task("js",function(){
    var page = gulp.src(folder.src + "js/*")
       .pipe(connect.reload())
        if(!devMode){
            page.pipe(stripDebugger())
            page.pipe(jsuglify())
        }
        page.pipe(gulp.dest(folder.dist+"js"))
})

gulp.task("css",function(){
    var options =[autoprefixer(),cssnano()]
    var page = gulp.src(folder.src + "css/*")
        .pipe(less())
        .pipe(connect.reload())
        if(!devMode){
            page.pipe(postcss(options))
        }
        page.pipe(gulp.dest(folder.dist+"css"))
})

gulp.task("watch",function(){ 
    gulp.watch(folder.src+"html/*" , ["html"])
    gulp.watch(folder.src+"css/*" , ["css"])
    gulp.watch(folder.src+"js/*" , ["js"])
    gulp.watch(folder.src+"images/*" , ["images"])
})  

gulp.task("serve",function(){
    connect.server({
        port:"8090",
        livereload:true
    })
}) 

gulp.task("default",["html","images","js","css","watch","serve"])