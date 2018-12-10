jQuery (document).ready(function(){
    
    $(function(){

        //animate scroll to footer
        var footer = $('#site-footer');
        var bottom = $(window).height() - 
        $('.scrollLink').click( function() {
         $('html, body').animate({
              scrollTop: $('#site-footer').offset().top
         }, 2000);
        });

        //set nav bar to become color of footer when at footer
        var footer = $('#site-footer').offset().top;
        $(window).scroll(function() {
            if ($(this).scrollTop() >= footer) {  
                $('.whitebar').addClass("scroll");
            }
            else {
                $('.whitebar').removeClass("scroll");
            }
        });
        
    });
    
});