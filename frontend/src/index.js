bet1.oninput = function() {
    bet2.disabled = this.value != "";
}

bet2.oninput = function() {
    bet1.disabled = this.value != "";
}



// Render Functions

const renderPlayers = (playersObj) => {
    
    const placeholder = document.createElement('option')
    placeholder.innerText = `Select Player 1`
    placeholder.value = ""
    placeholder.disabled = true

    player1.append(placeholder)
    player1.selectedIndex = 0
    
    const placeholder2 = document.createElement('option')
    placeholder2.innerText = `Select Player 2`
    placeholder2.value = ""
    placeholder2.disabled = true
    
    player2.append(placeholder2)
    player2.selectedIndex = 0

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
        
        option1.textContent = `${player.name}`;
        player1.append(option1)
        
        const option2 = document.createElement("option")
        option2.value = player.id
        option2.dataset.id = player.rank
        option2.textContent = `${player.name}`;
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

gameplayForm.addEventListener('submit', (event) => {
    event.preventDefault()
    winner = getRandomNumber(1,2)
    const player1Id = player1.value 
    const player2Id = player2.value 
    betPlayer1 = parseInt(bet1.value)
    betPlayer2 = parseInt(bet2.value)
    h1Winner.textContent = "... BATTLING ..."
    h1Winner.style.color = 'red';
    setTimeout (function() {
    
    
    fetch(`http://localhost:3000/players/${player1Id}`)
    .then(response => response.json())
    .then((player1Obj) => {
        
        
        //1st player
        const playersIds = [player1Id, player2Id]
        if (winner == 1){
            let player1Rank = player1Obj.rank
            const playerObj = {
                rank: player1Rank + 50
            }  
            updatePlayer(player1Id, playerObj, player1Id, player2Id, 1)
        let li = document.getElementById(`${player1Id}`)
        li.childNodes[3].textContent = playerObj.rank
        winnerId = player1Id
        h1Winner.textContent = player1Obj.name + ' Wins!'
        h1Winner.style.color = 'green'

        map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBG9caRGRSzZCc1Wvfh5bvl-FoS0PNlWxY&q=${gameLocation.value}`
        makeGame(winnerId, playersIds, gameLocation)
        getBet(currentuser, betPlayer1)

        setTimeout(() => {
            winnerColor = document.getElementById(`${player1Id}`)
            winnerColor.style.color = 'green';
        }, 1000)
    } else {
        let player1Rank = player1Obj.rank
        if (player1Rank >= 50) { 
            const playerObj = {
                rank: player1Rank - 50
            }
            updatePlayer(player1Id, playerObj, player1Id, player2Id, 0)
            let li = document.getElementById(`${player1Id}`)
            li.childNodes[3].textContent = playerObj.rank
            betPlayer1 = 0 - betPlayer1
            getBet(currentuser, betPlayer1)
            
            setTimeout(() => {
                loserColor = document.getElementById(`${player1Id}`)
                loserColor.style.color = 'red';
            }, 1000)
        } else {
            const playerObj = {
                rank: 0
            }
            updatePlayer(player1Id, playerObj, player1Id, player2Id, 0)
            let li = document.getElementById(`${player1Id}`)
            li.childNodes[3].textContent = playerObj.rank
            betPlayer1 = 0 - betPlayer1
            getBet(currentuser, betPlayer1)
            setTimeout(() => {
                loserColor = document.getElementById(`${player1Id}`)
                loserColor.style.color = 'red';
            }, 1000)
        }
    }
    
}) 

//2nd
fetch(`http://localhost:3000/players/${player2Id}`)
.then(response => response.json())
.then((player2Obj) => {
    const playersIds = [player1Id, player2Id]
    if (winner == 2) {
        let player2Rank = player2Obj.rank
        const playerObj = {
            rank: player2Rank + 50
        }  
        updatePlayer(player2Id, playerObj, player2Id, player1Id, 1)
        let li = document.getElementById(`${player2Id}`)
        li.childNodes[3].textContent = playerObj.rank
        winnerId = player2Id
        h1Winner.textContent = player2Obj.name + ' Wins!'
        h1Winner.style.color = 'green'
        // console.log(winnerId)
        map.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBG9caRGRSzZCc1Wvfh5bvl-FoS0PNlWxY&q=${gameLocation.value}`
        makeGame(winnerId, playersIds, gameLocation)
        getBet(currentuser, betPlayer2)

        setTimeout(() => {
            winnerColor = document.getElementById(`${player2Id}`)
            winnerColor.style.color = 'green';
        }, 1000)
    } else {
        let player2Rank = player2Obj.rank
        if (player2Rank >= 50) { 
            const playerObj = {
                rank: player2Rank - 50
            }
            updatePlayer(player2Id, playerObj, player1Id, player2Id, 0)
            let li = document.getElementById(`${player2Id}`)
            li.childNodes[3].textContent = playerObj.rank
            betPlayer2 = 0 - betPlayer2
            getBet(currentuser, betPlayer2)

            setTimeout(() => {
                loserColor = document.getElementById(`${player2Id}`)
                loserColor.style.color = 'red';
            }, 1000)
            
            
        } else {
            const playerObj = {
                rank: 0
            }
            updatePlayer(player2Id, playerObj, player1Id, player2Id, 0)
            let li = document.getElementById(`${player2Id}`)
            li.childNodes[3].textContent = playerObj.rank
            betPlayer2 = 0 - betPlayer2
            getBet(currentuser, betPlayer2)

            setTimeout(() => {
                loserColor = document.getElementById(`${player2Id}`)
                loserColor.style.color = 'red';
            }, 1000)

        }
    }})
    
    bet1.disabled = false
    bet2.disabled = false
    
}, 3000)
})

reset.addEventListener("reset", (event) => {
    event.preventDefault()
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
        .then(() => {
            player1.options.length = 0
            player2.options.length = 0
            while (leaderBoardList.firstChild) {
                leaderBoardList.removeChild(leaderBoardList.lastChild)
            }                   
            getPlayers()
        })
}

const updatePlayer = (id, playerObj, player1Id, player2Id, statusRun) => {
    fetch(`http://localhost:3000/players/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerObj)
    })
        .then(response => {
            return response.json()
        })
        .then(() => {
            if (statusRun === 1) {
                getPlayer(player1Id, player2Id)
                player1.options.length = 0
                player2.options.length = 0
                while (leaderBoardList.firstChild) {
                    leaderBoardList.removeChild(leaderBoardList.lastChild)
                }                   
                getPlayers()
            }
            })
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

  gameplayForm.addEventListener('reset', (event) => {
      event.preventDefault()
      player1.selectedIndex = 0
      player2.selectedIndex = 0
  })



getPlayers()

// while (player1.firstElementChild) {
//     player1.removeChild(player1.lastElementChild)
// }
// while (player2.firstElementChild) {
//     player2.removeChild(player2.lastElementChild)
// }

