$(document).ready(function() {
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_UK/all.js', function(){
		FB.init({
			appId: '1402221250021254',
		});
	});

	$('#ornament_details').on('click', '.btn_share', function(e) {
		e.preventDefault();

		var link = $(this).data('share-url');
		
		FB.ui({
			method: 'feed',
			link: link,
			name: 'Cool Name',
			caption: 'An example caption',
			description: 'The description',
			actions: [{name:'create your own', link:'http://holiday.bymoby.com'}]
		}, function(response){});
	});
});