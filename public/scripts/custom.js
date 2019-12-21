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
    
    /*Keep hover letter style after hover*/
    $('letter').hover(
       function(){ 
           $(this).addClass('painted'); 
       }
    );
    $('.thumb').hover(
       function(){ 
           $(this).addClass('painted'); 
       }
    );
    
    /*thumbnail slide-in*/
    (function($) {
      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author Sam Sehnert
       * @desc A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       */
            $.fn.visible = function(partial) {
                var $t            = $(this),
                    $w            = $(window),
                    viewTop       = $w.scrollTop(),
                    viewBottom    = viewTop + $w.height(),
                    _top          = $t.offset().top,
                    _bottom       = _top + $t.height(),
                    compareTop    = partial === true ? _bottom : _top,
                    compareBottom = partial === true ? _top : _bottom;

                return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            };
    })(jQuery);

    var win = $(window);
    var allMods = $(".module");

    allMods.each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
            el.addClass("already-visible"); 
        } 
    });

    win.scroll(function(event) {
  
        allMods.each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("come-in"); 
            } 
        });
    });
});