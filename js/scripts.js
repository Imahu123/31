var isMobile = false;
var oldHoveredMenuItem = null;
var menuTimeoutHandler;
var menuTimeout = 100; //time to appear dropdown
var favorites = true;
var favicon;
var stickyVisible = false;

String.prototype.isNumber = function(){return /^\d+$/.test(this);}

$(function() {

	if ($(window).width() >= 768) {
	    isMobile = false;
	} else {
	    isMobile = true;
		$('.pizza_main_menu').hide();
	}
	
	// $('.main').css('margin-bottom',$('.footer_wrapper').outerHeight()-20);
	
	/* setTimeout(function(){ 
		$('.main').css('margin-bottom',$('.footer_wrapper').outerHeight()-20); 
	}, 3000); */
	
    setHeaderEventHandlers();
	moosendVerifyUser();
    
	$('.btn-call').on('click tap', function(e){
		e.preventDefault();
		
		var obj = $(this);
		var oldhtml = obj.html();

		var number = $('#callBackPhoneNumber').val();


		if (number.length != 10 || !number.isNumber()){
			obj.parent().parent().find('.error').removeClass('hidden');
			return false;
		}else{
			if ( number.charAt(0) != 6 || number.charAt(1) != 9) {
				if (number.charAt(0) != 2){
					obj.parent().parent().find('.error').removeClass('hidden');
					return false;
				}
			}
		}

		obj.parent().parent().find('.error').addClass('hidden');
		obj.addClass('disabled');
		obj.addClass('has-spinner');
		obj.html('<span class="spinner"><i class="fa fa-refresh fa-spin"></i></span>');

		$.ajax({
			type	: 'GET',
			url		:  siteUrl + '/callmeback/',
			data	: { 
				number: number 
			},
			success	: function(response) {
				var resp = JSON.parse(response);

				if (resp.status != 'OK'){
			
					$('#callBackModal').modal('hide')
					obj.removeClass('disabled');
					obj.removeClass('has-spinner');
					obj.html(oldhtml);

				}

			},
			error : function(jqXHR, textStatus, errorThrown) {

				$('#callBackModal h5').text('Something gone wrong');

				obj.removeClass('disabled');
				obj.removeClass('has-spinner');
				obj.html(oldhtml);
			}
		});

		
	});

	favicon = new Favico({
		animation : 'popFade'
	});

	if (cartTotal !== undefined && cartTotal !== '') {
		favicon.badge(cartTotal);
	}
	
	 
	$('.toggleCookieView').on('click tap', function(e){
		$("#accept_cook_1, #accept_cook_2").toggle();
			$('#accept_cook input[type=range][orient=vertical]').css({"width":"100%"});
	});

	$('#shoppingCardIcon').hover( 
		function(){
			$('img', this).attr('src', '/assets/site/images/cart-icon.png');
		},
		function(){
			$('img', this).attr('src', '/assets/site/images/cart-icon-white.png');
		}
	);

    $(".dropdown,.dropdown-content").hover(
        function() {
			$('.phoneIcon img', this).attr('src' , '/assets/site/images/phone_plus.png'); 
			$('.dropdown-content', this).stop(true, true).slideDown(100); 
        },
        function() {
			$('.phoneIcon img', this).attr('src' , '/assets/site/images/phone_plus_white.png');
            $('.dropdown-content', this).stop(true, true).slideUp(100);
        }
	);
	$(".dropdown").hover(
        function() { 
			$('.header-dropdown-menu', this).stop(true, true).slideDown(100); 
        },
        function() { 
            $('.header-dropdown-menu', this).stop(true, true).slideUp(100);
        }
    );





});
$(window).resize(function(){

	if ($(window).width() >= 768) {
	    isMobile = false;
	} else {
	    isMobile = true;
	}
	setHeaderEventHandlers();	
	
});
function setPrivacyPolicy(plc)
{
	var send = 'policy='+plc;
	$.ajax({
		type	: 'POST',
		cache	: false,
		async	: true,
		url		: siteUrl + '/setpolicy',
		data	: send,
		success	: function(response) {
			var resp = JSON.parse(response);
			if (resp.status === 'ok')
			{
				var param = "sapf";
				var result = GetURLParameter(param);
				

				setThisCookie('pfUserCookPolicy',resp.keep+':'+plc,400);
				$('.policyOk').show();


 
				if (plc==2 || plc==3 || plc==4){

					if(result){
						setThisCookie(param,result,1);
					}
					var tagManager_new = '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-M7SF9N");</'+'script>'; 
					var tagManager_noscript = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M7SF9N" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
					$('body').prepend(tagManager_noscript);
					$('body').append(tagManager_new);

				}
				
			  



				// if (plc==2) 
				// {
				// 	var analytics='<script async src="https://www.googletagmanager.com/gtag/js?id=UA-36101270-1"></'+'script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\',\'UA-36101270-1\');</'+'script>';
				// 	$('head').append(analytics);
				// }
				// else if (plc==3) 
				// {
				// 	var tagManager = '<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-M7SF9N" height="0" width="0" style="display:none;visibility:hidden"></'+'iframe></'+'noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start": new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-M7SF9N");</'+'script>';
				// 	var analytics='<script async src="https://www.googletagmanager.com/gtag/js?id=UA-36101270-1"></'+'script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\',\'UA-36101270-1\');</'+'script>';
				// 	$('head').append(analytics);
				// 	$('body').append(tagManager);
				// }
				// else if (plc==4)
				// {
				// 	var tagManager = '<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-M7SF9N" height="0" width="0" style="display:none;visibility:hidden"></'+'iframe></'+'noscript><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start": new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-M7SF9N");</'+'script>';
				// 	$('body').append(tagManager);
				// }
				setTimeout(function(){$("#accept_cook").modal('hide');}, 2000);
			}
		}
	});
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
	//console.log(sURLVariables)
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
function rangeSetPolicy()
{
	var selectedCheckBoxes = getCheckBoxValues();
	var option = "";
	if(selectedCheckBoxes.length==1)
	{
		option = 3;
	}
	else if(selectedCheckBoxes.length==2) 
	{
		if(selectedCheckBoxes.indexOf("2")!=-1)
		{
			option = 2;
		}
		else if(selectedCheckBoxes.indexOf("1")!=-1)
		{
			option = 0;
		}
	}
	else if(selectedCheckBoxes.length==3) 
	{
		option = 1;
	}

	setPrivacyPolicy(4-option);
}
function setCookieLevel(checkboxArray)
{

	if(checkboxArray.length==1) // Checkbox 1 is preselected
	{
		CookiePolicyFourthOptOut();
		return CookiePolicyFirstOpt();
	}
	else if(checkboxArray.length==2) 
	{
		if(checkboxArray.indexOf("2")!=-1)
		{
			CookiePolicyFourthOptOut();
			return CookiePolicySecondOpt();
		}
		else if(checkboxArray.indexOf("1")!=-1)
		{
			return CookiePolicyFourthOpt();
		}
	}
	else if(checkboxArray.length==3) 
	{
		CookiePolicyFourthOptOut();
		return CookiePolicyThirdOpt();
	}
	
}
function CookiePolicyFirstOpt(){
	$('.visible3').css('display','block');
	$('.visible2').css('display','none');
	$('.cookBox1,.cookBox2').removeClass('active');
}
function CookiePolicySecondOpt(){
	$('.visible2').css('display','block');
	$('.visible3').css('display','none');
	$('.cookBox1').removeClass('active');
	$('.cookBox2').addClass('active');
}
function CookiePolicyThirdOpt(){
	$('.visible2,.visible3').css('display','none');
	$('.cookBox1,.cookBox2').addClass('active');
}
function CookiePolicyFourthOpt(){
	$('#fourthOption').fadeIn(0);
	$('#hideForOption4').fadeOut(0);
	$('.visible2,.visible3').css('display','none');
}
function CookiePolicyFourthOptOut(){
	$('#fourthOption').fadeOut(0);
	$('#hideForOption4').fadeIn(0);
}
function getCheckBoxValues(){
	var selected = [];
	$('#CookiePoliciesCheckBoxes input[type=checkbox]').each(function() {
		if ($(this).is(":checked")) {
			selected.push($(this).attr('value'));
		}
	});
	return selected;
}
function setHeaderEventHandlers(){
	//-------
	//unbiding events
	
	$('.submenu').each(function(index) {

		let hasOrderPending = $('ul.user_info_submenu ').children('li').length > 8; 
		if (!isMobile){
			if ($(this).attr('h') == undefined){
				if(hasOrderPending) $(this).attr('h', 615);
				else $(this).attr('h', 550);

				$(this).css("opacity", 0);
			}
			$(this).css("top","44px");
		}else{
			if ($(this).attr('h') != undefined){
				$(this).height((this).attr('h'));
			}
			$(this).css("top","0px");
			$(this).css("opacity", 1);
			$('.submenu').slideUp('fast');
		}
		
		$('.submenu').removeAttr('style');
	});

	$('.profile_menu > .hover > .contentHolder').unbind('mouseover mouseout click tap');
	$('.more_pizza_main_menu').unbind('click tap');
	$('.profile_menu > .hover > .submenu').unbind('mouseover mouseout');
	$('.profile_menu > .hover > .contentHolder').unbind('click tap');
	$('.pizza_menu_title').unbind('click tap');
	clearTimeout(menuTimeoutHandler);
	
	
	//----------------------------------------------------------------
    // Only Desktop Version 
    if (!isMobile) {     

	
    	$('.pizza_main_menu').show();
    	
    	if (!favorites){
    		$('.pizza_spec_menu .favorites').hide();
    		$('.pizza_spec_menu li:first-child').hide();
    		$('.pizza_spec_menu li:last-child').hide();
    	}
       
   		$('.profile_menu > .hover > .contentHolder').on('mouseover tap', function(){
   			clearTimeout(menuTimeoutHandler);
   			hideMenu(oldHoveredMenuItem);
			$(this).children('.headerIcon').addClass('hovered');
			$(this).parent('.hover').children('.submenu').show();
			$(this).parent('.hover').children('.submenu').stop().animate({
				height: $(this).parent('.hover').children('.submenu').attr('h'),
				top: 58, //this changes hover distance in header info submenu
				opacity: 1
			},100);
			   oldHoveredMenuItem = $(this);
			   $('.headerIcon img').attr('src', '/assets/site/images/profileLogged.png' );
   			
		   });

   		
   		$('.profile_menu > .hover > .contentHolder, .profile_menu > .hover > .submenu').on('mouseout', function(){      	
   			menuTimeoutHandler = setTimeout(function(){
   				hideMenu(oldHoveredMenuItem);
   				oldHoveredMenuItem = null;
			}, menuTimeout);   			
			$('.headerIcon img').attr('src', '/assets/site/images/profileLogged.png' );	
   		});		
   		
   		$('.profile_menu > .hover > .submenu').on('mouseover', function(){   		
   			clearTimeout(menuTimeoutHandler);	
		   });
		   


		/*
		$('.quick_menu > .hover > .callmeback').on('click tap', function(e){
			e.preventDefault();

			$(this).parent('.hover').children('.submenu').show();


		});
		
		$('.closeCallback').on('click tap', function(){
			$('.newsletter_submenu').fadeOut(300);
		});
		*/
		
        $('.more_pizza_main_menu').on('click tap', function(e) {
            e.preventDefault();
            if ($(this).find('img').hasClass('more')) {
                $('.pizza_main_menu_wrapper').css('overflow', 'inherit');
                $('.pizza_main_menu_wrapper .pizza_main_menu').addClass('opened');
                $(this).find('img').attr({'src': '/assets/site/images/less_pizza.png', 'alt': 'Less'}).addClass('less').removeClass('more');
            } else {
                $('.pizza_main_menu_wrapper').css('overflow', 'hidden');
                $('.pizza_main_menu_wrapper .pizza_main_menu').removeClass('opened');
                $(this).find('img').attr({'src': '/assets/site/images/more_pizza.png', 'alt': 'More'}).addClass('more').removeClass('less');

            }
        });
	}
    //----------------------------------------------------------------
    // Only Mobile Version 
    if (isMobile) { 
    
    	if (!favorites){
    		$('.pizza_spec_menu .favorites').hide();
    	}	
    	
    	//$('.pizza_main_menu').hide();
    
    	$('.pizza_menu_title, .menuSwitch').on('click tap',function(){
    		
    		if ($('.pizza_menu_title').hasClass('collapsed')){
    		
    			$('.pizza_menu_title').removeClass('collapsed');
    			
     			$('.pizza_main_menu').stop().slideDown();
    			
    		} else{
    			$('.pizza_menu_title').addClass('collapsed');
    			
    			$('.pizza_main_menu').stop().slideUp();
    			//$('.pizza_main_menu_wrapper').stop().slideUp().hide();
    		}
    		
    	});
 		
 		 $('.profile_menu > .hover > .contentHolder, .quick_menu > .hover > .callmeback').on('click tap', function() {
 		     $('.submenu').slideUp('fast');
			 if ($(this).siblings('.submenu').hasClass('collapsed')) {
				$('.headerIcon img').attr('src', '/assets/site/images/profileLogged-white.png' );
				 $(this).siblings('.submenu').removeClass('collapsed');
				 $(this).siblings('.submenu').slideUp('fast');
				 
			 }else{
				$('.headerIcon img').attr('src', '/assets/site/images/profileLogged-white.png' );
				 $(this).siblings('.submenu').addClass('collapsed');
				 $(this).siblings('.submenu').slideDown('fast');
				 
			 }
 		 });
    }
}
function hideMenu(menu){

	if (menu!=null){		
		
		menu.children('.headerIcon').removeClass('hovered');	
		menu.parent('.hover').children('.submenu').stop().animate({
			height: 0,
			top: 76, //this changes distance of  top scroll to position of .submenu
			opacity: 0
		}, 100, null, function(){
			$('.headerIcon img').attr('src', '/assets/site/images/profileLogged-white.png' );	
			menu.parent('.hover').children('.submenu').hide();
		}); 
		
	}
}
/*$( window ).scroll(function() {
	if (!isMobile && $(document).scrollTop() > 80 && !stickyVisible){
		stickyVisible = true;
		$('.sticky_header').fadeIn();
	}else if (!isMobile && $(document).scrollTop() <= 80 && stickyVisible) {
		stickyVisible = false;
		$('.sticky_header').fadeOut();
	}

}); */

$( window ).scroll(function() {
	if (!isMobile && $(document).scrollTop() > 120 && !stickyVisible){
		$('#fixed_menu').fadeIn(10);
		stickyVisible = true;
	}else if (!isMobile && $(document).scrollTop() <= 120 && stickyVisible) {
		stickyVisible = false;
		$('#fixed_menu').fadeOut(10);
	}

}); 

/**
 *
 * @param item_id
 * @param isfancy
 */
function showProductDetails(item_id, isfancy){
	var action = "edit";
	if(isfancy == true) action = "editf";
	var url = window.ROOT_URL + "/cart/product/" + item_id+"/"+action;
	var w = $(window).width();
	
	if(w > 970) {
		$.fancybox({
			type: 'iframe',
			href: url,
			autoHeight: true,
			tpl : { 
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close myClose" href="javascript:;">'+ window.CLOSE_TXT +' ✖</a>'
			},
			autoWidth: true,
			closeClick: false,
			'onClose' : function(){
				if(isfancy==true)
					showCartIframe();
			}
		});
	} else {
		var iframecode = '<div class="iframeContainer"><div class="closeIframe" onclick="javascript:closeiframe();">'+ window.CLOSE_TXT +' ✖</div><iframe src="'+url+'" width="100%" height="0" frameborder="0" class="iframeCart"/></div>';
		$(this).parent().parent().parent().append(iframecode);
		$('.iframeCart').load(function () {
			var iHeight = $(this).contents().height()
			$(this).animate({height:iHeight},600);
			$('html, body').animate({
				scrollTop: $(this).offset().top
			}, 50);
		});
	}
}
/**
 *
 * @param temp_id
 * @param item_count
 * @param product_status
 * @param selected
 * @param price_d
 * @param price_t
 * @param showCart
 */
function updatedToCart(temp_id, item_count, product_status, selected, price_d, price_t, showCart, newdesc) {
	if(item_count == undefined || item_count == null) item_count = item_count;
	if(product_status == undefined || product_status == null) product_status=0;
	if(showCart == undefined || showCart == null) showCart = false;

	var requestObj = {
		temp_id: 		temp_id,
		item_count:		item_count,
		product_status: product_status,
		selected:		selected,
		price_d:		price_d,
		price_t:		price_t
	};
	
	if (newdesc!==undefined) requestObj.desc = newdesc;
	
	$.ajax({
		type	: 'POST',
		cache	: false,
		url		: siteUrl + '/cart/updateItem',
		data	: requestObj,
		success	: function(response) {
			var obj = JSON.parse(response);
			if(obj.status == "OK") {
				// $('.items_container').html('<span class="num">'+obj.totalInCart.items+'</span>');
				$('.num').html(obj.totalInCart.items);
				if (showCart) {
					$.fancybox.close();
					fetchCartData();
					// openPanel(true);
					// showCartIframe();
				}else{
					pfnotify('Καλάθι αγορών ενημερώθηκε επιτυχώς!');

				}
			}
		}
	});
}

function topWinScroll()
{
	$("html, body").animate({ scrollTop: 0 }, 300);
}
function getWinWidth()
{
	return $(window).width();
}
/**
 *
 * @param item_id
 * @param isfancy
 */
function editProductDetails(item_id, isfancy){
	var action = "edit";
	if(isfancy == true) action = "editf";
	var url = siteUrl + "/cart/product/" + item_id+"/"+action;
	var w = $(window).width();

	// if(w > 970) {
		$.fancybox({
			type: 'iframe',
			href: url,
			autoHeight: true,
			tpl : {
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close myCloseSmall" href="javascript:;"><img src="/assets/site/images/pf__close.png"></a>'
			},
			autoWidth: true,
			closeClick: false,
			'onClose' : function(){
				if(isfancy==true)
				{
					showCartIframe();
				}
			},
			'afterShow': function(){$(".fancybox-iframe").contents().find("#closeIframe").css('display','none');}
		});
	// } else {
	// 	var iframecode = '<iframe src="'+url+'" width="100%" height="0" frameborder="0" class="iframeCart"/>';
	// 	$('.iframePanel').append(iframecode);
	// 	$('.iframeCart').load(function () {
	// 		var iHeight = $(this).contents().height();
	// 		$(this).css({height:iHeight});
	// 		openPanel();
	// 		$('html, body').animate({
	// 			scrollTop: $(this).offset().top
	// 		}, 50);
	// 	});
	// }
}
/**
 * When mobile, the cart will open in new page otherwise it will open in iframe
 */
function showCartIframe(){
	var w = $(window).width();
	if(w > 960) {
		var url = window.ROOT_URL + "/shoppingcart";
		$.fancybox({
			type: 'iframe',
			href: url,
			autoHeight: true,
			tpl : { 
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close myClose" href="javascript:;">'+ CLOSE_TXT +' ✖</a>'
			},
			width:960,
			closeClick: false,
			openEffect: 'none',
			closeEffect: 'none'
		});
	} else {
		var url = window.ROOT_URL + "/fullcart";
		window.location = url;
	}
}
function addMaterials(url) {
	top.window.location = url;
}
function updateCartIcon(val,price) {
	if (val === 1) var itemsText = 'προϊόν';
	else if (val > 1) var itemsText = 'προϊόντα';
	else if (val == 0) 
	{
		val = '';
		var itemsText = 'Το καλάθι σας είναι άδειο';
	}
	
	$('.items_container').html('<span class="opensanssemibold font13 grey">'+val+' '+itemsText+'</span>');
	$('.items_container.footer_item .num').html(val);
	
	if(price != undefined) {
		if (price > 0) $('.items_container_price').html(price+'€');
		else if (price===0) $('.items_container_price').html('');
		$('.num').html(val);
		$('.price_container').html('<span class="price_num">' + price + '</span> €');
	}
	favicon.badge(val);
}

function moosendVerifyUser(){
	var baseUrl = siteUrl.replace(siteUrl.slice(-2), "");
	$.ajax({
		type	: 'GET',
		url		:  baseUrl + 'moosend_user_verify/',
		success	: function(response) {
			var resp = JSON.parse(response);
			if(resp.status==='OK' && resp.moosend_subsciber){
				setThisCookie('moosubsriber',resp.moosend_subsciber,400);
			}else{
				setThisCookie('moosubsriber','false',400);
			}
			console.log(resp);
		},
		error : function(jqXHR, textStatus, errorThrown) {
			console.log(jqXHR,textStatus)
		}
	})
}
function setThisCookie(cname,value,exdays)
{
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+value+";" + expires;
}

function getCookie(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++)
	{
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}