class GameplayersController < ApplicationController
    def index
        @gameplayers = Gameplayer.all
        render json: @gameplayers
      end
end
