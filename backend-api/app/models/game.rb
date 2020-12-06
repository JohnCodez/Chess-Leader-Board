class Game < ApplicationRecord
has_many :gameplayers
has_many :players, through: :gameplayers

geocoded_by :location
after_validation :geocode

end
