(function($) {
	$.fn.extend( {
		niceModal: function(options) {
			var defaults = {
				overlay_id: "nice-overlay",
				close_button: ".btn_close",
				ajax_source: null
			};

			options =  $.extend(defaults, options);
			
			var $overlay = $("#" + options.overlay_id);
 
			return this.each(function() {
				var o = options;
				
				$(this).on("click modal.open", function(e) {
					e.preventDefault();

					var modalId = $(this).data("modal-id");
					var $modal = $("#" + modalId);

					$overlay.on("click", function() {
						closeModal(modalId);
					});
								
					$modal.find(o.close_button).on("click", function() {
						closeModal(modalId);
					});
													
					var modal_height = $modal.outerHeight();
					var modal_width = $modal.outerWidth();

					$overlay.css({ display: 'block', opacity: 0 });
					$overlay.fadeTo(200, 1.0);

					$modal.css({ display: 'block', opacity: 0 });
					$modal.fadeTo(200, 1.0);

					/*
					'position' : 'fixed',
					'opacity' : 0,
					'z-index': 11000,
					'left' : 50 + '%',
					'margin-left' : -(modal_width/2) + "px",
					'top' : o.top + "px"
					*/
				});
			});

			function closeModal(modalId) {
				$overlay.fadeOut(200);
				$("#" + modalId).css({ display: 'none' });
			}
		}
	});
})(jQuery);