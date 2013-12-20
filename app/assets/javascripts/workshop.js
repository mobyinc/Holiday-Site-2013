function Workshop($container) {
	this.$container = $container;
	this.$previous = $container.find('.prev');
	this.$next = $container.find('.next');

	this.$leftShape = $container.find('.shape_left');
	this.$ornament = $container.find('.ornament_detail');
	this.$rightShape = $container.find('.shape_right');

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
	this.$ornament.find('img.pattern').attr('src', this.getPatternUrl());
	this.$ornament.find('img.sticker').attr('src', this.getStickerUrl());
	this.$leftShape.find('img').attr('src', this.getSideShapeUrl(-1));
	this.$rightShape.find('img').attr('src', this.getSideShapeUrl(1));

	this.variations++;  // ╯°□°）╯

	console.log("variations: " + this.variations);
};

Workshop.prototype.getPatternUrl = function() {
	return "/assets/ornaments/" + this.shape + "/large/" + this.pattern + ".png";
};

Workshop.prototype.getStickerUrl = function() {
	if (this.sticker && this.sticker.length > 0) {
		return "/assets/ornaments/" + this.shape + "/large/" + this.sticker + ".png";
	} else {
		return "";
	}
};

Workshop.prototype.getSideShapeUrl = function(delta) {
	var url = "/assets/decorate";
	var index = this.shapeIndex + delta;

	if (index < 0) {
		index = this.shapes.length - 1;
	} else if (index >= this.shapes.length) {
		index = 0;
	}

	url += "/shape_" + this.shapes[index] + ".png";

	return url;
};