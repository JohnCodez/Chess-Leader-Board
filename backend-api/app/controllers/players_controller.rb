class PlayersController < ApplicationController
    def index
        @players = Player.all
        render json: @players
    end

    def new
        @player = Player.new
    end

    def create
        @player = Player.create(player_params)
    end

    private

    def player_params
        params.require(:player).permit(:name, :image_url, :rank)
    end
end
