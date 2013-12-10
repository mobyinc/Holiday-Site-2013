class TreeController < ApplicationController
	def index
		code = params[:code]		
		@invite = Invite.find_by_code(code) if code			
	end
end
