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
        if (!newUrl || newUrl[0] === "#" || newUrl[1] === "#") {
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
});