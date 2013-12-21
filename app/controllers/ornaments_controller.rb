class OrnamentsController < ApplicationController
	def create
		ornament = Ornament.create!(ornament_params)

		render json: {ornament_id: ornament.id}
	end

private

	def ornament_params
		params.require(:ornament).permit(
			:invite_id,			
			:shape,
			:pattern,
			:sticker,
			:variations
		)
	end
end
