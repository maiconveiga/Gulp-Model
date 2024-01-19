const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens(){
    return gulp.src('./src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('./build/images'))}

function comprimeJavaScript(){
    return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass(){
    return gulp.src('./src/styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'))
}

// function funcaoPrivada(){
//     console.log('Função privada');
// }
// function funcaoPadrao(e){
//     e();
//     console.log('Executando via gulp');
//     funcaoPrivada();
// }
// function outraFuncao(e){
//     e();
//     console.log('Outra função');
// }
//exports.default = gulp.series(funcaoPadrao, outraFuncao);
//exports.default = gulp.parallel(funcaoPadrao, outraFuncao);
//exports.outraFuncao = outraFuncao;


exports.default =function(){
    gulp.watch('./src/styles/**/*.scss',{ignoreInitial:false} , gulp.series(compilaSass));
    gulp.watch('./src/scripts/*.js',{ignoreInitial:false} , gulp.series(comprimeJavaScript));
    gulp.watch('./src/images/*',{ignoreInitial:false} , gulp.series(comprimeImagens));
}
// exports.comprimeJavaScript = comprimeJavaScript;
// exports.comprimeImagens = comprimeImagens;
// exports.compilaSass = compilaSass;



