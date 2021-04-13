const getBet = (id, bet) => {
    fetch(`http://localhost:3000/users/${id}`)
    .then(response => response.json())
    .then(userObj => {
        if (bet !== NaN) {  
            if (bet < 0){
                const positiveBet = -bet
                if (userObj.coins >= positiveBet) {
                    newCoinsAmount = userObj.coins + bet
                    const updatedBet = {coins: newCoinsAmount}
                    updateBet(id, updatedBet)
                    coins.value = newCoinsAmount
                    bet1.value = ''
                    bet2.value = ''
                }
            } else {
                if (userObj.coins >= bet) {
                    newCoinsAmount = userObj.coins + bet
                    const updatedBet = {coins: newCoinsAmount}
                    updateBet(id, updatedBet)
                    coins.value = newCoinsAmount
                    bet1.value = ''
                    bet2.value = ''
                }
            }
        }
        })
    
}


const updateBet = (id, updatedBet) => {
    fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBet)
    })
        .then(response => {
            return response.json()
        })
}

coinReset.addEventListener('submit', (event) => {
    event.preventDefault()
    const newUpdatedBet = {coins: 20}
    console.log(newUpdatedBet)
    updateBet(currentUser, newUpdatedBet)
    coins.value = 20
})