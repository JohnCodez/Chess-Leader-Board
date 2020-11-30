class Player < ApplicationRecord
has_many :gameplayers
has_many :games, through: :gameplayers

end
