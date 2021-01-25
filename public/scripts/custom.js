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

    const span = document.createElement('span');
    const image = document.createElement('img');
    image.src  = 'images/IMG_6479.GIF';

    $('.joyful').wrap('<span class="wrap"></span>');
    $('.joyful').append(span);
    $('.joyful span').append(image);
//$('<span><img src="images/IMG_6479.GIF"></img></span>', {text: word}).appendTo($homeContentSection);


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

    ///cursor for thumbnails
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
});
