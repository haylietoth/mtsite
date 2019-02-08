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


  script(type='text/javascript').
   var footer = $('#site-footer');
   var bottom = $(window).height() -
   $('.scrollLink').click( function() {
    $('html, body').animate({
    scrollTop: $('#site-footer').offset().top - 77
    }, 2000)-1;
   });
  script(type='text/javascript').
   var footer = $('#site-footer').offset().top - 77;
   $(window).scroll(function() {
    if ($(this).scrollTop() >= footer) {
     $('.whitebar').addClass("scroll");
    }
    else {
     $('.whitebar').removeClass("scroll");
    }
   });


  script(type='text/javascript').
   $('#info').toggle(function() {
    $('#site-footer').animate({'top': '67px'}, 1000);
    }, function() {
    $('#site-footer').animate({'top': '1000px'}, 1000);
    });


script(type='text/javascript').
   $(function(){
    $("#info").click(function() {
     if($('#site-footer').is(':hidden')) {
      $('#site-footer').css({
       'display': 'block'
      });
      $('#site-footer').slideUp("slow", function() {
        //animation complete
      });
      //$('#site-footer').animate({'top': '67px'}, 1000);
      //$('.whitebar').addClass("scroll");
      $('body').css({
       'overflow': 'hidden'
      });
     }
     else {
      $('#site-footer').css({
       'display': 'none'
      });
      //$('.whitebar').removeClass("scroll");
      $('body').css({
       'overflow': 'auto'
      });
     }
    });
   }); 