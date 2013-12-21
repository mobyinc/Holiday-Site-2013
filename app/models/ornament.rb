class Ornament < ActiveRecord::Base
	require "rmagick"

	attr_accessor :top
	attr_accessor :left
	attr_accessor :row
	attr_accessor :slot

	SHAPES = ["ball", "drop", "whale"]
	MAX_PATTERN = 12
	MAX_STICKER = 12
	SIZE_LARGE = "large"
	SIZE_SMALL = "small"

	belongs_to :invite

	def pattern_image_path(size)
		"/ornaments/#{shape}/#{size}/#{pattern}.png"
	end

	def sticker_image_path(size)
		"/ornaments/#{shape}/#{size}/#{sticker}.png"
	end

	def composite_image_path
		"/ornaments/composite/#{shape}_#{pattern}_#{sticker}.png"
	end

	def full_compsite_image_path
		"#{Rails.root}/public#{composite_image_path}"
	end

	def composite!
		final_size = 200
		ornament_size = 124
		offset = final_size / 2 - ornament_size / 2

		background_path = "#{Rails.root}/public/facebook_img_bkgrd.png"

		pattern_path = "#{Rails.root}/public#{pattern_image_path(SIZE_SMALL)}"
		sticker_path = "#{Rails.root}/public#{sticker_image_path(SIZE_SMALL)}"

		background = Magick::Image.read(background_path).first.resize_to_fill(final_size, final_size)
		pattern = Magick::Image.read(pattern_path).first
		sticker = Magick::Image.read(sticker_path).first

		background.composite!(pattern, offset, offset, Magick::OverCompositeOp)
		background.composite!(sticker, offset, offset, Magick::OverCompositeOp)

		background.write(full_compsite_image_path)
	end

	def self.create_random
		Ornament.create(
			shape: SHAPES.sample,
			pattern: "pattern_#{rand(1..MAX_PATTERN)}",
			sticker: "sticker_#{rand(1..MAX_STICKER)}"
			)
	end
end
