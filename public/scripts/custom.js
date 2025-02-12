$(document).ready(function(){
  // init Masonry for services page
  $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true
  });

  if (window.matchMedia("(max-width: 768px)").matches && ('ontouchstart' in window || navigator.maxTouchPoints)) {
    $(".topnav-right .underline::after").css("background-color", "#D0C9AC");
  }

  var isMobile = false; //initiate as false
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      isMobile = true;
  }

  //new joy ball
  if (!isMobile) {
    $('.joy').on('mouseover', function () {
      $('.dot').addClass('visible');
      $('.dot').removeClass('hidden');
      $('.topnav-left').addClass('moveRight');
      $('.topnav-left').removeClass('moveLeft');

    });
    $('.joy').on('mouseout', function () {
      $('.dot').addClass('hidden');
      $('.dot').removeClass('visible');
      $('.topnav-left').removeClass('moveRight');
      $('.topnav-left').addClass('moveLeft');
    });
  } else {
    $('.joy').on('click', function () {
      if ($('.dot').hasClass('visible')) {
        $('.dot').addClass('hidden');
        $('.dot').removeClass('visible');
      } else {
        $('.dot').addClass('visible');
        $('.dot').removeClass('hidden');
      }

      if ($('.logo-container').hasClass('moveLogoRight')) {
        $('.logo-container').addClass('moveLogoLeft');
        $('.logo-container').removeClass('moveLogoRight');
      } else {
        $('.logo-container').addClass('moveLogoRight');
        $('.logo-container').removeClass('moveLogoLeft');
      }
    });
  }

  // mobile navigation functionality
  $('.menu').click (function(){
    $(this).toggleClass('open');
    $('.topnav-right').toggleClass('displayBlock');
  });

  // exit mobile navigation when clicking on work since it doesn't always reload the page
  $('.scroll-work').click(function(){
    if ($(".menu").hasClass("open")) {
      $('.menu').removeClass('open');
      $('.topnav-right').removeClass('displayBlock');
    }
  })

  /*Smooth scroll*/
  //for home page
  $('.scroll-work').click(function (e) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $(".thumbnails").offset().top - 54
      }, 1200);
  });

  //for non-home pages
  $('.to-work').click(function (e) {
    // Store
    localStorage.setItem("to-home", "work");
    location.href="./";
  });

  /*String to letters*/
  $('.to-letter').each(function() {
    var words = $(this).text().split(' '),
    $homeContentSection = $(this).empty();
    $.each(words, function(_, word) {
      $('<word>', {text: word}).appendTo($homeContentSection);      
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
  $( ".joyful" ).on( "mouseover", function() {
    addBall();
  });

  $( ".joyful" ).on("click", function() {
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

  /* scroll to top */
  $('.scrollToTopBtn').on("click",function(){
    $('html, body').animate({scrollTop:0}, 'slow');
  });

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

// joyful balls container resizing
$( window ).resize(function() {  
  $("#canvas").attr('width', window.innerWidth-21);
  $("#canvas").attr('height', $('#container').height());
  replaceAll();

  if ($(window).width() > 768) {
    $('.topnav-right').removeClass('displayBlock');
    $('.menu').removeClass('open');
  }
});

// page load animation
$(document).on("click", ".logo, .thumbnail-link", function () {
  $('.loading').css('bottom', '0');
});

// tells home page to scroll to thumbnails section if coming from "work" link
$(window).bind("load", function () {
  if(localStorage.getItem("to-home") == "work") {
    var whitebar = 54;
    $('html, body').animate({
        scrollTop: $(".thumbnails").offset().top - whitebar
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
  /* sticky nav background color change */
  if ($( ".thumbnails" ).offset() != undefined) {
    var thumbnailOffset = $( ".thumbnails" ).offset();
    var infoOffset = $( ".home-footer" ).offset();
    var thumbTop = thumbnailOffset.top;
    var infoTop = infoOffset.top;
    var whitebar = 55;

    if($(window).scrollTop() > (thumbTop - whitebar) && $(window).scrollTop() < (infoTop - whitebar)) {
        $(".homepage .whitebar").css("background-color", "#f8f8f4");
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
  // $('.thumbnail, .full-width-image, .block-img, .text-content, .animate, .to-letter, .child, .animated-arrow, .underline, .c-style').each(function() {
  //   if ($(this).isInViewport()) {
  //     $(this).removeClass('below-viewport');
  //   } else {
  //     $(this).addClass('below-viewport');
  //   }
  // });

});
