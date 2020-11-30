class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :rank
      t.string :image_url

      t.timestamps
    end
  end
end
