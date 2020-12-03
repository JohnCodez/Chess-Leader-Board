class GameplayersController < ApplicationController
    def index
        @gameplayers = Gameplayer.all
        render json: @gameplayers
      end

    def show
        @gameplayer = Gameplayer.find(params[:id])
        render json: @gameplayer
    end

    def new
        @gameplayer = Gameplayer.new
        render json: @gameplayer
    end

    def create
        @gameplayer = Gameplayer.create(gameplayer_params)
        render json: @gameplayer
    end

    def update
        @gameplayer = Gameplayer.find(params[:id])
        @gameplayer.update(gameplayer_params)
        render json: @gameplayer
    end

    private

    def gameplayer_params
        params.require(:gameplayer).permit(:player1_id, :player2_id, :game_id )
    end
end
