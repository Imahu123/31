var currentlyAdding = false;
var masterID = "";

var lang = getCookie('lang');

// console.log('menu.js LANG=', lang )
 

$(document).ready(function() { 

    $('#accordion .panel-collapse.in').prev().addClass('active');
    // $('#accordio div.active .accordion-toggle').find('img').attr({'src': '/assets/site/images/active_more_details.png'});
	
    $('#accordion').on('show.bs.collapse',  function(e) {

        $('#accordion .panel-heading.active .accordion-toggle').find('img').attr('src', '/assets/site/images/more_details.png');
        $('#accordion .panel-heading.active').removeClass('active');
        $(e.target).prev().addClass('active');
        // $(e.target).prev().find('img').attr({'src': '/assets/site/images/active_more_details.png'});
    });
		
    $('.addToCartInc .numbers-row .dec').on('click tap',  function(e) {
        e.preventDefault();
		var curValue 		= parseInt($(this).siblings('#num-hens').val());
		var curPrice 		= $('#add_cart_price').attr('data-price');
		var curItemPrice 	= parseFloat($(this).parent().data('price'));
		var curPriceTake 	= $('#add_cart_price_take').attr('data-price-take');
		
		if(curValue>1) {
			var new_value = curValue - 1;
		} else {
			var new_value = 1;
		}
		
		var newPrice = (new_value*curPrice);
		var newItemPrice = (new_value*curItemPrice);
		var newPriceTake = (new_value*curPriceTake);
		
		
		$('#add_cart_price SPAN').html(newPrice.toFixed(2));
		$('#add_cart_price_take SPAN').html(newPriceTake.toFixed(2));
        $(this).siblings('#num-hens').val(new_value);
        $(this).parent().parent().parent().parent().find('.price SPAN').html(newItemPrice.toFixed(2));
	
    });

    $('.addToCartInc .numbers-row .inc').on('click tap',  function(e) {
        e.preventDefault();
        var new_value = parseInt($(this).siblings('#num-hens').val()) + 1;
		var curPrice 		= $('#add_cart_price').attr('data-price');
		var curPriceTake 	= $('#add_cart_price_take').attr('data-price-take');
		var curItemPrice 	= parseFloat($(this).parent().data('price'));
		
		var newPrice = (new_value*curPrice);
		var newItemPrice = (new_value*curItemPrice);
		var newPriceTake = (new_value*curPriceTake);
		
		$('#add_cart_price SPAN').html(newPrice.toFixed(2));
		$('#add_cart_price_take SPAN').html(newPriceTake.toFixed(2));
        $(this).siblings('#num-hens').val(new_value);
		$(this).parent().parent().parent().parent().find('.price SPAN').html(newItemPrice.toFixed(2));
	
    });	
		
    $('.pizza_size li').on('click tap', function(e) {
        e.preventDefault();
        
		$(this).siblings().removeClass('active');
        $(this).addClass('active');
		toggleDough();
    });
    
	
	$('.size-panel .pizza_size_small .pf__product-box-pieces-tag').on('click tap', function(e) {
		e.preventDefault();
		$(this).siblings().removeClass('active');
		$(this).siblings().addClass('deactive');
		$(this).removeClass('deactive');
		$(this).addClass('active');   
		// toggleDough();
		
		$('.size-panel .piece').text($(this).find('.num').text() + ' '+$(this).find('.name').text()+ ' - '+$(this).find('.type').text()); 
    });
	
    $('.ingredient .builder a.btn').on('click tap', function(e) {
        e.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).toggleClass('active');
    });

    $('.remove').on('click tap', function(e) {
        e.preventDefault();
        $(this).parent('div').fadeOut(300, function() {
            $(this).remove();
        });
    });
    $('.double').on('click tap', function(e) {
        e.preventDefault();
		if(!$(this).hasClass('inactive')) {
			$(this).toggleClass('deactivate');
			$(this).toggleClass('activate');
		}
    });
    customRadio("pizza_type");

	// on custom pizza dough select click
	$('.dsc-panel input.dough').each(function(){	
		$(this).on('click tap', function() {			
			currentDough = $(this).parent().find('.checkbox_title').text(); 
			$('.pf__custom-pizza-description').text(combineDSCtext());	 		
		});		
	});
	
	// on custom pizza sauce select click
	$('.dsc-panel input.sauce').each(function(){	
		$(this).on('click tap', function() {			
			currentSauce = $(this).parent().find('.checkbox_title').text();  
			$('.pf__custom-pizza-description').text(combineDSCtext());					
		});		
	});	
	
	// on custom pizza cheese select click
	$('.dsc-panel input.cheese').each(function(){	
		$(this).on('click tap', function() {			
			currentCheese = $(this).parent().find('.checkbox_title').text(); 
			$('.pf__custom-pizza-description').text(combineDSCtext());					
		});		
	});

	/**
	 * Sticky menu functionality
	 */

	$("#sticky_left_arrow, #sticky_right_arrow").on('click tap', function (e) {
		e.preventDefault();
		var dir = this.id == "sticky_right_arrow" ? "+=" : "-=";
		$(".product_categories_container").stop().animate({scrollLeft: dir + "800"}, 400, handleAnimation(this.id));
	});
	
	// ALL pasta kind material IDs.
	//var pastaType = [ 95, 98, 680, 681, 698  ]; 
	if(typeof pastaMaterialIds != "undefined"){
		pastaMaterialIds.forEach( (material_ID)=> {
			$("#topping_"+material_ID).find('#single span').css('pointer-events', 'none'); 
			$("#topping_"+material_ID).on('click tap',function (e){ 
				let previousSelectedPasta = $('#pastaTypeChoices [id^="topping_"].hasTopping').find( ".pf__single" ).data('id');
				var newPastaList = [];
				var newPastaList = pastaMaterialIds.filter(function(value, index, arr){
					return value != material_ID;
				}); 
				console.log('newPastaList', newPastaList)
				newPastaList.forEach( function( item ){  
					removeTopping(item); 
				})
				
				if(typeof previousSelectedPasta === 'undefined' ){
				   console.log('to do select topping')
				   let materialForSelection = $("#topping_"+material_ID).find('.materialSwitcher a.btn');
				   selectTopping(
					   materialForSelection.attr("data-side"),
					   materialForSelection.attr("data-material-id"),
					   materialForSelection.attr("data-material-layer-id"),
					   1
				   );
				   $("#topping_"+material_ID).find('#single').addClass('activate');
				}
			   
			})
		} )
	}

	// $("#topping_95,#topping_98,#topping_680, #topping_681, #topping_698").find('#single span').css('pointer-events', 'none'); 

	// $("#topping_95,#topping_98,#topping_680, #topping_681, #topping_698").on('click tap',function (e){ 
		
	// 	var selectedPastaId = parseInt(e.target.dataset.id);  

	// 	var newPastaList = [];

	// 	var newPastaList = pastaType.filter(function(value, index, arr){
	// 		return value != selectedPastaId;
	// 	}); 

	// 	newPastaList.forEach( function( item ){  
	// 		removeTopping(item); 
  	// 	})

	// });




	
});
function handleAnimation(id) {
	$("#sticky_left_arrow, #sticky_right_arrow").toggleClass('hidden');
}
function combineDSCtext(){  
	if (currentDough != "") { 
		if (currentSauce == "") { var doughComma = "" }else{ var doughComma = ", "; }
		if (currentCheese == "") { var sauceComma = "" }else{ var sauceComma = ", "; }
		return currentDough +doughComma+ currentSauce + sauceComma + currentCheese;
	}else{ 
		return '<p class="text-danger left">'+chooseDoughText+',&nbsp;</p>'+ currentSauce + ', ' + currentCheese;
	}
}
/**
 * The available doughs are toggling
 * @param target
 */
function toggleDough(target){
	if((target !=undefined && !target.hasClass('inactive')) || target ==undefined) {
		var list;
		var pieces = parseInt($('.pieces.active').data('pieces')); 
		switch (pieces) {
			case 4:
				list = p4;
				break;
			case 6:
				list = p6;
				break;
			case 8:
				list = p8;
				break;
			case 10:
				list = p10;
				break;
			case 12:
				list = p12;
				break;
			case 24:
				list = p24;
				break;
		}

		var tempDough_id = $('input[name=dough_type]:checked').val();
		var found = $.inArray(Number(tempDough_id), list);

		//Disable all radio options
		$('INPUT[name=dough_type]').attr('disabled', false);
		$('INPUT[name=dough_type]').attr('checked', false);
		$('.dough').addClass('disable');
		$('#doughs .dough_label').addClass('inactive');
		
		$.each(list, function (i, val) {

			$("label[for='dough_" + val + "']").removeClass('inactive');
			$('#dough_' + val).removeClass('disable');
			$('#dough_' + val).attr('disabled', false);

			var msg = "Το συγκεκριμένο μέγεθος πίτσας δεν διατίθεται με τη ζύμη που επιλέξατε. Παρακαλώ επιλέξτε μια απο τις διαθέσιμες ζύμες.";
			$('.doughslist').popover({
				"animation":"true",
				"delay":100,
				"placement":"right",
				"trigger": "hover focus",
				"html":"true",
				"container":".modal_pizza_product",
				"content": msg
			});

			if (Number(found) >= 0) {
				$('.doughslist').popover('destroy');
			} else {

				$('.doughslist').popover('show');
			}

			//Select the selected
			if (parseInt(tempDough_id) == parseInt(val)) {
				$('#dough_' + val).prop("checked", true);
			}

		});
		$('.noInactive').removeClass('inactive');
		updatePrice();
	}
}
function customRadio(radioName) {
    var radioButton = $('input[name="' + radioName + '"]');
    $(radioButton).each(function() {
        $(this).wrap("<span class='custom-radio'></span>");
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });
    $(radioButton).click(function() {
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
        $(radioButton).not(this).each(function() {
            $(this).parent().removeClass("selected");
        });
    });
}
/**
 * Using the function to add slave items to session
 * Slave items are the items belonging to an offer/coupon (the first of it is the master item)
 * @param addToCartData
 */
function addSlaves(addToCartData){
	// console.log(addToCartData)
	addToCartData.master_id = masterID; 
	// console.log('addToCartData.master_id ', addToCartData.master_id = masterID)
	if (window.location.href.indexOf('fullcart') != -1 || window.location.href.indexOf('menu/product')!= -1) {  
		addToCartData.callback = function (){location.reload()};
	}else{ 
	} 
	addToCart(addToCartData);
}
/**
 * Given the Object as input, the function adds item to session
 * @param addToCartData
 * @returns {boolean}
 */
function addToCart(addToCartData) {

	if(addToCartData.product_id != undefined || addToCartData.product_id != false){
		var product_id = addToCartData.product_id;
	}
	if(addToCartData.product_count !== undefined && addToCartData.product_count !== false){	
		if(addToCartData.product_count>0) var product_count = addToCartData.product_count;
		else return;
	}
	var product_status = "0";
	if(addToCartData.product_status != undefined || addToCartData.product_status != false){
		product_status = addToCartData.product_status;
	}
	if(addToCartData.button != undefined || addToCartData.button != false){
		var button = addToCartData.button;
	}
	if(addToCartData.product_materials != undefined || addToCartData.product_materials != false){
		var product_materials = addToCartData.product_materials;
	}
	if(addToCartData.delivery_price != undefined || addToCartData.delivery_price != false){
		var delivery_price = addToCartData.delivery_price;
	}
	if(addToCartData.takeaway_price != undefined || addToCartData.takeaway_price != false){
		var takeaway_price = addToCartData.takeaway_price;
	}
	if(addToCartData.product_name != undefined || addToCartData.product_name != false){
		var product_name = addToCartData.product_name;
	}
	if(addToCartData.product_image != undefined || addToCartData.product_image != false){
		var product_image = addToCartData.product_image;
	}
	if(addToCartData.animation_target != undefined || addToCartData.animation_target != false){
		var animation_target = addToCartData.animation_target;
	}
	if(addToCartData.callback != undefined || addToCartData.callback != false){
		var callback = addToCartData.callback;
	}
	if(addToCartData.animate != undefined || addToCartData.animate != false){
		var animate = addToCartData.animate;
	}
	if(addToCartData.coupon != undefined || addToCartData.coupon != false){
		var coupon = addToCartData.coupon;
	}
	if(addToCartData.uq_code != undefined || addToCartData.uq_code != false){
		var uq_code = addToCartData.uq_code;
	}
	if(addToCartData.size_id != undefined || addToCartData.size_id != false){
		var size_id = addToCartData.size_id;
	}
	if(addToCartData.gift != undefined || addToCartData.gift != false){
		var gift = addToCartData.gift;
	}
	if(addToCartData.slaves != undefined || addToCartData.slaves != false){
		var slaves = addToCartData.slaves;
	}
	if(addToCartData.master_id != undefined || addToCartData.master_id != false){
		var master_id = addToCartData.master_id;
	}
	if(addToCartData.crm_policy != undefined || addToCartData.crm_policy != false){
		var crm_policy = addToCartData.crm_policy;
	}
	if(addToCartData.is_offering != undefined || addToCartData.is_offering != false){
		var is_offering = addToCartData.is_offering;
	}
	if(addToCartData.material != undefined || addToCartData.material != false){
		var coupon_materials = addToCartData.material;
	}
	var role = 'master';
	if(addToCartData.role != undefined || addToCartData.role != false){
		role = addToCartData.role;
	}

	if(addToCartData.smartbox_id != undefined){ 
		var smartbox_id = addToCartData.smartbox_id;
	}

	if(addToCartData.smartbox_title != undefined){ 
		var smartbox_title = addToCartData.smartbox_title;
	}
	if(addToCartData.is_recommended != undefined){ 
		var is_recommended = addToCartData.is_recommended;
	}


	currentlyAdding = true;
	var animateObject = true;
	if(animate == false) animateObject = false;
	if(animateObject==true) {
		if (animation_target == undefined || animation_target == null) {
			animation_target = $('#item_img_'+product_id);
		}
	}

	if(product_count == undefined || product_count == null) product_count = 1;
	if(product_status == undefined || product_status == null) product_status = 0;

	var productAddToCartNew = $('#productAddToCartBtn');
	if(button != undefined){

		if(lang==='el')
		{
			var addedText = 'Προστέθηκε';
	 
		}else{
			var addedText = 'Added';
 
		}
		var buttonHtml = '';
		buttonHtml = button.html(); 
		// button.addClass('disabled');
		button.addClass('has-spinner');
		if(button == productAddToCartNew){
			button.addClass('active')
			button.html('<img class="pf__add-to-cart-hover-img mr-3" src="/assets/site/images/add_to_cart_success.png" alt="Add to cart success" title="Add to cart pizza">'+addedText)
		} else { 
			button.html('<span class="spinner" style="display:block;"><i class="fa fa-refresh fa-spin"></i></span>');
		} 
	}

	var typeToCategory = {
		'1':'Starters',
		'2':'Salads',
		'3':'Pizzas',
		'4':'Calzone',
		'7':'Extras',
		'8':'Extras',
		'9':'Pasta',
		'11':'Junior',
		'12':'Drinks',
		'13':'Drinks',
		'15':'Extras',
		'17':'Sandwiches',
		'20':'Desserts',
		'22':'Desserts',
		'23':'Sandwiches',
		'25':'Pizzas',
		'26':'Extras',
		'27':'Pizzas',
		'32':'Vegan',
		'34':'Sandwiches',
		'35':'Pizzas',
		'37':'Drinks',
		'38':'Sandwiches',
		'39':'Pasta',
		'40':'Salads',
		'41':'Lunchoffers',
		'42':'Smartbox',
		'55':'Invisible',
		'56':'Smartbox',
		'57':'Smartbox',
		'58':'Smartbox',
		'59':'Pizzas',
		'61':'Burgers',
		'62':'Drinks'
	};

	var requestData = {
		product_id			: product_id,
		product_count		: product_count,
		product_status		: product_status,
		product_materials	: product_materials,
		delivery_price		: delivery_price,
		takeaway_price		: takeaway_price,
		product_image		: product_image,
		product_name		: product_name,
		smartbox_id 		: smartbox_id,
		smartbox_title		: smartbox_title
	};

	if(coupon != undefined) {
		requestData.product_coupon = coupon;
	}
	if(uq_code != undefined) {
		requestData.uq_code = uq_code;
	}
	if(gift != undefined) {
		requestData.product_gift = gift;
	}
	if(role != undefined) {
		requestData.product_role = role;
	}
	if(slaves != undefined) {
		requestData.slaves = slaves;
	}
	if(master_id != undefined) {
		requestData.master_id = master_id;
	}
	if(crm_policy != undefined) {
		requestData.crm_policy = crm_policy;
	}
	if(is_offering != undefined) {
		requestData.is_offering = is_offering;
	}
	if(size_id != undefined) {
		requestData.size_id = size_id;
	}
	if(coupon_materials != undefined) {
		requestData.product_materials = coupon_materials;
	}
	if(smartbox_id != undefined) {
		requestData.smartbox_id = smartbox_id;
	}
	if(smartbox_title != undefined) {
		requestData.smartbox_title = smartbox_title;
	}

	if(is_recommended != undefined) {
		requestData.is_recommended = is_recommended;
	}
	
	function addtodatalayer(product_name,event,product_id,category ,value, slug)
	{
 
		// define dataLayer
		var dataLayer = window.dataLayer = window.dataLayer || [];
		dataLayer.push({
			'event': event,
			'product_id': product_id,
			'category': category,
			'product_value': value.toFixed(2),
			'ecommerce': {
				'items': [{
				'item_name': product_name,
				'item_id': product_id,
				'price': value.toFixed(2),
				'item_category': category,
				'quantity': '1'
				}]
			}
		});
		let product_url =  siteUrl+'/menu/product/'+ slug + '-8';
		let product_image = 'https://images.pizzafan.gr/mobile/products/'+product_id+'.png';
		//console.log('moon OBJECT', `${product_id}, ${value.toFixed(2)}, ${product_url} , ${product_name}, ${product_image}`)
		mootrack('trackAddToOrder', product_id, value.toFixed(2), product_url ,1, value.toFixed(2),product_name,product_image);
	}
 
	// console.log('requestData', requestData);

	$('.pf__add-to-cart[data-id != "'+ requestData.product_id +'"]').addClass('inactive');
	let buttonAddToCart = $('.pf__add-to-cart[data-id="'+ requestData.product_id +'"]');
	buttonAddToCart.addClass('active')
	buttonAddToCart.html('<img class="pf__add-to-cart-hover-img mr-3" src="/assets/site/images/add_to_cart_success.png" alt="Add to cart success" title="Add to cart pizza">'+addedText)
	// $('.pf__add-to-cart-success').removeClass('d-none').fadeIn(500);

	$.ajax({
		type	: 'POST',
		cache	: false,
		async	: true,
		url		: siteUrl + '/cart/add',
		data	: requestData,
		success	: function(response) {

			// console.log('response', response)
			var responseObject = JSON.parse(response);
			if(responseObject.status == "OK") { 
				if(delivery_price==undefined){
					delivery_price=$('#item_'+product_id+' .delivery').text();
				
					// Recommended List products
					if(delivery_price==""){
						setTimeout(function() {
							delivery_price = $('[data-id='+product_id+'] .price .font18').eq(0).text()
						}, 2000);
					}
				}
				if(page=="favorites")
				{
					category=typeToCategory[addToCartData.product_materials.type_id]
				}

				if(category==undefined){
					category="Offers";
				}
				
				if(role=="slave")
				{	
					for (let i = 0, l = slaves.length; i < l; i++ ) {
						addtodatalayer(product_name, 'add_to_cart',slaves[i].product_id,category,parseFloat(slaves[i].delivery_price),responseObject.product_slug );
			
					}

				}else{
					if(delivery_price==''){
						setTimeout(function(){
							addtodatalayer(product_name, 'add_to_cart',product_id,category,parseFloat(delivery_price),responseObject.product_slug); 
						
						},2000)
					}
					else{
						addtodatalayer(product_name, 'add_to_cart',product_id,category,parseFloat(delivery_price),responseObject.product_slug);
		
					}
					
				}
				
				masterID = responseObject.temp_id;
				var cart = null;
				if(animateObject==true) {
					if (!isMobile) {
						cart = $('.card');
						if ($(document).scrollTop() > 80) cart = $('.card.stickyCart');
					} else {
						cart = $('#shoppingMobile');
					}
				}
		
				if (animation_target != undefined && animation_target != "" && animation_target.offset() != undefined && (cart.offset() != undefined || cart.offset() != null)) {
					
					if(animateObject==true) {
						var productClone = animation_target.clone();
						productClone.children('.toppings_layer').remove();
						productClone
							.offset({
								top: animation_target.offset().top,
								left: animation_target.offset().left
							})
							.css({
								'opacity': '0.9',
								'position': 'absolute',
								'width': '150px',
								'z-index': '9999',
								'background': 'none'
							})
							.appendTo($('body'))
							.animate({
								'top' : cart.offset().top,
								'left': cart.offset().left + 30,
								'width': 150,
							}, 1000, 'easeInOutExpo');

						productClone.animate({
							'width': 0,
							'height': 0
						}, function () {

							if (button != undefined) {
								if(button = productAddToCartNew){   
									button.remove(); 
								}
								button.removeClass('disabled');
								button.removeClass('has-spinner');
								button.html(buttonHtml); 
							}

							window.updateCartIcon(responseObject.totalInCart,responseObject.totalPrice);

							if ($.fancybox.isOpen) {
								$.fancybox.close();
							}

			
							if (callback != undefined || callback != null) { 
								callback(true);
							}

							productClone.remove();
						});
					} else {
						if (button != undefined) {
							if(button = productAddToCartNew){   
								button.remove(); 
							}
							button.removeClass('disabled');
							button.removeClass('has-spinner');
							button.html(buttonHtml); 
						}

						window.updateCartIcon(responseObject.totalInCart,responseObject.totalPrice);

						if ($.fancybox.isOpen) {
							$.fancybox.close();
						}
			 
						if (callback != undefined || callback != null) {
							callback(true);
						}
						currentlyAdding = false;
						return true;
					}
					
				}else{
			
					if(button != undefined){
						if(button = productAddToCartNew){   
							button.remove(); 
						}
						button.removeClass('disabled');
						button.removeClass('has-spinner');
						button.html(buttonHtml); 
					}

					window.updateCartIcon(responseObject.totalInCart,responseObject.totalPrice);

					if ($.fancybox.isOpen) {
						$.fancybox.close();
					}
				 
					if (callback != undefined || callback != null) {
						callback(true);
					}
				} 
				currentlyAdding = false;
	 
				return true;
			} else {
				currentlyAdding = false;
				return false;
			}
			
			
		},
		error: function(err){
			console.log(err)
		},
		complete: function(){
			$('.pf__add-to-cart').removeClass('inactive');
			buttonAddToCart.removeClass('active inactive');
			buttonAddToCart.html('<img class="pf__add-to-cart-img mr-2" src="/assets/site/images/shopping_cart_hover@2x.png" alt="Add to cart pizza" title="Add to cart pizza">'+ changeLangWordings('Add to cart', 'Στο καλάθι'))


		}
		// timeout: 10000,  
	});
	currentlyAdding = false;
	return false;
}
/**
 *
 * @param product_id
 * @param target
 * @param custom
 * @param custom_title
 * @param origin
 * @param currentMaterials
 * @param imageFileName
 */
function addToFavorites(product_id, target, custom, custom_title, origin, currentMaterials, imageFileName){
	
	var data;
	if(origin == undefined || origin == ""){
		data = {product_id:product_id, custom:custom, custom_title:custom_title};
	} else if(origin =='history'){
		if(currentMaterials != undefined && currentMaterials != ""){
			data = {product_id:product_id, custom:custom, origin:origin, custom_title:custom_title, materials:currentMaterials};
		} else {
			data = {product_id:product_id, custom:custom, origin:origin, custom_title:custom_title};
		}

	} else if(origin == 'custom_pizza'){
		data = {product_id:product_id, custom:custom, origin:origin, materials:currentMaterials, custom_title:custom_title, imageFileName:imageFileName};
	}

	$.ajax({
		type	: 'POST',
		cache	: false,
		url		: URLfavorites,
		data	: data,
		success	: function (response) {
			var obj = JSON.parse(response);
			if(obj.status == 'OK'){
				target.removeClass('favoriteStarBtn');
				target.unbind();
				target.addClass('favorited');
				target.addClass('disabled');
			}
		}
	});
}

function addToFavoritesCustomized(data,custom_title,target){
	
	var custom = JSON.parse(data);
	var favouriteData = {
		product_id:custom.product_id,
		materials:custom.materials,
		price:"",
		quantity:1,
		size_id:custom.size_id,
		type_id:custom.type_id
	}
	data = {product_node:JSON.stringify(favouriteData),custom_name:custom_title};

	$.ajax({
		type	: 'POST',
		cache	: false,
		url		: URLfavoritesCustom,
		data	: data,
		success	: function (response) {
			var obj = JSON.parse(response);
			if(obj.status == 'OK'){
				
				$('.pf__hero-col').append('<p class="text-danger added-successfully">Προστέθηκε στα αγαπημένα επιτυχώς!</p>')
				setTimeout(function(){
					$('.added-successfully').fadeOut('slow');
				},1000);
				target.animate({
					'width': '40px'
				  }, 500, function() {
					target.animate({
						'width': '36px'
					 });
					target.removeClass('favoriteStarBtn2');
					target.unbind();
					target.attr('src','/assets/site/images/pf__favored.png')
					target.addClass('favorited');
					target.addClass('disabled');
					target.css("cursor", "not-allowed")
				  }); 
			}
		}
	});
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                    c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
            }
    }
    return "";
}

// enables tooltips from bootstrap - tasos STARTS
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
}); 

// enables tooltips from bootstrap - tasos ENDS