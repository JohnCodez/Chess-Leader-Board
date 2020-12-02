class PlayersController < ApplicationController
    def index
        @players = Player.all
        render json: @players
    end

    def show
        @player = Player.find(params[:id])
        render json: @player
    end

    def new
        @player = Player.new
    end

    def create
        @player = Player.create(player_params)
    end

    def update
        @player = Player.find(params[:id])
        @player.update(player_params)
        render json: @player
    end

    private

    def player_params
        params.require(:player).permit(:name, :image_url, :rank)
    end
end
