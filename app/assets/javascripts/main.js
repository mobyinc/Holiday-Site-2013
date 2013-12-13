// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_directory ./libs
//= require_directory .

$(document).ready(function() {

	$('.fittext').each(function(index, val) {
		$(this).fitToHeight({debug: false});
	});

	var $cta = $('#cta');
	var smallMode = false;

	$(window).resize(updateRatioElements);

	updateRatioElements();

	// listen for media match/unmatch for cta
	enquire.register("screen and (max-width: 59.875em)", {
		match: function() {
			smallMode = true;
			updateRatioElements();
		},
		unmatch: function() {
			smallMode = false;
			updateRatioElements();
		}
	});

	function updateRatioElements(e) {
		$('.ratio').each(adjustRatioWidth);

		// fix cta centering
		var width = $cta.width();
		var margin = smallMode ? -width/2 : 0;
		$cta.css('margin-left', margin + "px");
	}

	function adjustRatioWidth(index, el) {
		var $target = $(el);
		var height = $target.height();
		var ratio = $target.data('ratio');
		var width = height * ratio;

		$target.css('width', width + "px");
	}

});

