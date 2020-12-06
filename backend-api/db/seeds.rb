# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Player.destroy_all
Game.destroy_all
Gameplayer.destroy_all
User.destroy_all

bobby = Player.create(name: "Bobby Fischer", rank: 800, image_url: "https://cdn.britannica.com/55/11855-050-82C30B02/Bobby-Fischer-1971.jpg")
magnus = Player.create(name: "Magnus Carlsen", rank: 900, image_url: "https://i.guim.co.uk/img/media/80c910214dbf4de7b660b09829b5348eefdb1d18/0_182_5472_3283/master/5472.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=69297966046d1f502d29e76ba78934ac")
beth = Player.create(name: "Beth Harmon", rank: 1100, image_url: "https://www.indiewire.com/wp-content/uploads/2020/08/preview.jpg?w=780")

game1 = Game.create(winner_id: bobby.id, location: "Washington Square, New York, NY 10012" )
game2 = Game.create(winner_id: magnus.id, location: "Center Drive, New York, NY 10019" )
game3 = Game.create(winner_id: beth.id, location: "Bryant Park, W 40th St, New York, NY 10018")

gameplayer1 = Gameplayer.create!(player1_id: bobby.id, player2_id: magnus.id, game_id: game1.id)
gameplayer2 = Gameplayer.create!(player1_id: bobby.id, player2_id: magnus.id, game_id: game2.id)
gameplayer3 = Gameplayer.create!(player1_id: beth.id, player2_id: magnus.id, game_id: game3.id)

john = User.create(username: "John", coins: 20)
