class Invite < ActiveRecord::Base
	has_many :ornaments
	
	def self.create_codes!
		Invite.all.each do |i|
			i.update_attributes(code: SecureRandom.hex(2))
		end
	end
end
