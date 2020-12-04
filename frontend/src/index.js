// DOM Elements
const main = document.getElementById('main')
const player1 = document.getElementById('choose-player-1')
const player2 = document.getElementById('choose-player-2')
const player1Img = document.getElementById('player-1-image')
const player2Img = document.getElementById('player-2-image')
const leaderBoardList = document.getElementById("leader-board-list")
const newPlayerForm = document.getElementById('new-player-form')
const gameplayForm = document.getElementById('gameplay-form')
let status = true
let winnerId = 0;
const h1Winner = document.getElementById('h1-winner')
// Render Functions

const renderPlayers = (playersObj) => {
    
    playersObj.forEach(player => {
        const li = document.createElement("li")
        li.innerHTML = `         
            <img src=${player.image_url} />
            ${player.name} (<a id="rank">${player.rank}</a>)
            `
        li.id = player.id 

        if (status == true) {
            leaderBoardList.append(li)
        }
        status = true
        const option1 = document.createElement("option")
        option1.value = player.id
        option1.dataset.id = player.rank
        
        // option1.textContent = `${player.name} (${player.rank})`;
        option1.textContent = `${player.name}`;
        player1.append(option1)
        
        const option2 = document.createElement("option")
        option2.value = player.id
        option2.dataset.id = player.rank
        option2.textContent = `${player.name}`;
        // option2.textContent = `${player.name} (${player.rank})`;
        player2.append(option2)
        
        
    });
    main.addEventListener('change', (event) => {
        let img = ""
        playersObj.forEach(player => {
            if (player.id == event.target.value) {
                img = player.image_url
            }
        })
        if (event.target.id === 'choose-player-1'){
            player1Img.src = img
        } else if (event.target.id === 'choose-player-2') {
            player2Img.src = img
        }
    })
    
}

const renderNewPlayer = (newPlayerObj) => {
        const li = document.createElement("li")
        li.innerHTML = `         
            <img src=${newPlayerObj.image_url} />
            ${newPlayerObj.name} (${newPlayerObj.rank})
            `
        li.id = newPlayerObj.id

        leaderBoardList.append(li)

}


// Event Handlers

newPlayerForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const newPlayerObj = {
        name: newPlayerForm.name.value,
        image_url: newPlayerForm.image.value,
        rank: getRandomNumber(700,1100)
    }
    
    createPlayer(newPlayerObj)
    newPlayerForm.reset()
})

gameplayForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    winner = getRandomNumber(1,2)
    const player1Id = player1.value 
    const player2Id = player2.value 
    
    await fetch(`http://localhost:3000/players/${player1Id}`)
    .then(response => response.json())
    .then((player1Obj) => {
        //1st player
        const playersIds = [player1Id, player2Id]
        if (winner == 1){
            let player1Rank = player1Obj.rank
            const playerObj = {
                rank: player1Rank + 50
            }  
                updatePlayer(player1Id, playerObj)
                let li = document.getElementById(`${player1Id}`)
                li.childNodes[3].textContent = playerObj.rank
                winnerId = player1Id
                h1Winner.textContent = player1Obj.name + ' Wins!'
                h1Winner.style.color = 'green'
                // console.log(winnerId) 
                makeGame(winnerId, playersIds)
                // renderHistory(winnerId, playersIds)
                getPlayer(player1Id, player2Id)
                          
            } else {
                let player1Rank = player1Obj.rank
                if (player1Rank >= 50) { 
                    const playerObj = {
                        rank: player1Rank - 50
                    }
                        updatePlayer(player1Id, playerObj)
                        let li = document.getElementById(`${player1Id}`)
                        li.childNodes[3].textContent = playerObj.rank
                        
                    } else {
                        const playerObj = {
                            rank: 0
                        }
                            updatePlayer(player1Id, playerObj)
                            let li = document.getElementById(`${player1Id}`)
                            li.childNodes[3].textContent = playerObj.rank
                    }
                        }
        
        }) 
        
        //2nd
    await fetch(`http://localhost:3000/players/${player2Id}`)
    .then(response => response.json())
    .then((player2Obj) => {
        const playersIds = [player1Id, player2Id]
        if (winner == 2) {
            let player2Rank = player2Obj.rank
            const playerObj = {
                rank: player2Rank + 50
            }  
                updatePlayer(player2Id, playerObj)
                let li = document.getElementById(`${player2Id}`)
                li.childNodes[3].textContent = playerObj.rank
                winnerId = player2Id
                h1Winner.textContent = player2Obj.name + ' Wins!'
                h1Winner.style.color = 'green'
                // console.log(winnerId)
                makeGame(winnerId, playersIds)
                // renderHistory(winnerId, playersIds)
                getPlayer(player2Id, player1Id)
        } else {
        let player2Rank = player2Obj.rank
       if (player2Rank >= 50) { 
        const playerObj = {
            rank: player2Rank - 50
        }
            updatePlayer(player2Id, playerObj)
            let li = document.getElementById(`${player2Id}`)
            li.childNodes[3].textContent = playerObj.rank
            
        } else {
            const playerObj = {
                rank: 0
            }
                updatePlayer(player2Id, playerObj)
                let li = document.getElementById(`${player2Id}`)
                li.childNodes[3].textContent = playerObj.rank
        }
    }})
    
        // clearOptions('choose-player-1')
        // clearOptions('choose-player-2')
        // clearLeaderboard('leader-board-list')
        // status = false
        // getPlayers()
        gameplayForm.reset()
    })

// Fetch Functions

const getPlayers = () => {
    // debugger
    fetch('http://localhost:3000/players')
    .then(response => response.json())
    .then(playersObj => renderPlayers(playersObj.sort((a, b) => b.rank - a.rank)))
}

const createPlayer = (newPlayerObj) => {
    fetch('http://localhost:3000/players', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newPlayerObj)
    })
        .then(response => {
            return response.json()
        })
        .then(renderNewPlayer(newPlayerObj))
}

const updatePlayer = (id, playerObj) => {
    fetch(`http://localhost:3000/players/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerObj)
    })
        .then(response => {
            return response.json()
        })
        // .then(console.log)
}



function getRandomNumber(min, max) {
    number = Math.random() * (max - min) + min;
    number = Math.round(number)
    return number
  }
  function clearOptions(list){
    let select = document.getElementById(list)
    let length = select.options.length
    for (i = length-1; i >= 0; i--) {
        select.options[i] = null;
    }
  }
  function clearLeaderboard(leaderboardlist){
    let ol = document.getElementById(leaderboardlist)
    let length = ol.children.length
    for (i = length-1; i >= 0; i--) {
        ol.children[i] = null;
    }
  }
getPlayers()



// 1. Create Patch request called updatePlayer(id)
// 2. eventListener gameSubmit
// 3. call updatePlayerRank in the eventListener

