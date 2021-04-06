(function($) {
  "use strict";
  
  $(document).ready(function(){
		
		$('input, textarea').placeholder();
		
        var swch = 1;
		setInterval(function(){
			if(swch) $('.light').fadeOut();
			else $('.light').fadeIn();
            swch = !swch;
		},2000);
		
	});
  
})(jQuery);