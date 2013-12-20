$(document).ready(function() {
	// build tree animation
	$('.ornament').css({ opacity: 0 });

	setTimeout(function() {
		var $randomizedOrnaments = $('.ornament').sort( function(){ return ( Math.round( Math.random() ) - 0.5 ); } );

		$randomizedOrnaments.each(function(index, el) {
			$target = $(el);
			var delay = index * 50;
			
			animateOrnament($target, delay);
		});
	}, 1000);

	function animateOrnament($ornament, delay) {
		setTimeout(function() {
			$ornament.addClass('fadeInDownBounce');
		}, delay);
	}
});