$(document).ready(function() {
	// reload tree
	$('#btn_reload').on('click', function(e) {
		e.preventDefault();

		window.history.replaceState('Object', 'Happy Holidays!', "/");
		window.location.reload();
	});

	// build tree animation
	$('.ornament').not('#btn_reload').css({ opacity: 0 });

	setTimeout(function() {
		var $randomizedOrnaments = $('.ornament').not('#btn_reload').sort( function(){ return ( Math.round( Math.random() ) - 0.5 ); } );

		$randomizedOrnaments.each(function(index, el) {
			$target = $(el);
			var delay = index * 50;
			
			animateOrnament($target, delay);
		});
	}, 1000);

	if (!App.touch) {
		$('.ornament').hover(function() {
			var $target = $(this);
			$target.removeClass('jiggle');
			setTimeout(function(e) {
				$target.addClass('jiggle');
			},10);
		}, function() {
			
		});
	}

	function animateOrnament($ornament, delay) {
		setTimeout(function() {
			$ornament.addClass('fadeInDownBounce');

			setTimeout(function() {
				$ornament.css({opacity: 1});
				$ornament.removeClass('fadeInDownBounce');
			}, 1000);
			
		}, delay);
	}
});