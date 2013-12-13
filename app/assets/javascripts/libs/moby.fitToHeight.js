$.fn.fitToHeight = function(options) {
	options = $.extend({}, $.fn.fitToHeight.defaults, options);
	
	return this.each(function() {
		var element = $(this);
		var minFontSize = 17;
		
		if (element.html() == '') { return; }
		if (element.attr('data-ajax-loading') == 'true') { return; }
		
		var overflowInit = element.css('overflow');
		var maxScrollHeight = element.height();
		var fontSize =  68;

		// set overflow to auto. This is needed in order to be able to calculate the scrollHeight correctly (if overflow is set to hidden this will not work). We will set the element overflow back to initial value once resize is complete.
		element.css('overflow', 'auto');
		element.css('height', '');

		element.css('font-size', fontSize+'px');
		element.find('*').css('font-size', fontSize+'px');

		var scrollHeightInit = element.get(0).scrollHeight;
		var scrollHeight = scrollHeightInit;

		// change text size to fit vertically within the defined maxScrollHeight
		while (scrollHeight > maxScrollHeight && fontSize >= minFontSize) {
			fontSize -= 2;

			// change font size self and child elements
			element.css('font-size', fontSize+'px');
			element.find('*').css('font-size', fontSize+'px');

			scrollHeight = element.get(0).scrollHeight;
		}	
		
		// change overflow style back to original state
		element.height(maxScrollHeight);
		element.css('overflow', overflowInit);

	})
}