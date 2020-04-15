jQuery (document).ready(function(){

    /*Google Analytics*/
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-135736418-1');

    $(function() {
        $('a').each(function() {
            if ($(this).attr('id') == 'info') {
                this.setAttribute("onclick","document.getElementById('site-footer').classList.toggle('closed');ga('send', 'event', '"+$(this).attr("href")+"', 'Click', '"+$(this).text()+"');")
            }
            else {
                this.setAttribute("onclick","ga('send', 'event', '"+$(this).attr("href")+"', 'Click', '"+$(this).text()+"');")
            }
        });
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
    $(document).ready(function(){
        $("a").on('click', function(event) {
            if (this.hash !== "") {
              event.preventDefault();
              var hash = this.hash;
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 1000, function(){
                window.location.hash = hash;
              });
            }
        });
    });
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



    /*Delayed scroll on thumbnails*/
    $.fn.isInViewport = function() {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      return elementBottom < viewportTop && elementTop > viewportBottom;
    };

    $(window).on('scroll', function() {
      $('.thumbnail').each(function() {
        if ($(this).isInViewport()) {
          $(this).addClass('below-viewport');
        } else {
          $(this).removeClass('below-viewport');
        }
      });
    });

    //animated cursor
    // var joyful = document.querySelector(".joyful");
    // var cursorArray = ['url("../images/cursor/01.png"), auto',
    //                    'url("../images/cursor/02.png"), auto',
    //                    'url("../images/cursor/03.png"), auto',
    //                    'url("../images/cursor/04.png"), auto',
    //                    'url("../images/cursor/05.png"), auto',
    //                    'url("../images/cursor/06.png"), auto',
    //                    'url("../images/cursor/07.png"), auto',
    //                    'url("../images/cursor/08.png"), auto',
    //                    'url("../images/cursor/09.png"), auto',
    //                    'url("../images/cursor/10.png"), auto',
    //                    'url("../images/cursor/11.png"), auto',
    //                    'url("../images/cursor/12.png"), auto',
    //                    'url("../images/cursor/13.png"), auto',
    //                    'url("../images/cursor/14.png"), auto',
    //                    'url("../images/cursor/15.png"), auto',
    //                    'url("../images/cursor/16.png"), auto',
    //                    'url("../images/cursor/17.png"), auto',
    //                    'url("../images/cursor/18.png"), auto',
    //                    'url("../images/cursor/19.png"), auto'];
    // i = 0;
    // (function cursor(){
    //   joyful.style.cursor  = cursorArray[i];
    //   i++;
    //   if(i == cursorArray.length){
    //     i = 0;
    //   }
    //    setTimeout(cursor, 75);
    // })();

});
