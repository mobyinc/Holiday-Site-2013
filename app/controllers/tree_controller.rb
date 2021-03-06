class TreeController < ApplicationController
	ROW_COUNT = 9

	def index
		code = params[:code]		
		@invite = Invite.find_by_code(code) if code
		@layout = get_layout(18)			
	end

	def show_create
		@layout = get_layout(18)
		@show_workshop = true

		render 'index'
	end	

	def show		
		@ornament = Ornament.find(params[:id])
		@layout = get_layout(18, params[:id])

		render 'index'
	end

	def show_detail
		@ornament = Ornament.find(params[:id])

		render partial: 'ornament_detail', locals: { ornament: @ornament, thanks: false }
	end

	def show_thanks_detail
		@ornament = Ornament.find(params[:id])

		render partial: 'ornament_detail', locals: { ornament: @ornament, thanks: true }
	end

	# helpers

	def get_layout(count, include_id=nil)
		layout = [
			{ ratio: 2.20, ornaments: [] },
			{ ratio: 3.12, ornaments: [] },
			{ ratio: 4.33, ornaments: [] },
			{ ratio: 4.33, ornaments: [] },
			{ ratio: 5.25, ornaments: [] },
			{ ratio: 4.80, ornaments: [] },
			{ ratio: 6.90, ornaments: [] },
			{ ratio: 8.70, ornaments: [] },
			{ ratio: 8.70, ornaments: [] },
		]

		@ornaments = Ornament.order("RAND()").limit(count).to_a
		@ornaments << Ornament.find(params[:id]) if include_id

		row = 0

		@ornaments.each do |ornament|
			max_this_row = 1
			slot = 0
			attempts = 0

			while attempts < 100 do
				logger.info("attempt #{attempts}")

				max_this_row = layout[row][:ratio].floor
				count_this_row = layout[row][:ornaments].length
				if count_this_row < max_this_row
					while attempts < 100
						slot = rand(0..max_this_row-1)				
						attempts += 1
						break if !layout[row][:ornaments][slot]						
					end

					break
				else
					row += 1
					row = 0 if row >= ROW_COUNT					
				end

				attempts += 1
			end			

			ornament.row = row
			ornament.slot = slot
			ornament.top = rand(-25..25)

			min_left = -10
			max_left = 90
			delta = max_left - min_left
			percent_full = slot / max_this_row.to_f

			ornament.left = percent_full * delta + min_left + rand(-4..4)

			layout[row][:ornaments][slot] = ornament

			row += 1
			row = 0 if row >= ROW_COUNT
		end

		return layout
	end
end
