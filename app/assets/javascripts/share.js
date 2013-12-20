$(document).ready(function() {
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_UK/all.js', function(){
		FB.init({
			appId: '1402221250021254',
		});
	});

	$('#ornament_thanks').on('click', '.btn_share', function(e) {
		e.preventDefault();

		var link = $(this).data('share-url');
		var variations = 1;
		var name = "";
		var caption = "Created after trying " + variations + " variations";
		var description = "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.";

		if (variations >= 432) {
			name = "I obcessed over this ...";
		} else if (variations > 100) {
			name = "I obcessed over this ...";
		} else if (variations > 50) {
			name = "I obcessed over this ...";
		} else if (variations > 25) {
			name = "I obcessed over this ...";
		} else if (variations > 10) {
			name = "I obcessed over this ...";
		} else if (variations >= 1) {
			name = "I was lazy ...";
		}

		FB.ui({
			method: 'feed',
			link: link,
			name: name,
			caption: caption,
			description: description,
			actions: [{name:'create your own', link:'http://holiday.bymoby.com/create'}]
		}, function(response){});
	});

	$('#ornament_details').on('click', '.btn_share', function(e) {
		e.preventDefault();

		var link = $(this).data('share-url');
		var name = "Some kind of name";
		var caption = "A neat ornament someone made";
		var description = "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.";

		FB.ui({
			method: 'feed',
			link: link,
			name: name,
			caption: caption,
			description: description,
			actions: [{name:'create your own', link:'http://holiday.bymoby.com/create'}]
		}, function(response){});
	});
});