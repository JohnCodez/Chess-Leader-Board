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
const reset = document.getElementById('resets')
const h1Winner = document.getElementById('h1-winner')
const bet1 = document.getElementById('bet-amount')
const bet2 = document.getElementById('bet-amount2')
let betPlayer1 = null
let betPlayer2 = null
const gameLocation = document.getElementById('choose-location')
const map = document.getElementById('map')

const historyUl = document.getElementById('history-list')
const historyUlP = document.getElementById('previous-history-list')

const coinReset = document.getElementById('user-coins')
let currentUser; 
