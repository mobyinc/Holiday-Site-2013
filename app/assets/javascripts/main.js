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
	snowStorm.flakesMax = 30;
	snowStorm.flakesMaxActive = 30;
	snowStorm.followMouse = false;
	snowStorm.useMeltEffect = false;
	snowStorm.snowStick = false;
	snowStorm.snowColor = '#a1c2d1';
	snowStorm.vMaxX = 5;
	snowStorm.vMaxY = 4;
	snowStorm.excludeMobile = false;

	// ajax setup
	$.ajaxSetup({
		headers: {
			'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
		}
	});

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
	$('#thanks_trigger').niceModal();
	$('.ornament').each(function(index, el) {
		$(this).niceModal({ ajax_source: '/ornaments/' + $(this).data('id') + "/detail"});
	});

	if (window.autoOpenOrnamentId > 0) {
		var $target = $(".ornament[data-id='" + autoOpenOrnamentId + "']");
		setTimeout(function() {
			$target.trigger('modal.open');
		}, 1000);
	}

	if (window.autoOpenWorkshop) {
		var $ctaTarget = $("#cta_decorate");

		setTimeout(function() {
			$ctaTarget.trigger('modal.open');
		}, 1000);
	}

	// workshop
	var workshop = new Workshop($('#ornament_creator'), $('#thanks_trigger'), $('#cta_decorate'), window.invite_id);

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

