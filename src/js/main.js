
$(function() {

FastClick.attach(document.body);

/****************************************
 Variables
 ****************************************/

var 
	html = $('html'),
	win = $( window ),
	hamburger = $('.hamburger'),
	homeBody = $('body.home'),
	navBar = $('.sticky-ghost'),
	xlSize = 1530,
	hdSize = 1180,
	desktopSize = 1000,
	laptopSize = 900,
	tabletSize = 800,
	landscapeSize = 600,
	mobileSize = 500,
	xsmallSize = 350;

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
Mobile Size
****************************************/

var winWidth;
function updateWinWidth() {
	winWidth = window.innerWidth;
}

win.on( 'resize load', updateWinWidth );

function watchForMobile() {
	if (winWidth <= tabletSize ) {
		html.addClass('tabletSize');
	} else {
		html.removeClass('tabletSize');
		html.removeClass('nav-enabled');
	}
}

win.on( 'resize load', watchForMobile );


/****************************************
In View
****************************************/


function inView( opt ) {
	if( opt.selector === undefined ) {
		console.log( 'Valid selector required for inView' );
		return false;
	}
	var elems = [].slice.call( document.querySelectorAll( opt.selector ) ),
		once = opt.once === undefined ? true : opt.once,
		offsetTop = opt.offsetTop === undefined ? 0 : opt.offsetTop,
		offsetBot = opt.offsetBot === undefined ? 0 : opt.offsetBot,
		count = elems.length,
		winHeight = 0,
		ticking = false;

	function update() {
		var i = count;
		while( i-- ) {
			var elem = elems[ i ],
				rect = elem.getBoundingClientRect();
			if( rect.bottom >= offsetTop && rect.top <= winHeight - offsetBot ) {
				elem.classList.add( 'in-view' );
				if( once ) {
					count--;
					elems.splice( i, 1 );
				}
			} 
		}
		ticking = false;
	}

	function onResize() {
		winHeight = window.innerHeight;
		requestTick();
	}

	function onScroll() {
		requestTick();
	}
	
	function requestTick() {
		if( !ticking ) {
			requestAnimationFrame( update );
			ticking = true;
		}
	}

	window.addEventListener( 'resize', onResize, false );
	document.addEventListener( 'scroll', onScroll, false );
	document.addEventListener( 'touchmove', onScroll, false );

	onResize();
}

inView({
	selector: '.toggle-view',
	once: false,
	offsetTop: 0,
	offsetBot: -20
});



/****************************************
Hero text classes
****************************************/

window.onload = function(e) {
	$(function(){
		var elemGroups = [];	
		elemGroups.push( $( '.home-brag' ) );
		var iterations = 0; // 0 for infinite loop
		var duration = 2000;
		
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


/****************************************
Header toggle
****************************************/

 var didScroll;
 var lastScrollTop = 0;
 var delta = 5;
 var navbarHeight = $('nav').outerHeight();
 var heroHeight = $('.hero-copy').outerHeight();

 $(window).scroll(function(event){
     didScroll = true;
 });

 setInterval(function() {
     if (didScroll) {
         hasScrolled();
         didScroll = false;
     }
 }, 250);

 function hasScrolled() {
     var st = $(this).scrollTop();
     
     if(Math.abs(lastScrollTop - st) <= delta)
         return;

     if (st > lastScrollTop && st > navbarHeight){
         // Scroll Down
         $('nav').removeClass('nav-down').addClass('nav-up');
     } else {
         // Scroll Up
         if(st + $(window).height() < $(document).height()) {
             $('nav').removeClass('nav-up').addClass('nav-down');
         }
     }

     if (st > lastScrollTop && st > navbarHeight){
         // Scroll Down
         $('.hero').removeClass('hero-on').addClass('hero-off');
     } else {
         // Scroll Up
         if(st + $(window).height() < $(document).height()) {
             $('.hero').removeClass('hero-off').addClass('hero-on');
         }
     }
     
     lastScrollTop = st;
 }

 /****************************************
Page Transition
 ****************************************/

 $('.transition').click(function(e) {
 	e.preventDefault();
	$this = $(this);
	newLocation = $(this).attr("href");
	$('html').addClass('fade-out');
	setTimeout(function(){
	  window.location = newLocation;
	},1000);
});
       
});

