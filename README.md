# Uso do gulp
- ferramenta de automação de processos

# Instalação
- npm i --g gulp-cli
- npm init
- npm i --save-dev gulp
- npm i --save-dev gulp-sourcemaps
- npm i --save-dev gulp-uglify
- npm i --save-dev gulp-obfuscate
- npm i --save-dev gulp-imagemin@7.1.0

# Ir no package.json
- Inserir o script "gulp":"gulp",
- Criar arquivo de automação gulpfile.js
- git init
- adicionar o node_modules no .gitignore
- npm run gulp

# Criar tarefas
- const gulp = require('gulp'); ->Para chamar as funções do Gulp
- const sourcemaps = require('gulp-sourcemaps'); -> Para mapeamento do css
- no arquivo gulpfile.js
- function funcaoPadrao(){console.log('Teste')}
- function outraFuncao(){console.log('Teste')}
- exports.default = funcaoPadrao;
- exports.outraFuncao = outraFuncao;
- executa npm run gulp -> Execura a função padrao
- executa npm run gulp outraFuncao -> Execura a outraFuncao

# Tarefas em série
- exports.default = gulp.series(funcaoPadrao, outraFuncao);

# Tarefas em paralelo
- exports.default = gulp.parallel(funcaoPadrao, outraFuncao);

# Gulp compilando no sass
- Instalar os plugins
    - npm i --save-dev gulp-sass
    - npm i --save-dev sass
- Importar no gulp os pacotes instalados
    -const sass = require('gulp-sass')(require('sass'));

# Criar uma função para compilar o sass

- function compilaSass(){return gulp.src('./src/styles/*.scss').pipe(sourcemaps.init()).pipe(sass()).pipe(sourcemaps.write('./maps')).pipe(gulp.dest('./build/styles'))}
    - Na função, é declarado como function;
    - Um nome precisa ser dado, compilaSass(){}
        - Dentro desta função, podemos passar como parametro algumas configurações, como compressão     .pipe(sass({outputStyle: 'compressed'}))
    - Como é uma função sem callback, é necessário um return
    - Usa o gulp.src para chamar o arquivo fonte gulp.src('./src/styles/*.scss')
    - Chamamos a função sass() através do pipe .pipe(sass())
    - Agora colocamos o arquivo compilado na pasta destino .pipe(dest('./dest/style')) 
    
# Função funcionar em modo wacth
- exports.watch = function(){gulp.watch('./src/styles/**/*.scss',{ignoreInitial:false} , gulp.series(compilaSass));}

# Minificação
- Importar 
    -  const uglify = require('gulp-uglify');
- Criar tarefa
    - function comprimeJavaScript(){return gulp.src('./src/scripts/*.js').pipe(uglify())
    .pipe(gulp.dest('./build/scripts'))}
- Chamar no terminal -> npm run gulp comprimeJavaScript

# Obfuscação
- Dificultar a leitura do arquivo por outras pessoas
- Importar 
    -  const obfuscate = require('gulp-obfuscate');
    - Dentro da função comprimeJavaScript, por .pipe(obfuscate()) após o uglify

# Comprimir imagem
- Declarar a constante
    - const imagemin = require('gulp-imagemin');
- Criar função
    function comprimeImagens(){return gulp.src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))}

# chama todas as funções
    exports.default =function(){
    gulp.watch('./src/styles/**/*.scss',{ignoreInitial:false} , gulp.series(compilaSass));
    gulp.watch('./src/script/*.js',{ignoreInitial:false} , gulp.series(comprimeJavaScript));
    gulp.watch('./src/images/*',{ignoreInitial:false} , gulp.series(comprimeImagens));
}

# Instalar depedências
- Após o projeto ser clonado no git, basta comandar npm install
- depois npm run gulp