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
            scrollTop: $(".home-footer").offset().top - whitebar
        }, 1200);

        console.log($(".home-footer").offset().top);
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
    $(".thumbnail a").hover(function(){
       $(this).children('img').addClass("blur");
       }, function(){
       $(this).children('img').removeClass("blur");
     });

    /*String to letters*/
    $('.to-letter').each(function() {
      var words = $(this).text().split(' '),
      $homeContentSection = $(this).empty();
      $.each(words, function(_, word) {
        if (word === "joyful") {
            $('<a>', {text: word}).appendTo($homeContentSection);
            $('<word>').appendTo($homeContentSection);
            $('.to-letter a').addClass('joyful');
        } else if (word === "traditional") {
          $('<a>', {text: word}).appendTo($homeContentSection);
          $('<word>').appendTo($homeContentSection);
          $('.to-letter a').addClass('traditional');
        } else if (word === "naturally") {
          $('<a>', {text: word}).appendTo($homeContentSection);
          $('<word>').appendTo($homeContentSection);
          $('.to-letter a').addClass('naturally');
        } else if (word === "varied" || word === "field") {
          if (word === "varied") {
            $('<a>', {text: "varied field"}).appendTo($homeContentSection);
            $('<word>').appendTo($homeContentSection);
            $('.to-letter a').addClass('varied');
          }
        } else if (word === "Fritz" || word === "Porter.") {
          if (word == "Fritz") {
            //  /* add link to fritz porter */ www.fritzporter.com
            $('<a>', {text: "Fritz Porter.", href: "https://www.fritzporter.com", target: "_blank"}).appendTo($homeContentSection);
            $('<word>').appendTo($homeContentSection);
            $('.to-letter a').addClass('fritz');
          }
        }
        else {
          $('<word>', {text: word}).appendTo($homeContentSection);
        }
      });
      $('.joyful').removeClass('traditional naturally varied');
      $('.traditional').removeClass('naturally varied');
      $('.varied').removeClass('naturally');
      $('.fritz').removeClass('traditional varied naturally');
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

    /*Joyful Balls*/
    $( ".joyful" ).attr('onmouseover', 'addBall();');
    $( ".joyful" ).attr('onclick', 'addBall();')
    /* add traditional hover image */
    const tSpan = document.createElement('span');
    const tImage = document.createElement('img');
    tImage.src  = 'images/Traditional_Hover.jpg';

    $('.traditional').wrap('<span class="wrap"></span>');
    $('.traditional').append(tSpan);
    $('.traditional span').append(tImage);

    /* add naturally hover image */
    const nSpan = document.createElement('span');
    const nImage = document.createElement('img');
    nImage.src  = 'images/naturally.jpg';

    $('.naturally').wrap('<span class="wrap"></span>');
    $('.naturally').append(nSpan);
    $('.naturally span').append(nImage);

    /* add naturally hover image */
    const vSpan = document.createElement('span');
    const vImage = document.createElement('img');
    vImage.src  = 'images/VariedField.jpg';

    $('.varied').wrap('<span class="wrap"></span>');
    $('.varied').append(vSpan);
    $('.varied span').append(vImage);


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

    /* scroll to top */
    $('.scrollToTopBtn').on("click",function(){
      $('html, body').animate({scrollTop:0}, 'slow');
    });

    $('.archive-column p').each(function() {
      if ($(this).isInViewport()) {
        $(this).removeClass('archive-below-viewport');
      } else {
        $(this).addClass('archive-below-viewport');
      }
    });
    //page load animation
    setTimeout(function() {
      $('.loading').css('bottom', '-110%');
    }, 1500);


});

$( window ).resize(function() {
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

  if ($(this).scrollTop()) {
       $('.scrollToTopBtn').addClass('showBtn');
   } else {
       $('.scrollToTopBtn').removeClass('showBtn');
   }

  /* sticky nav background color change */
  if ($( ".thumbnails" ).offset() != undefined) {
    var thumbnailOffset = $( ".thumbnails" ).offset();
    var infoOffset = $( ".home-footer" ).offset();
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
        $(".homepage .whitebar").css("background-color", "#C8B765");
    }

    var thumbBottom = $( ".thumbnails" ).outerHeight();

    if ($(window).width() <= 450) {
      if($(window).scrollTop() > 53 && $(window).scrollTop() < thumbBottom) {
          // $("nav ul").css("background-color", "white");
          $("nav ul").css("display", "none");
      } else {
          //remove the background property so it comes transparent again (defined in your css)
         // $("nav ul").css("background-color", "#C8B765");
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
  $('.archive-column p').each(function() {
    if ($(this).isInViewport()) {
      $(this).removeClass('archive-below-viewport');
    } else {
      $(this).addClass('archive-below-viewport');
    }
  });
});
