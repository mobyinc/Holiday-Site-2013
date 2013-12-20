class CreateOrnaments < ActiveRecord::Migration
  def change
    create_table :ornaments do |t|
    	t.integer :invite_id
    	t.string :shape
    	t.string :pattern
    	t.string :sticker
    	t.integer :variations

      t.timestamps
    end
  end
end
