class CreateOrnaments < ActiveRecord::Migration
  def change
    create_table :ornaments do |t|
    	t.integer :invite_id
    	t.string :base_image
    	t.string :top_image

      t.timestamps
    end
  end
end
