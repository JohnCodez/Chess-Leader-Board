const historyUl = document.getElementById('history-list')
const historyUlP = document.getElementById('previous-history-list')



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

const renderHistory = () => {

    
    
    fetch('http://localhost:3000/gameplayers')
    .then(response => {return response.json()})
    .then((gamePlayersObj => {
        
        fetch('http://localhost:3000/games')
        .then(response => {return response.json()})
        .then((gamesObj => {
            
            // console.log(playersObj[1].name)
            // console.log(gamePlayersObj[1].player1_id)
            // console.log(gamesObj[1].winner_id)
            
            for (let i = 0; i < gamePlayersObj.length; i++) {

                fetch('http://localhost:3000/players')
                .then(response => {return response.json()})
                .then((playersObj => {

                    const li = document.createElement('li')
                    let player1Id = gamePlayersObj[i].player1_id
                    let player2Id = gamePlayersObj[i].player2_id
                    let gameId = gamePlayersObj[i].game_id
                    let winnerId = gamesObj.find(game => game.id === gameId).winner_id
                    if (player2Id === winnerId){[player1Id, player2Id] = [player2Id, player1Id]}
                    
                    let p1Name = playersObj.find(player => player.id === player1Id).name
                    let p1Rank = playersObj.find(player => player.id === player1Id).rank
                    let p1Image = playersObj.find(player => player.id === player1Id).image_url
                    let p2Name = playersObj.find(player => player.id === player2Id).name
                    let p2Rank = playersObj.find(player => player.id === player2Id).rank
                    let p2Image = playersObj.find(player => player.id === player2Id).image_url
                    

                    //Goal
                    li.innerHTML = 
                        `<img id="p1" src=${p1Image} /> <a id="p1-name"> ${p1Name} (${p1Rank})</a>
                        defeated
                        <a id="p2-name"> (${p2Rank}) ${p2Name}</a> <img id="p2" src=${p2Image} />
                        `   
                        historyUlP.prepend(li)
                    }))
                    
                }
                

            }))
        }))
}
renderHistory()


const getPlayer = (id, id2) => {
    Promise.all([
        fetch(`http://localhost:3000/players/${id}`)
        .then(response => response.json()),

        fetch(`http://localhost:3000/players/${id2}`)
        .then(response => response.json())
    ])
    .then(data => {
        const li = document.createElement('li')
        const getPlayer1 = data[0]
        const getPlayer2 = data[1]
        
        // console.log(getPlayer1)
        // console.log(getPlayer2)

        li.innerHTML = 
        `<img id="p1" src=${getPlayer1.image_url} /> <a id="p1-name"> ${getPlayer1.name} (${getPlayer1.rank})</a>
         defeated
         <a id="p2-name"> (${getPlayer2.rank}) ${getPlayer2.name}</a> <img id="p2" src=${getPlayer2.image_url} />
        `
        
        
        historyUl.prepend(li)
    })  
}

