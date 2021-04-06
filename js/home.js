$(document).ready(function() {

		var input    = $('.cselect div span');
		var dropDown = $('.cselect ul');

		
		// $('.lang_trigger').on("mouseover", function(el){
		// 	console.log(this);
		// 	dropDown.show();
        // });
        // $('.lang_trigger ul').on("mouseleave", function(el){
		// 	console.log(this);
		// 	dropDown.hide();
		// });
		
		dropDown.on("click", "li", function(el){ 
			console.log(input.text( $(this).text() ));
		});
		
 



    var tabsSwiper = new Swiper('.swiper-container', {
        speed: 500,
		autoplay: 4500,
        pagination: '.pagination',
        calculateHeight:true,
        paginationClickable: true,
        onSlideChangeStart: function() {
            $(".tabs .active").removeClass('active');
            $(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
        }
    });

    var tabsSwiperMobile = new Swiper('.swiper-container-mobile', {
        speed: 5000,
        calculateHeight:true,
        paginationClickable: true
    });
		
    $(".tabs a").on('touchstart mousedown', function(e) {
        e.preventDefault()
        $(".tabs .active").removeClass('active')
        $(this).addClass('active')
        tabsSwiper.swipeTo($(this).index())
    })
    $(".tabs a").click(function(e) {
        e.preventDefault()
    });
    $('#arrow-left').on('click', function(e) {
        e.preventDefault();
        tabsSwiper.swipePrev();
    })
    $('#arrow-right').on('click', function(e) {
        e.preventDefault();
        tabsSwiper.swipeNext();
    });

    $('#arrow-left-mobile').on('click', function(e) {
        e.preventDefault();
        tabsSwiperMobile.swipePrev();
    })
    $('#arrow-right-mobile').on('click', function(e) {
        e.preventDefault();
        tabsSwiperMobile.swipeNext();
    });

});