
$(function() {

FastClick.attach(document.body);

/****************************************
 Variables
 ****************************************/

var 
	html = $('html'),
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
	xsmallSize = 350,
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


// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });


/****************************************
Nav Toggle
****************************************/

hamburger.click(function(e){
    e.preventDefault();
    html.toggleClass('js-nav-open');
});


///////// Mobile Size

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

////////// Animated Scroll

win.scroll(function(i){
	if (win.width() > tabletSize ) {
		var scrollVar = win.scrollTop();
		$(".hero-copy").css("opacity", 1 - win.scrollTop() / (window.innerHeight - 300));
		$(".scroll-prompt").css("opacity", 1 - win.scrollTop() / (window.innerHeight - 300));
	}
});


///////// Sticky Nav

// if ( homeBody.length >= 1 ) {
// 	var scrollTop;
// 	function updateScrollTop() {
// 	  scrollTop = win.scrollTop();
// 	}
// 	win.on( 'scroll load', updateScrollTop );

// 	function stickyNav() {
// 	  var isextended = false,
// 	    headerLogo = $( '.sticky-ghost' ),
// 	    navHeight = navBar.height();
	  
// 	  function checkextendedNav() {
// 	    swapPoint = headerLogo.offset().top + headerLogo.height();
// 	    if( isextended && scrollTop < swapPoint ) {
// 	      isextended = false;
// 	      html.removeClass( 'sticky-nav' );
// 	    } else if( !isextended && scrollTop >= swapPoint && winWidth  > mobileSize ) {
// 	      isextended = true;
// 	      html.addClass( 'sticky-nav' );
// 	    }
// 	  }

// 	  function returnExpanded() {
// 	    if(html.hasClass('tabletSize')) {
// 	      html.removeClass('sticky-nav');
// 	    }
// 	  }
	  
// 	  win.on( 'scroll resize', checkextendedNav );
// 	  checkextendedNav();
// 	  win.on( 'scroll resize', returnExpanded );
// 	  returnExpanded();
// 	}
// 	win.on( 'load', stickyNav );	
// } else {
// 	var scrollTop;
// 	function updateScrollTop() {
// 	  scrollTop = win.scrollTop();
// 	}
// 	win.on( 'scroll load', updateScrollTop );

// 	function stickyLogo() {
// 	  var isextended = false,
// 	    headerLogo = $( 'header' ),
// 	    navHeight = navBar.height();
	  
// 	  function checkextendedNav() {
// 	    swapPoint = headerLogo.offset().top + headerLogo.height() - navHeight;
// 	    if( isextended && scrollTop < swapPoint ) {
// 	      isextended = false;
// 	      html.removeClass( 'sticky-logo' );
// 	    } else if( !isextended && scrollTop >= swapPoint && winWidth  > mobileSize ) {
// 	      isextended = true;
// 	      html.addClass( 'sticky-logo' );
// 	    }
// 	  }

// 	  function returnExpanded() {
// 	    if(html.hasClass('tabletSize')) {
// 	      html.removeClass('sticky-logo');
// 	    }
// 	  }
	  
// 	  win.on( 'scroll resize', checkextendedNav );
// 	  checkextendedNav();
// 	  win.on( 'scroll resize', returnExpanded );
// 	  returnExpanded();
// 	}
// 	win.on( 'load', stickyLogo );
// }


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
	offsetBot: 0
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


 //  var isAnimating = false,
 //    newLocation = '';
 //    firstLoad = false;
  
 //  //trigger smooth transition from the actual page to the new one 
 //  $('main').on('click', '[data-type="page-transition"]', function(event){
 //    event.preventDefault();
 //    //detect which page has been selected
 //    var newPage = $(this).attr('href');
 //    //if the page is not already being animated - trigger animation
 //    if( !isAnimating ) changePage(newPage, true);
 //    firstLoad = true;
 //  });

 //  //detect the 'popstate' event - e.g. user clicking the back button
 //  $(window).on('popstate', function() {
 //  	if( firstLoad ) {
 //      /*
 //      Safari emits a popstate event on page load - check if firstLoad is true before animating
 //      if it's false - the page has just been loaded 
 //      */
 //      var newPageArray = location.pathname.split('/'),
 //        //this is the url of the page to be loaded 
 //        newPage = newPageArray[newPageArray.length - 1];

 //      if( !isAnimating  &&  newLocation != newPage ) changePage(newPage, false);
 //    }
 //    firstLoad = true;
	// });

	// function changePage(url, bool) {
 //    isAnimating = true;
 //    // trigger page animation
 //    $('body').addClass('page-is-changing');
 //    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
 //    	loadNewContent(url, bool);
 //      newLocation = url;
 //      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
 //    });
 //    //if browser doesn't support CSS transitions
 //    if( !transitionsSupported() ) {
 //      loadNewContent(url, bool);
 //      newLocation = url;
 //    }
	// }

	// function loadNewContent(url, bool) {
	// 	url = ('' == url) ? 'index.php' : url;
 //  	var newSection = 'cd-'+url.replace('.php', '');
 //  	var section = $('<div class="cd-main-content '+newSection+'"></div>');
  		
 //  	section.load(url+' .cd-main-content > *', function(event){
 //      // load new content and replace <main> content with the new one
 //      $('main').html(section);
 //      //if browser doesn't support CSS transitions - dont wait for the end of transitions
 //      var delay = ( transitionsSupported() ) ? 1200 : 0;
 //      setTimeout(function(){
 //        //wait for the end of the transition on the loading bar before revealing the new content
 //        ( section.hasClass('cd-about') ) ? $('body').addClass('cd-about') : $('body').removeClass('cd-about');
 //        $('body').removeClass('page-is-changing');
 //        $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
 //          isAnimating = false;
 //          $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
 //        });

 //        if( !transitionsSupported() ) isAnimating = false;
 //      }, delay);
      
 //      if(url!=window.location && bool){
 //        //add the new page to the window.history
 //        //if the new page was triggered by a 'popstate' event, don't add it
 //        window.history.pushState({path: url},'',url);
 //      }
	// 	});
 //  }

 //  function transitionsSupported() {
 //    return $('html').hasClass('csstransitions');
 //  }

 $(document).ready(function() {
   $('body').css('display', 'none');
   $('body').fadeIn(750);
   $('.transition').click(function(event) {
     event.preventDefault();
     newLocation = $(this).attr("href");
     $('body').fadeOut(750, newpage);
   });
   function newpage() {
     window.location = newLocation;
   }
 });

       
});

