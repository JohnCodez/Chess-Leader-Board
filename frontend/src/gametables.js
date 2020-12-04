const historyUl = document.getElementById('history-list')



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
        // .then(console.log)

}
let getPlayer1;
let getPlayer2;
const getPlayer = (id, id2) => {
    const li = document.createElement('li')
    fetch(`http://localhost:3000/players/${id}`)
    .then(response => response.json())
    .then(player1Obj => {
        getPlayer1 = player1Obj
        
        fetch(`http://localhost:3000/players/${id2}`)
        .then(response => response.json())
        .then(player2Obj => {
            getPlayer2 = player2Obj
            
            console.log(getPlayer1)
            console.log(getPlayer2)

            li.innerHTML = 
            `<img id="p1" src=${getPlayer1.image_url} /> <a id="p1-name"> ${getPlayer1.name} (${getPlayer1.rank})</a>
             defeated
             <a id="p2-name"> (${getPlayer2.rank}) ${getPlayer2.name}</a> <img id="p2" src=${getPlayer2.image_url} />
            `
            
            
            historyUl.prepend(li)
        })
    })
}

