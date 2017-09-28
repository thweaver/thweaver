$(function() {

FastClick.attach(document.body);

/****************************************
 Variables
 ****************************************/

var 
	html = $('html'),
	hamburger = $('.hamburger'),
	win = $( window );

/****************************************
Retina Class
****************************************/

if (window.matchMedia) { 
	var mq = window.matchMedia("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
	if(mq && mq.matches) {
		document.documentElement.className += ' retina';
	}
}

/****************************************
Loaded Class
****************************************/

win.on( 'load', function() {
	html.addClass( 'loaded' );
});

/****************************************
Nav Toggle
****************************************/

hamburger.click(function(e){
    e.preventDefault();
    html.toggleClass('js-nav-open');
});


/****************************************
Sticky Footer
****************************************/

// function stickyFooter() {
// 	var footerHeight = $(".footer").height();
// 	$(".wrapper").css("padding-bottom", footerHeight);
// 	$(".footer").css("margin-top", -footerHeight);
// }
// win.on( 'load resize', stickyFooter );


/*===============================================
Venobox
===============================================*/

$( '.venobox' ).venobox();

/*===============================================
Homepage text
===============================================*/

window.onload = function(e) {
	$(function(){
		var elemGroups = [];	
		elemGroups.push( $( '.home-brag' ) );
		var iterations = 0; // 0 for infinite loop
		var duration = 3000;
		
		var iteration = 0;
		var total = elemGroups[ 0 ].length;
		var modDuration = Math.floor( ( duration / 1000 ) * 60 );
		var tick = modDuration;
		var lastSlide = null;
		var current = 0;
		var raf = null;
		
		function advanceSlide() {
			elemGroups.forEach( function( elems ) {
				elems.removeClass( 'off' );
				if ( lastSlide !== null ) {
		 			elems.eq( lastSlide ).addClass( 'off' );	
		 		}
				elems.removeClass( 'current-brag' );
				elems.eq( current ).addClass( 'current-brag' );
			});		
			lastSlide = current;
			if ( current < total - 1 ) {
				current++;
				if ( iterations != 0 && iteration >= iterations ) {
					cancelAnimationFrame( raf );
				}
			} else {
				current = 0;
				iteration++;
			}
		}

		function loop() {
			raf = requestAnimationFrame( loop );
			if( tick < modDuration ) {
				tick++;
			} else {
				tick = 0;
				advanceSlide();
			}
		}

		loop();
	});
}

}); // jQuery