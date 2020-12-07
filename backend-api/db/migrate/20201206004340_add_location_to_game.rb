class AddLocationToGame < ActiveRecord::Migration[6.0]
  def change
    add_column(:games, :location, :string)
    add_column(:games, :latitude, :float)
    add_column(:games, :longitude, :float)

  end
end
