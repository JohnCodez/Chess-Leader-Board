class Game < ApplicationRecord
has_many :gameplayers
has_many :players, through: :gameplayers

end
