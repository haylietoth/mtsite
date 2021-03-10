$(document).ready(function(){
    /*Google Analytics*/
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-135736418-1');
    $('a').each(function() {
      if ($(this).attr('id') == 'info') {
        this.setAttribute("onclick","document.getElementById('site-footer').classList.toggle('closed');ga('send', 'event', '"+$(this).attr("href")+"', 'Click', '"+$(this).text()+"');")
      }
      else {
        this.setAttribute("onclick","ga('send', 'event', '"+$(this).attr("href")+"', 'Click', '"+$(this).text()+"');")
      }
    });

    /*page fade-in and fade-out */
    $('body').css('display','none');
    $('body').fadeIn(500);

    $(document).on("click", "a", function () {
        var newUrl = $(this).attr("href");
        if (!newUrl || newUrl[0] === "#") {
            location.hash = newUrl;
            return;
        }
        $("html").fadeOut(function () {
            location = newUrl;
        });
        return false;
    });

    /*Smooth scroll*/
    //for home page
    $('.scroll-work').click(function (e) {
        e.preventDefault();
        var whitebar = 0;
        if ($(window).width() < 767) {
          whitebar = 52;
        } else {
          whitebar = 77;
        }
        $('html, body').animate({
            scrollTop: $(".thumbnails").offset().top - whitebar
        }, 1200);
    });
    $('.scroll-info').click(function (e) {
        e.preventDefault();
        var whitebar = 0;
        if ($(window).width() < 767) {
          whitebar = 52;
        } else {
          whitebar = 77;
        }
        $('html, body').animate({
            scrollTop: $(".home").offset().top - whitebar
        }, 1200);

        console.log($(".home").offset().top);
    });
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
    /* Image blur on thumbnail hover */
    $(".thumbnail a").mouseenter(function(){
      $(this).children('img').addClass("blur");
    });
    $(".thumbnail a").mouseleave(function(){
      $(this).children('img').removeClass("blur");
    });

    /* Loading icon while image loads */
    // $('img').on('load', function() {
    //   if ($(this).parent().hasClass("block-img")) {
    //     $(this).parent().prev().css("display","none");
    //  } else {
    //    $(this).prev().css("display","none");
    //  }
    // });
    /*String to letters*/
    $('.to-letter').each(function() {
      var words = $(this).text().split(' '),
      $homeContentSection = $(this).empty();
      $.each(words, function(_, word) {
        if (word == "joyful") {
            $('<a>', {text: word}).appendTo($homeContentSection);
            $('<word>').appendTo($homeContentSection);
            $('.to-letter a').addClass('joyful');
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
    $('.to-letter a').hover(
      function(){
          $(this).addClass('painted');
      }
    );
    $('.thumb').hover(
       function(){
           $(this).addClass('painted');
       }
    );

    /* add joyful hover image */
    const span = document.createElement('span');
    const image = document.createElement('img');
    image.src  = 'images/IMG_6479.GIF';

    $('.joyful').wrap('<span class="wrap"></span>');
    $('.joyful').append(span);
    $('.joyful span').append(image);

    /* cursor for thumbnails */
    var title = "";
    $(document).mousemove(function (e) {
        $(".thumbnail a").each(function(i, v) {
            var container = v;
            var img = $(this).children()[0];
            var test = '<i class="material-icons">arrow_forward &nbsp; </i>';

            if((e.pageY < $(img).offset().top ||
               e.pageY > $(img).offset().top + $(img).height() ||
               e.pageX < $(img).offset().left ||
               e.pageX > $(img).offset().left + $(img).width()) ){

                if( $(container).children().length == 2){
                   $(container).children()[0].title = $($(container).children()[1]).html();
                   container.removeChild($(container).children()[1]);
                }
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

    $('.block-img').each(function() {
      $(this).addClass('scroll-transition-fade');
      if ($(this).isInViewport()) {
        $(this).removeClass('below-viewport');
      } else {
        $(this).addClass('below-viewport');
      }
    });
});

$(window).bind("load", function () {
  if(localStorage.getItem("to-home") == "work") {
    var whitebar = 0;
    if ($(window).width() < 767) {
      whitebar = 52;
    } else {
      whitebar = 77;
    }
    $('html, body').animate({
        scrollTop: $(".thumbnails").offset().top - whitebar
    }, 1200);
    // Reset
    localStorage.setItem("to-home", "");
  }
  if (localStorage.getItem("to-home") == "info") {
    // console.log($(".home").offset().top);
    var whitebar = 0;
    if ($(window).width() < 767) {
      whitebar = 52;
    } else {
      whitebar = 77;
    }
    $('html, body').animate({
        scrollTop: $(".home").offset().top - whitebar
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
    var infoOffset = $( ".home" ).offset();
    var thumbTop = thumbnailOffset.top;
    var infoTop = infoOffset.top;
    var whitebar = 0;
    if ($(window).width() < 767) {
      whitebar = 53;
    } else {
      whitebar = 78;
    }

    if($(window).scrollTop() > (thumbTop - whitebar) && $(window).scrollTop() < (infoTop - whitebar)) {
        $(".homepage .whitebar").css("background-color", "white");
    } else {
        //remove the background property so it comes transparent again (defined in your css)
       $(".homepage .whitebar").css("background-color", "#4a9885");
    }

    var thumbBottom = $( ".thumbnails" ).outerHeight();

    if ($(window).width() <= 450) {
      if($(window).scrollTop() > 53 && $(window).scrollTop() < thumbBottom) {
          // $("nav ul").css("background-color", "white");
          $("nav ul").css("display", "none");
      } else {
          //remove the background property so it comes transparent again (defined in your css)
         // $("nav ul").css("background-color", "#4a9885");
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
});
