$(document).ready(function(){
  if (window.matchMedia("(max-width: 768px)").matches && ('ontouchstart' in window || navigator.maxTouchPoints)) {
    $(".topnav-right .underline::after").css("background-color", "#D0C9AC");
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
  if ($(window).width() <= 525) {
    if($("letter:contains(&)").siblings().length == 0) {
      $('</br>').appendTo($("letter:contains(&)").parent());
    }
  }

  // slow scroll load for project page images
  $('.full-width-image, .two-col-row').each(function() {
    if ($(this).isInViewport()) {
      $(this).removeClass('below-viewport');
    } else {
      $(this).addClass('below-viewport');
    }
  }); 

  /*Keep hover letter style after hover*/
  $('letter').hover(
      function(){
          $(this).addClass('painted serif-font');
      }
  );

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
                  title = $("<div class='img_title body-font'>" + $(container).children()[0].title + "</div>");
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

  // get pageId and wrapper
  const pageId =  $('#left-wrapper').data('page-id');
  const wrapper = $("#left-wrapper");

  // functions to render button or link
  function renderButton() {
    wrapper.html(`<button class="dot joyful" type="button"></button>`);
  }
  function renderLink() {
    wrapper.html(`<a href="${altLink.href}" disabled aria-disabled="true">${altLink.label}</a>`);
  }

  // initial left nav lnk render
  if (pageId === "home") {
    renderButton(); 
  } else {
    renderLink();
  }

  // handle scroll functionalities
  $(window).on("scroll", function() {
    /* sticky nav background color change */
    if ($( ".thumbnails" ).offset() != undefined) {

      // only do this stuff on the homepage!
      if (pageId !== "home") return;

      var thumbnailOffset = $( ".thumbnails" ).offset();
      var infoOffset = $( ".home-footer" ).offset();
      var thumbTop = thumbnailOffset.top;
      var infoTop = infoOffset.top;
      var whitebar = 55;


      if($(window).scrollTop() > (thumbTop - whitebar) && $(window).scrollTop() < (infoTop - whitebar)) {
          $(".homepage .whitebar").css("background-color", "#f8f8f4");
          if (!wrapper.find("a").length) renderLink();
      } else {
          $(".homepage .whitebar").css("background-color", homeMenuColor);
          if (!wrapper.find("button").length) renderButton();
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

    // slow scroll load for images on project pages
    $('.full-width-image, .two-col-row').each(function() {
      if ($(this).isInViewport()) {
        $(this).removeClass('below-viewport');
      } else {
        $(this).addClass('below-viewport');
      }
    });

    // fade in images on archive page
    $('.grid-item').each(function() {
      if ($(this).isInViewport()) {
        $(this).removeClass('archive-below-viewport');
      } else {
        $(this).addClass('archive-below-viewport');
      }
    });
  });

    /*Joyful Balls*/
  $( ".joyful" ).on( "mouseover", function() {
    addBall();
  });

  $( ".joyful" ).on("click", function() {
    addBall();
  });

  // init Masonry for archive page
  if (pageId === "archive") {
    const grid = document.querySelector('.grid');
    const msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      percentPosition: true,
      transitionDuration: 0
    });

    // Watch each image load
    imagesLoaded(grid)
      .on('progress', function () {
        msnry.layout(); // Re-layout after each image loads

        // Reveal items that are in viewport
        $('.grid-item').each(function () {
          if ($(this).isInViewport()) {
            $(this).removeClass('archive-below-viewport');
          }
        });
      });

    // Also check visibility on scroll/resize
    $(window).on('scroll resize', function () {
      $('.grid-item').each(function () {
        if ($(this).isInViewport()) {
          $(this).removeClass('archive-below-viewport');
        }
      });
    });
  }

});

// joyful balls container resizing
$(window).resize(function () {  
  $("#canvas").attr('width', window.innerWidth - 21);
  $("#canvas").attr('height', $('#container').height());

  // Clamp only stopped balls
  for (var i = 0; i < num; i++) {
    if (p[i]) {
      p[i].clampToBounds(); // only adjusts if the ball is stopped
      p[i].draw();          // redraw
    }
  }

  // Responsive layout (unchanged)
  if ($(window).width() > 768) {
    $('.topnav-right').removeClass('displayBlock');
    $('.menu').removeClass('open');
  }

  if ($(window).width() <= 525) {
    if ($("letter:contains(&)").siblings().length == 0) {
      $('<br>').appendTo($("letter:contains(&)").parent());
    }
  } else {
    if ($("letter:contains(&)").siblings().length > 0) {
      $("letter:contains(&)").parent().children()[1].remove();
    }
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
