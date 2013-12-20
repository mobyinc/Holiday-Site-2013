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
	// snow settings
	snowStorm.autoStart = false;
	snowStorm.targetElement = 'wrapper';
	snowStorm.flakesMax = 1;
	snowStorm.flakesMaxActive = 1;
	snowStorm.followMouse = false;
	snowStorm.useMeltEffect = false;
	snowStorm.snowStick = false;
	snowStorm.snowColor = '#a1c2d1';
	snowStorm.vMaxX = 8;
	snowStorm.vMaxY = 5;
	snowStorm.excludeMobile = false;

	// fit text
	$('.fittextHeight').each(function(index, val) {
		$(this).fitToHeight({debug: false});
	});
	
	$(".fittext").fitText(0.5, { minFontSize: '16px', maxFontSize: '35px' });

	// CTA tag
	var $cta = $('#cta');
	var smallMode = false;

	// modals
	$('#cta_decorate').niceModal();
	$('.ornament').each(function(index, el) {
		$(this).niceModal({ ajax_source: 'ornament_detail/' + $(this).data('id') });
	});

	// ratio scaling elements
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

