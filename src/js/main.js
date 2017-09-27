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


}); // jQuery