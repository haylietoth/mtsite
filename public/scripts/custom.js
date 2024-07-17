$(document).ready(function(){

  var windowWidth = $(window).width();
  if (windowWidth < 768) {
      $("#badge").appendTo("#process");
  } else {
      $("#badge").appendTo("#list");
  }

  if (window.matchMedia("(max-width: 768px)").matches && ('ontouchstart' in window || navigator.maxTouchPoints)) {
    $(".topnav-right .underline::after").css("background-color", "#D0C9AC");
  }

  $('.menu').click (function(){
    $(this).toggleClass('open');
    $('.topnav-right').slideToggle();
  });

  /*Smooth scroll*/
  //for home page
  $('.scroll-work').click(function (e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $(".thumbnails").offset().top - 54
      }, 1200);
  });
  // $('.scroll-info').click(function (e) {
  //     e.preventDefault();
  //     var whitebar = 0;
  //     if ($(window).width() < 767) {
  //       whitebar = 52;
  //     } else {
  //       whitebar = 77;
  //     }
  //     $('html, body').animate({
  //         scrollTop: $(".home-footer").offset().top - whitebar
  //     }, 1200);

  //     console.log($(".home-footer").offset().top);
  // });
  //for non-home pages
  $('.to-work').click(function (e) {
    // Store
    localStorage.setItem("to-home", "work");
    location.href="./";
  });
  $('.to-info').click(function (e) {
    // Store
    localStorage.setItem("to-home", "info");
    location.href="./";
  });

  /*String to letters*/
  $('.to-letter').each(function() {
    var words = $(this).text().split(' '),
    $homeContentSection = $(this).empty();
    $.each(words, function(_, word) {
      if (word === "&") { 
        $('<word>', {text: word}).appendTo($homeContentSection);
        $('</br>').appendTo($homeContentSection);
      } else {
        $('<word>', {text: word}).appendTo($homeContentSection);
      }
      
    });
  });
  $('word').each(function() {
    var letters = $(this).text().split(''),
    $wordElement = $(this).empty();
    $.each(letters, function(_, letter) {
      $('<letter>', {text: letter}).appendTo($wordElement);
    });
  });

  /*Keep hover letter style after hover*/
  $('letter').hover(
      function(){
          $(this).addClass('painted');
      }
  );

  /*Joyful Balls*/
  $( ".joyful" ).on( "click, mouseover", function() {
    addBall();
  });

  /* cursor and blur for thumbnails */
  var title = "";
  $('.thumbnails').mousemove(function (e) {
      $(".thumbnail a").each(function(i, v) {
          var container = v;
          var img = $(this).children()[0];

          if((e.pageY < $(img).offset().top ||
              e.pageY > $(img).offset().top + $(img).height() ||
              e.pageX < $(img).offset().left ||
              e.pageX > $(img).offset().left + $(img).width()) ){

              if( $(container).children().length == 2){
                  $(container).children()[0].title = $($(container).children()[1]).html();
                  container.removeChild($(container).children()[1]);
              }
                /* Image blur removed */
              $(this).children('.title-container').removeClass("blur");
          }
          else {
              if($(container).children().length == 1){
                  title = $("<div class='img_title'>" + $(container).children()[0].title + "</div>");
                  $(container).children()[0].title = "";
                  $(container).append(title);
              }
              title.offset({
                  top: (e.pageY ? e.pageY : e.clientX),
                  left: (e.pageX ? e.pageX : e.clientY)
              });
              /* Image blur added */
              $(this).children('.title-container').addClass("blur");
          }
          test = "";
      });
  });

  //Slow load for images
  $('.full-width-image').each(function() {
    if ($(this).isInViewport()) {
      $(this).removeClass('below-viewport');
    } else {
      $(this).addClass('below-viewport');
    }
  });

  // $('.block-img').each(function() {
  //   $(this).addClass('scroll-transition-fade');
  //   if ($(this).isInViewport()) {
  //     $(this).removeClass('below-viewport');
  //   } else {
  //     $(this).addClass('below-viewport');
  //   }
  // });

  /* scroll to top */
  $('.scrollToTopBtn').on("click",function(){
    $('html, body').animate({scrollTop:0}, 'slow');
  });

  // $('.archive-column p').each(function() {
  //   if ($(this).isInViewport()) {
  //     $(this).removeClass('archive-below-viewport');
  //   } else {
  //     $(this).addClass('archive-below-viewport');
  //   }
  // });
  //page load animation
  setTimeout(function() {
    $('.loading').css('bottom', '-110%');
  }, 1500);

  // zoom in archive images & call for generation of share links
  $('.archive-thumbnail').click(function() {
    // console.log('image click');
    openOverlay($(this));
  });

  // open archive image overlay
  function openOverlay(imageContainer) {
    var zoomedImg = imageContainer.clone();
    var zoomedContainer = $("<div class='zoomed'></div>");

    zoomedContainer.append(zoomedImg);
    $('.overlay').append(zoomedContainer);
    $('.overlay').fadeIn();
  }

  // close the overlay
  function closeOverlay() {
    $('.overlay').fadeOut();
    $('.zoomed').remove();
  }
  // click functinos to call overlay close
  $('.overlay, #exit').click(function(event) {
    if (!$(event.target).is('.img-menu, #zoom, #fullscreen')) {
      closeOverlay();
    }
  });

  // handles fullscreen option
  var isFullScreen = false;
  var fullScreenIcon = $("#fullscreen");
  
  $('#fullscreen').on('click', function() {
    //open and close fullscreen
    var $document = $(document);
    if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }

    //toggle fullscreen icon
    isFullScreen = !isFullScreen;
    var changeIcon = isFullScreen ? "&#xE5D1;" : "&#xE5D0;";
    fullScreenIcon.html(changeIcon);
  });

  // handles zoom option
  var isZoomed = false;
  var zoomIcon = $("#zoom");

  $('#zoom').on('click', function() {
    var zoomedImage = $(".archive-thumbnail");

    //toggle fullscreen icon
    isZoomed = !isZoomed;
    var changeIcon = isZoomed ? "&#xE900;" : "&#xE8FF;";
    zoomIcon.html(changeIcon);

    //make draggable
    zoomedImage.draggable({
      cursor: "move"
    });

    //zoom behavior
    if(isZoomed) {
      $('.zoomed img ').css('transform', 'translate3d(0px, 0px, 0px) scale(3)');
    } else {
      $('.zoomed img ').css('transform', 'translate3d(0px, 0px, 0px) scale(1)');
    }
  });
});

$( window ).resize(function() {
  var windowWidth = $(window).width();

  if (windowWidth < 768) {
      $("#badge").appendTo("#process");
      $('.topnav-right').css("display", "none");
  } else {
      $("#badge").appendTo("#list");
      $('.topnav-right').css("display", "flex");
  }
  
  $("#canvas").attr('width', window.innerWidth-21);
  $("#canvas").attr('height', $('#container').height());
  replaceAll();
});

//page load animation
$(document).on("click", ".logo, .thumbnail-link", function () {
  $('.loading').css('bottom', '0');
});

$(window).bind("load", function () {
  if(localStorage.getItem("to-home") == "work") {
    var whitebar = 54;
    $('html, body').animate({
        scrollTop: $(".thumbnails").offset().top - whitebar
    }, 1200);
    // Reset
    localStorage.setItem("to-home", "");
  }
  if (localStorage.getItem("to-home") == "info") {
    // console.log($(".home").offset().top);
    var whitebar = 55;
    $('html, body').animate({
        scrollTop: $(".home-footer").offset().top - whitebar
    }, 1200);
    // Reset
    localStorage.setItem("to-home", "");
  }
});

/*Delayed scroll on thumbnails*/
$.fn.isInViewport = function() {
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }

  var top_of_element = $(this).offset().top;
  var bottom_of_screen = $(window).scrollTop() + myHeight

  if (top_of_element < bottom_of_screen){
    return true;
  } else {
    return false;
  }
};

$(window).on("scroll", function() {
  /* show scroll to top button */
  /* use same logic to change svg logo */
  //svg paths and container it should display in
   var svgFull = "../images/logos/MadeleineEdwards_Black.svg";
   var svgMono = "../images/logos/ME_Black.svg";
   var $svgContainer = $('.logo');
   var windowWidth = $(window).width();
  // console.log($(this).scrollTop());

  if ($(this).scrollTop() <= 10) {
    //hide scroll button
    $('.scrollToTopBtn').removeClass('showBtn');
   } else {
    //show scroll button
    $('.scrollToTopBtn').addClass('showBtn');
  }

  if (windowWidth >= 768) {
    if ($(this).scrollTop() <= 1) {
      $(".whitebar").css('height', '62px');
      $svgContainer.load(svgFull, function(response, status, xhr) {
      if (status === 'error') {
        $(".logo").html("SVG image not found :/");
      }
    });
    } else { 
      //update height of nav and logo on non-mobile only
      if (windowWidth >= 768) {
        $(".whitebar").css('height','55px');
          $svgContainer.load(svgMono, function(response, status, xhr) {
          if (status === 'error') {
            $(".logo").html("SVG image not found :/");
          }
        });
      }
    }
  }

  /* sticky nav background color change */
  if ($( ".thumbnails" ).offset() != undefined) {
    var thumbnailOffset = $( ".thumbnails" ).offset();
    var infoOffset = $( ".home-footer" ).offset();
    var thumbTop = thumbnailOffset.top;
    var infoTop = infoOffset.top;
    var whitebar = 55;

    if($(window).scrollTop() > (thumbTop - whitebar) && $(window).scrollTop() < (infoTop - whitebar)) {
        $(".homepage .whitebar").css("background-color", "white");
    } else {
        $(".homepage .whitebar").css("background-color", homeMenuColor);
    }

    var thumbBottom = $( ".thumbnails" ).outerHeight();

    if ($(window).width() <= 450) {
      if($(window).scrollTop() > 53 && $(window).scrollTop() < thumbBottom) {
          $("nav ul").css("display", "none");
      } else {
          //remove the background property so it comes transparent again (defined in your css)
         $("nav ul").css("display", "block");
      }
    }
  }

  /*Delayed scroll on thumbnails*/

  $('.thumbnail, .full-width-image, .block-img, .text-content, .animate, .to-letter, .child, .animated-arrow, .underline, .c-style').each(function() {
    if ($(this).isInViewport()) {
      $(this).removeClass('below-viewport');
    } else {
      $(this).addClass('below-viewport');
    }
  });
  //different animation for archive page
  // $('.archive-column img').each(function() {
  //   if ($(this).isInViewport()) {
  //     $(this).removeClass('archive-below-viewport');
  //   } else {
  //     $(this).addClass('archive-below-viewport');
  //   }
  // });
});
