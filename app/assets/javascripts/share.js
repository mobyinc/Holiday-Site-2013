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
		var variations = $(this).data('variations');
		var name = "";
		var caption = "Created after trying " + variations + " variations";
		var description = "The holiday season is finally here; wrapping up an amazing year. We'd like to share our joy with you, and thank you for all it is you do. So take a minute to celebrate with a holiday tree to decorate!";

		if (variations >= 400) {
			name = "I won at life by obsessivly decorating this ornament.";
		} else if (variations > 200) {
			name = "Check out the absolutely perfect ornament I decorated!";
		} else if (variations > 100) {
			name = "I really like this ornament I made. Took a while to decide, but turned out great!";
		} else if (variations > 50) {
			name = "Check out the fun ornament I made!";
		} else if (variations > 25) {
			name = "I made a cool ornament - Check it out.";
		} else if (variations >= 1) {
			name = "I clicked on a button and then shared my ornament to Facebook. Yay.";
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
		var name = "Check out this neat ornament!";
		var caption = "Have yourself a merry little minute.";
		var description = "The holiday season is finally here; wrapping up an amazing year. We'd like to share our joy with you, and thank you for all it is you do. So take a minute to celebrate with a holiday tree to decorate!";

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