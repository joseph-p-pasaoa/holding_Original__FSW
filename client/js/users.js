document.addEventListener('DOMContentLoaded', () => {
    loadUsers()
    const searchUsers = document.querySelector('#displayAllPostFromGivenUser');
    searchUsers.addEventListener('submit', (event) => {
        event.preventDefault();
        searchUser()
    });


    const addUser = document.querySelector('#addUser');
    addUser.addEventListener('submit', () => {
        addAUser()
    });
    const deleteUser = document.querySelector('#deleteUser');
    deleteUser.addEventListener('submit', () => {
        deleteAUser()
    });
})




async function loadUsers() {
    const allPost = document.querySelector("#usersResults");
    allPost.innerHTML = "";
    const response = await axios.get(`http://localhost:11000/users/`)
    response.data.body.forEach((users) => {
        let resultDiv = document.createElement('div')
        resultDiv.className = "allResultsDiv"
        allPost.appendChild(resultDiv)
        let usersName = document.createElement('li')
        usersName.className = "usersName"
        let usersUserName = document.createElement('li')
        usersUserName.className = "usersUserName"
        let usersAge = document.createElement('li')
        usersAge.className = "usersAge"
        let avatar = document.createElement('img')
        avatar.src = users.avatar
        avatar.height = "100"
        usersName.innerText = `Name:${users.firstname} ${users.lastname}`;
        usersUserName.innerText = `UserName:${users.username}`;
        usersAge.innerText = `Age:${users.age}`;

        resultDiv.append(avatar, usersName, usersUserName, usersAge)
    })
}


async function searchUser() {

    loadUsers()
    let userNameValue = document.querySelector('#userSearch').value;
    let userName = userNameValue

    if (userNameValue.includes(" ")) {
        userName = userNameValue.trim()

    }

    const findAllUsers = await axios.get(`http://localhost:11000/users/`)
    let responsedata = findAllUsers.data.body

    let userId = searchNames(responsedata, userName)
    const title = document.getElementById("allTheUsers")
    title.innerHTML = `Results for ${userName}`;
    const userPost = document.querySelector("#usersResults");
    userPost.innerHTML = ""
    for (let i = 0; i < userId.length; i++) {
        let response = await axios.get(`http://localhost:11000/users/${userId[i]}`)
        response.data.body.forEach((users) => {
            let searchDiv = document.createElement('div')
            searchDiv.className = "searchResultsDiv"
            userPost.append(searchDiv)
            let usersName = document.createElement('li')
            let UsersUsername = document.createElement('li')
            let UsersAge = document.createElement('li')
            usersName.innerText = `Name:${users.firstname} ${users.lastname}`;
            UsersUsername.innerText = `UserName:${users.username}`
            UsersAge.innerText = `Age: ${users.age}`;
            searchDiv.append(usersName, UsersUsername, UsersAge)
        })
    }
}






const searchNames = (data, userName) => {
    let trimUserName = userName.split(" ").join("")
    let id = []
    for (result of data) {

        let names = result.firstname + result.lastname
        let nameStr = names.toUpperCase()
        if (result.username.toUpperCase().includes(trimUserName.toUpperCase())) {
            id.push(result.user_id)
        } else if (nameStr.includes(trimUserName.toUpperCase()) || nameStr.includes(trimUserName.toUpperCase())) {
            id.push(result.user_id)
        }
    }
    return id
}


const addAUser = async () => {
    event.preventDefault();
    const firstname = document.querySelector("#searchBoxAddFN").value
    const lastname = document.querySelector("#searchBoxAddLN").value
    const age = document.querySelector("#searchBoxAddAge").value
    const username = document.querySelector("#searchBoxAddUsername").value
    const password = document.querySelector("#searchBoxAddPassword").value
    const findAllUsers = await axios.get(`http://localhost:11000/users/`)
    let responseData = findAllUsers.data.body
    let id = filerResults(responseData, username)
    if (id === -1) {
        await axios.post(`http://localhost:11000/users/`, { username: username, password: password, firstname: firstname, lastname: lastname, age: age });
        loadUsers()
    }
}

const deleteAUser = async () => {
    event.preventDefault();
    let username = document.querySelector('#searchBoxDeleteUsername').value;
    const findAllUsers = await axios.get(`http://localhost:11000/users/`)
    let responseData = findAllUsers.data.body
    let index = filerResults(responseData, username)
    if (index !== -1) {
        let user_id = responseData[index].user_id
        await axios.delete(`http://localhost:11000/users/${user_id}`, { user_id: user_id });
        loadUsers()
    }
}

const filerResults = (data, username) => {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
        if (username === data[i].username) {
            index = i
        }
    }
    return index;
}






