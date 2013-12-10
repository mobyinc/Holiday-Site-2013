class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
    	t.string :name
    	t.string :code

      t.timestamps
    end
  end
end
