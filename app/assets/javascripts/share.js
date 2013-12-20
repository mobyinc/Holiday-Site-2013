$(document).ready(function() {
	$.ajaxSetup({ cache: true });
	$.getScript('//connect.facebook.net/en_UK/all.js', function(){
		FB.init({
			appId: '1402221250021254',
		});
	});

	$('.btn_share').on('click', function(e) {
		e.preventDefault();
		
		FB.ui({
			method: 'feed',
			link: 'https://google.com',
			caption: 'An example caption',
		}, function(response){});
	});
});