const username = document.getElementById('username')
const existingUser = document.getElementById('existing-users')
const newUser = document.getElementById('new-user')
const coins = document.getElementById('coins')
// let currentUser = null

// Renders
const renderUsers = (usersObj) => {
    usersObj.forEach(user => {
        const option = document.createElement('option')
        option.value = user.id 
        option.textContent = user.username
        
        existingUser.append(option)
    });
}

const renderNewUser = (newUserObj) => {
    const option = document.createElement('option')
    option.value = newUserObj.id
    option.textContent = newUserObj.username

    existingUser.append(option)
    newUser.reset()

}

//EventListeners

newUser.addEventListener("submit", (event) => {
    event.preventDefault()
    const username = document.getElementById("username-new-name")

    const newUserObj = {
        username: username.value,
        coins: 20
    }

    createUser(newUserObj)
})

existingUser.addEventListener("change", (event) => {
    event.preventDefault()

    getUser(event.target.value)
    
    
})


// Fetches
const getUsers = () => {
    
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(usersObj => renderUsers(usersObj))

}

const createUser = (newUserObj) => {
    fetch('http://localhost:3000/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserObj)
    })
    .then(response => {
        return response.json()
    })
    .then(renderNewUser(newUserObj))
}

const getUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`)
    .then(response => {
        return response.json()
    })
    .then(userObj => {
        // currentUser = userObj
        coins.value = userObj.coins
        username.textContent = 'Welcome ' + userObj.username + '!'
    })
}

getUsers()