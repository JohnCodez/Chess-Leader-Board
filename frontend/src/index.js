// DOM Elements
const main = document.getElementById('main')
const player1 = document.getElementById('choose-player-1')
const player2 = document.getElementById('choose-player-2')
const player1Img = document.getElementById('player-1-image')
const player2Img = document.getElementById('player-2-image')
const leaderBoardList = document.getElementById("leader-board-list")
const newPlayerForm = document.getElementById('new-player-form')
const gameplayForm = document.getElementById('gameplay-form')

// Render Functions

const renderPlayers = (playersObj) => {
    playersObj.forEach(player => {
        const li = document.createElement("li")
        li.innerHTML = `         
            <img src=${player.image_url} />
            ${player.name} (${player.rank})
            `
        leaderBoardList.append(li)

        const option1 = document.createElement("option")
        option1.value = player.name
        option1.textContent = `${player.name} (${player.rank})`;
        player1.append(option1)
        const option2 = document.createElement("option")
        option2.value = player.name
        option2.textContent = `${player.name} (${player.rank})`;
        player2.append(option2)
        
        
    });
    main.addEventListener('change', (event) => {
        let img = ""
        playersObj.forEach(player => {
            if (player.name == event.target.value) {
                img = player.image_url
            }
        })
        if (event.target.id === 'choose-player-1'){
            console.log(event.target)
            player1Img.src = img
        } else if (event.target.id === 'choose-player-2') {
            console.log(event.target)
            player2Img.src = img
        }
    })
       
}
// Event Handlers

newPlayerForm.addEventListener('submit', (event) => {
    // event.preventDefault()
    
    
    const newPlayerObj = {
        name: newPlayerForm.name.value,
        image_url: newPlayerForm.image.value,
        rank: getRandomNumber(700,1100)
    }
    
    createPlayer(newPlayerObj)
    getPlayers()
})

gameplayForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    console.log(player1.value)
    console.log(player2.value)


})


// random number = (1 or 2)
// playersObj.forEach(player){
//  if (radnom number == 1 && player1.value == player.name) {
//      player1.rank += 10  
//      player2.rank -= 10  
// } else if (radnom number == 2 && player2.value == player.name){
//      player2.rank += 10  
//      player1.rank -= 10  
// }}

// Fetch Functions

const getPlayers = () => {fetch('http://localhost:3000/players')
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
        .then(console.log)
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
        .then(console.log)
}



function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

getPlayers()



// 1. Create Patch request called updatePlayer(id)
// 2. eventListener gameSubmit
// 3. call updatePlayerRank in the eventListener

