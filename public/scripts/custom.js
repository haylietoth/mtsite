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
    
    /*info section animation*/
    $(function(){
        $('#info').click(function() {
            if(!$('#site-footer').hasClass('closed')) {
                $('#site-footer').animate({'top': '67px'}, 1000);
                    $(this).delay(1000)
                           .queue(function () {
                                $(this).addClass('material-icons').text('arrow_downward');
                                $(this).dequeue();
                           });
                $('.whitebar').delay(1000)
                              .queue(function() {
                                $(this).addClass("scroll");
                                $(this).dequeue();
                              });
            }
            else {
                $(this).removeClass('material-icons').text('Info');
                $('#site-footer').animate({'top': '1500px'}, 1000)
                $('.whitebar').removeClass("scroll");
            }
        });
    });
});