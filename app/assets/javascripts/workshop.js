function Workshop($container, $thanksTrigger, $modalTrigger, inviteId) {
	this.$container = $container;
	this.$thanksTrigger = $thanksTrigger;
	this.$modalTrigger = $modalTrigger;
	this.$myOrnament = $('#my_ornament');
	this.$inviteName = $('#invite_name');
	this.inviteId = inviteId;

	this.$previous = $container.find('.prev, .shape_left');
	this.$next = $container.find('.next, .shape_right');
	this.$cta = $container.find('.cta');
	this.$saveButton = $container.find('.btn_hang');

	this.$leftShape = $container.find('.shape_left');
	this.$ornament = $container.find('.ornament_detail');
	this.$rightShape = $container.find('.shape_right');

	this.$patternsTab = $container.find('#choose_patterns');
	this.$stickersTab = $container.find('#choose_stickers');
	this.$patternsTabButton = $container.find('#patterns');
	this.$stickersTabButton = $container.find('#stickers');
	this.$activeTab = this.$patternsTab;

	this.shapes = [
		'ball',
		'drop',
		'whale'
	];

	this.patterns = [
		'pattern_1',
		'pattern_2',
		'pattern_3',
		'pattern_4',
		'pattern_5',
		'pattern_6',
		'pattern_7',
		'pattern_8',
		'pattern_9',
		'pattern_10',
		'pattern_11',
		'pattern_12'
	];

	this.stickers = [
		'sticker_1',
		'sticker_2',
		'sticker_3',
		'sticker_4',
		'sticker_5',
		'sticker_6',
		'sticker_7',
		'sticker_8',
		'sticker_9',
		'sticker_10',
		'sticker_11',
		'sticker_12'
	];

	this.smallMode = false;
	this.shapeIndex = 0;
	this.shape = '';
	this.pattern = this.patterns[0];
	this.sticker = 'sticker_none';
	this.variations = 0;

	this.initialize();
}

Workshop.prototype.initialize = function() {
	var self = this;

	this.moveToShape(1);

	this.$previous.on('click', function(e) {
		e.preventDefault();
		self.moveShapes(-1);
	});

	this.$next.on('click', function(e) {
		e.preventDefault();
		self.moveShapes(1);
	});

	this.$container.find('#choose_patterns li').on('click', function(e) {
		e.preventDefault();
		var index = $(this).parent().find('li').index(this);

		self.selectPattern(index);
	});

	this.$container.find('#choose_stickers li').on('click', function(e) {
		e.preventDefault();
		var index = $(this).parent().find('li').index(this);

		self.selectSticker(index);
	});

	this.$saveButton.on('click', function(e) {
		e.preventDefault();

		self.save();
	});

	this.$patternsTabButton.on('click', function(e) {
		e.preventDefault();
		self.toggleActiveTab();
	});

	this.$stickersTabButton.on('click', function(e) {
		e.preventDefault();
		self.toggleActiveTab();
	});

	enquire.register("screen and (max-width: 33em)", {
		match: function() {
			self.switchSizeModeSmall(true);
		},
		unmatch: function() {
			self.switchSizeModeSmall(false);
		}
	});
};

Workshop.prototype.switchSizeModeSmall = function(isSmall) {
	this.smallMode = isSmall;

	if (isSmall) {
		this.setActiveTab(this.$activeTab);
	} else {
		this.$patternsTab.show();
		this.$stickersTab.show();
	}
};

Workshop.prototype.setActiveTab = function($tab) {
	if (!this.smallMode) return;
	
	var $otherTab = $tab.attr('id') == this.$patternsTab.attr('id') ? this.$stickersTab : this.$patternsTab;
	$tab.show();
	$otherTab.hide();

	this.$activeTab = $tab;
};

Workshop.prototype.toggleActiveTab = function() {
	if (!this.smallMode) return;

	var $newActiveTab = this.$activeTab.attr('id') == this.$patternsTab.attr('id') ? this.$stickersTab : this.$patternsTab;
	this.setActiveTab($newActiveTab);
};

Workshop.prototype.selectPattern = function(index) {
	this.pattern = this.patterns[index];

	this.$container.find('#choose_patterns a').removeClass('on');
	this.$container.find('#choose_patterns li').eq(index).find('a').addClass('on');

	this.updatePreview();
};

Workshop.prototype.selectSticker = function(index) {
	var $button = this.$container.find('#choose_stickers li').eq(index).find('a');

	if ($button.hasClass('on')) {
		this.$container.find('#choose_stickers a').removeClass('on');
		this.sticker = 'sticker_none';
	} else {
		this.$container.find('#choose_stickers a').removeClass('on');
		$button.addClass('on');
		this.sticker = this.stickers[index];
	}

	this.updatePreview();
};

Workshop.prototype.moveShapes = function(delta) {
	var newIndex = this.shapeIndex += delta;

	if (newIndex < 0) {
		newIndex = this.shapes.length - 1;
	} else if (newIndex >= this.shapes.length) {
		newIndex = 0;
	}

	this.moveToShape(newIndex);
};

Workshop.prototype.moveToShape = function(index) {
	index = Math.min(index, this.shapes.length-1);
	index = Math.max(index, 0);

	this.shapeIndex = index;
	this.shape = this.shapes[this.shapeIndex];

	this.updatePreview();
};

Workshop.prototype.updatePreview = function() {
	this.$myOrnament.hide();

	this.$ornament.find('img.pattern').attr('src', this.getPatternUrl());
	this.$ornament.find('img.sticker').attr('src', this.getStickerUrl());
	this.$leftShape.find('img').attr('src', this.getSideShapeUrl(-1));
	this.$rightShape.find('img').attr('src', this.getSideShapeUrl(1));

	this.variations++;  // ╯°o°）╯

	console.log("variations: " + this.variations);
};

Workshop.prototype.getPatternUrl = function(size) {
	size = size || 'large';

	return "/ornaments/" + this.shape + "/" + size + "/" + this.pattern + ".png";
};

Workshop.prototype.getStickerUrl = function(size) {
	size = size || 'large';

	if (this.sticker && this.sticker.length > 0) {
		return "/ornaments/" + this.shape + "/" + size + "/" + this.sticker + ".png";
	} else {
		return "";
	}
};

Workshop.prototype.getSideShapeUrl = function(delta) {
	var url = "/decorate";
	var index = this.shapeIndex + delta;

	if (index < 0) {
		index = this.shapes.length - 1;
	} else if (index >= this.shapes.length) {
		index = 0;
	}

	url += "/shape_" + this.shapes[index] + ".png";

	return url;
};

Workshop.prototype.setLoading = function(isLoading) {
	if (isLoading) {
		this.$cta.spin('button');
		this.$saveButton.addClass('empty');
	} else {
		this.$cta.spin(false);
		this.$saveButton.removeClass('empty');
	}
};

Workshop.prototype.close = function() {
	this.setLoading(false);
	this.$modalTrigger.trigger('modal.close');
};

Workshop.prototype.save = function() {
	var self = this;

	this.setLoading(true);

	$.ajax({
		url: '/ornaments',
		type: 'POST',
		data: {
			ornament: {
				invite_id: self.inviteId,
				shape: self.shape,
				pattern: self.pattern,
				sticker: self.sticker,
				variations: self.variations
			}
		},
		success: function(response) {
			self.close();

			var ornamentId = response.ornament_id;

			if (ornamentId && ornamentId > 0) {
				self.playHangOrnament(ornamentId);
			} else {
				alert("Oops, something went wrong.");
			}
		},
		error: function(response) {
			self.close();
			alert("Oops, something went wrong.");
		}
	});
};

Workshop.prototype.playHangOrnament = function(ornamentId) {
	var self = this;
	var newUrl = '/ornaments/' + ornamentId;

	window.scrollTo(0, 0);

	this.$myOrnament.find('.pattern').attr('src', this.getPatternUrl('small'));
	this.$myOrnament.find('.sticker').attr('src', this.getStickerUrl('small'));

	this.$inviteName.fadeOut(0.25);
	this.$myOrnament.addClass('jiggle');
	this.$myOrnament.show();

	setTimeout(function() {
		window.history.replaceState('Object', 'Happy Holidays!', newUrl);
		self.$thanksTrigger.trigger('modal.open', newUrl + "/thanks_detail");
	}, 2000);
};



