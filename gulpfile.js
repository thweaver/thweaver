/*==============================================================================
Gulp
==============================================================================*/

var gulp = require( 'gulp' ),
	gulpLoadPlugins = require( 'gulp-load-plugins' ),
	p = gulpLoadPlugins();

function handleError( err ) {
	console.log( err.toString() );
	this.emit( 'end' );
}

/*==============================================================================
Clean
==============================================================================*/

gulp.task( 'clean', function() {
	gulp.src( [ 'css', 'js', 'images', 'fonts' ], { 
			read: false
		})
		.pipe( p.rimraf() )
		.pipe( p.notify( 'Gulp Clean Task Complete' ) );
});

/*==============================================================================
Styles
==============================================================================*/

gulp.task( 'css-wp', function() {
	return gulp.src( 'src/scss/wp-*.scss' )
		.pipe( p.sass({outputStyle: 'compressed'}).on('error', p.sass.logError))
		.pipe( p.autoprefixer() )
		.pipe( gulp.dest( 'tw/css' ) );
});

gulp.task( 'styles', [ 'css-wp' ], function() {
	return gulp.src( 'src/scss/imports.scss' )
		.pipe( p.sass({outputStyle: 'expanded'}).on('error', p.sass.logError))
		.pipe( p.autoprefixer() )
		.pipe( p.cssnano({
			advanced: false,
			minifyGradients: false,
			zindex: false
		}))
		.pipe( p.rename( 'main.min.css' ) )
		.pipe( gulp.dest( 'tw/css' ) );
});

/*==============================================================================
Fonts
==============================================================================*/

gulp.task( 'fonts', function() {
	gulp.src('src/fonts/**/*' )
		.pipe( gulp.dest( 'tw/fonts' ) );
});

/*==============================================================================
Scripts
==============================================================================*/

gulp.task( 'scripts1', function() {
	return gulp.src( [ 'src/js/*.js', '!src/js/imports.js',] )
		.pipe( p.jshint() )
		.pipe( p.jshint.reporter( 'default') );
});

gulp.task( 'scripts2', [ 'scripts1' ], function() {
	return gulp.src( 'src/js/lib/imports.js' )
		.pipe( p.imports() )
		.pipe( p.uglify() )
		.pipe( p.rename( 'imports.lib.min.js' ) )
		.pipe( gulp.dest( 'temp' ) );
});

gulp.task( 'scripts3', [ 'scripts2' ], function() {
	return gulp.src( 'src/js/imports.js' )
		.pipe( p.imports() )
		.pipe( p.uglify() )
		.on( 'error', handleError )
		.pipe( p.rename( 'imports.min.js' ) )
		.pipe( gulp.dest( 'temp' ) );
});

gulp.task( 'scripts4', [ 'scripts3' ], function() {
	return gulp.src( [ 'temp/imports.lib.min.js', 'temp/imports.min.js' ] )
		.pipe( p.concat( 'main.min.js') )
		.pipe( gulp.dest( 'tw/js' ) );
});

gulp.task( 'scripts5', [ 'scripts4' ], function() {
	return gulp.src( 'temp', {
			read: false
		})
		.pipe( p.rimraf() );
});

gulp.task( 'scripts', [ 'scripts5' ], function() {
	return gulp.src( 'src/js/lib/modernizr.min.js' )
		.pipe( gulp.dest( 'tw/js' ) )
		.pipe( p.notify( 'Gulp Scripts Task Complete' ) );
});

/*==============================================================================
Images
==============================================================================*/

gulp.task( 'images', function() {
	gulp.src( 'src/img/**/*' )
		.pipe( p.changed( 'tw/img' ) )
		.pipe( p.imagemin( { optimizationLevel: 3, progressive: true, interlaced: true } ) )
		.pipe( gulp.dest( 'tw/img' ) )
		.pipe( p.notify( 'Gulp Images Task Completed' ) );
});


/*==============================================================================
Watch
==============================================================================*/

gulp.task('watch', function() {
	gulp.watch( 'src/scss/**/*', [ 'styles' ] );
	gulp.watch( 'src/js/**/*.js', [ 'scripts' ] );
	gulp.watch( 'src/img/**/*', [ 'images' ] );
});

/*==============================================================================
Default
==============================================================================*/

gulp.task( 'default', [ 'styles', 'scripts', 'images' ], function() {
	gulp.start( 'watch' );
});