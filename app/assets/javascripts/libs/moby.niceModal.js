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

				$(this).on("click modal.open", function(e, remote_source) {
					e.preventDefault();

					var modalId = $(this).data("modal-id");
					var $modal = $("#" + modalId);
					var ajax_source = remote_source || o.ajax_source;

					if (ajax_source) {
						o.ajax_source = ajax_source;
					}

					$modal.on('click', function(e) {
						// stop propigation in case nested in overlay
						e.stopPropagation();
					});

					$overlay.on("click", function(e) {
						e.preventDefault();
						closeModal(modalId);
					});
								
					$modal.find(o.close_button).on("click", function(e) {
						e.preventDefault();
						closeModal(modalId);
					});

					$(this).on('modal.close', function(e) {
						e.preventDefault();
						closeModal(modalId);
					});
													
					var modal_height = $modal.outerHeight();
					var modal_width = $modal.outerWidth();

					$overlay.css({ display: 'block', opacity: 0 });
					$overlay.fadeTo(200, 1.0);

					$modal.css({ display: 'block', opacity: 0 });
					$modal.fadeTo(200, 1.0);

					if (ajax_source) {
						$content = $modal.find('.content');
						$content.empty();

						// loading indicator

						$content.load(o.ajax_source);
					}
				});
			});

			function closeModal(modalId) {
				$overlay.fadeOut(200);
				$("#" + modalId).css({ display: 'none' });
			}
		}
	});
})(jQuery);