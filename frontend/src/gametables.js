



function makeGame(winnerId, playersIds){
    
    let gameObj = {
        winner_id: winnerId
    }
    
    const createGame = (gameObj) => {
        fetch('http://localhost:3000/games', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gameObj)
        })
        .then(response => {
            return response.json()
        })
        .then(fetchGames(playersIds))
    }
    
    createGame(gameObj)
}
function fetchGames(playersIds){
    const getGames = () => {
            fetch('http://localhost:3000/games')
            .then(response => {
                return response.json()
            })
            .then((gamesArr) => {
                const gameplayersObj = {
                    game_id: gamesArr[gamesArr.length - 1].id + 1,
                    player1_id: playersIds[0],
                    player2_id: playersIds[1]
                }
                createGameplayers(gameplayersObj)
            })
    }
    getGames()
    
}

const createGameplayers = (gameplayersObj) => {
    fetch('http://localhost:3000/gameplayers', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameplayersObj)
    })
        .then(response => {
            return response.json()
        })
        .then(console.log)

}