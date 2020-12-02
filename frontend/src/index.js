// DOM Elements
const main = document.querySelector('main')
const player1 = document.getElementById('choose-player-1')
const player2 = document.getElementById('choose-player-2')
const player1Img = document.getElementById('player-1-image')
const player2Img = document.getElementById('player-2-image')
const leaderBoardList = document.getElementById("leader-board-list")

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
        
        // Event Handlers
        
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



// Fetch Functions

const getPlayers = () => {fetch('http://localhost:3000/players')
    .then(response => response.json())
    .then(playersObj => renderPlayers(playersObj.sort((a, b) => b.rank - a.rank)))
}


getPlayers()









