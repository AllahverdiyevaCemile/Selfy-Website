/*header menu*/
$(window).load(function(){
 var mnav = document.querySelector('.mobilenav');
 var menu = document.querySelector('.menu');

 mnav.addEventListener('click',function(){
    menu.classList.toggle('navactive');
 });

  


/*slider-1*/

   $('.client-carousel').owlCarousel({
    loop:true,
    margin:10,
    autoplay:true,
    autoplaySpeed:500,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});
   
   /*slider-2*/


  $('.loop').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 10,
    responsive: {
      600: {
        items: 1
      }
    }
  });
 
});






$(document).ready(function() {


  // TinyNav.js 
  	$('#nav').tinyNav({ header: 'Navigation' });
  
  
  // FitVid.js
     $(".main-container").fitVids();
     
  // Fix Widows
  	 $('p').widowFix();   
 
 
  // Fancybox.js
	 $('.fancybox').fancybox();
	  
  
  
  // BackStretch.js	 
	 $("#masthead").backstretch("img/masthead@2x.jpg");
	 
	 
});


