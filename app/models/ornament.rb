class Ornament < ActiveRecord::Base
	attr_accessor :top
	attr_accessor :left
	attr_accessor :row
	attr_accessor :slot

	SHAPES = ["ball", "drop", "whale"]
	MAX_PATTERN = 12
	MAX_STICKER = 12
	SIZE_LARGE = "large"
	SIZE_SMALL = "small"

	def pattern_image_path(size)
		"ornaments/#{shape}/#{size}/#{pattern}.png"
	end

	def sticker_image_path(size)
		"ornaments/#{shape}/#{size}/#{sticker}.png"
	end

	def self.create_random
		Ornament.create(
			shape: SHAPES.sample,
			pattern: "pattern_#{rand(1..MAX_PATTERN)}",
			sticker: "sticker_#{rand(1..MAX_STICKER)}"
			)
	end
end
