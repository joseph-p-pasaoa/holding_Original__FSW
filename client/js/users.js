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
    let holdValue = document.querySelector("#currentHold").value;
    const holdsDropper = document.querySelector('#holdsDropper')
    const allOptions = document.createElement('option')
    allOptions.innerText = "All Friends"
    allOptions.value = "0"
    holdsDropper.appendChild(allOptions)
    let holdsDescriptionDiv = document.querySelector('#aboutHold')
    let holdsDescription = document.createElement('h3')
    holdsDescriptionDiv.innerText = "okay"
    holdsDescription.innerText = "This is all the friends in all of your holds"
    holdsDescriptionDiv.appendChild(holdsDescription)
    const currentUser = document.querySelector('#userNum').value;
    const allPost = document.querySelector("#usersResults");
    allPost.innerHTML = "";
    let response = await axios.get(`http://localhost:11000/users/holds/${currentUser}`)
    let responseData = response.data.body
    let allHoldsUserIsAMember = {}
    responseData.forEach((holds) => {
        allHoldsUserIsAMember[holds.hold_id] = true
    })
    let allUsersAndHolds = await axios.get(`http://localhost:11000/users/holds/`)
    let allUsersAndHoldsData = allUsersAndHolds.data.body
    let allMemeberId = []
    let nonrepeatAllMemberId = []
    allUsersAndHoldsData.forEach((users) => {
        if (allHoldsUserIsAMember[users.hold_id]) {
            allMemeberId.push(users.user_id)
        }
    })
    for (let i = 0; i < allMemeberId.length; i++) {
        if (!nonrepeatAllMemberId.includes(allMemeberId[i])) {
            nonrepeatAllMemberId.push(allMemeberId[i])
        }
    }
    if (holdValue === "0") {
        let allUsers = await axios.get(`http://localhost:11000/users/`)
        allUsersData = allUsers.data.body
        allUsersResponse(allUsersData, nonrepeatAllMemberId, allPost, "0")
    } else {

        let allUsersFromSpecificHold = await axios.get(`http://localhost:11000/holds/${holdValue}`)
        usersFromHold = allUsersFromSpecificHold.data.body
        allUsersResponse(usersFromHold, nonrepeatAllMemberId, allPost, holdValue)
    }
}



const allUsersResponse = async (allUsersData, memberId, allPost, num) => {
    allUsersData.forEach((users) => {
        if (memberId.includes(users.user_id)) {
            let resultDiv = document.createElement('div')
            resultDiv.id = `allResultsDiv${users.user_id}`
            resultDiv.className = `allResultsDiv`
            allPost.appendChild(resultDiv)
            let linkToUser = document.createElement('a');
            linkToUser.href = `./usersProfile.html?user=${users.user_id}&hold=${num}`
            let usersAvatar = document.createElement('img')
            usersAvatar.id = "avatar"
            usersAvatar.src = `${users.avatar}`
            usersAvatar.height = "150"
            usersAvatar.width = "150"
            usersAvatar.className = "profileImage"
            let usersName = document.createElement('li')
            usersName.className = "usersName"
            let usersUserName = document.createElement('li')
            usersUserName.className = "usersUserName"
            let usersAge = document.createElement('li')
            usersAge.className = "usersAge"
            usersName.innerText = `Name:${users.firstname} ${users.lastname}`;
            usersUserName.innerText = `UserName:${users.username}`;
            usersAge.innerText = `Age:${users.age}`;
            resultDiv.append(linkToUser)
            linkToUser.append(usersAvatar, usersName, usersUserName, usersAge)
            // let deleteBTN = document.createElement("button");
            // deleteBTN.id = `user${users.user_id}`;
            // deleteBTN.className = "delUserBtn";
            // deleteBTN.innerText = "delete";

            // deleteBTN.onclick = function () {

            //     // deleteAUser(currentUser);

            // }

        }
    })
}















async function searchUser() {
    let userNameValue = document.querySelector('#userSearch').value;
    let userName = userNameValue
    if (userNameValue.includes(" ")) {
        userName = userNameValue.trim()
    }
    const findAllUsers = await axios.get(`http://localhost:11000/users/`)
    let responsedata = findAllUsers.data.body

    let userId = searchNames(responsedata, userName)
    const title = document.getElementById("allTheUsers")
    // title.innerHTML = `Results for : ${userName}`;
    const userPost = document.querySelector("#usersResults");
    userPost.innerHTML = ""
    const currentUser = document.querySelector('#userNum').value;
    let response = await axios.get(`http://localhost:11000/users/holds/${currentUser}`)
    let responseData = response.data.body
    let allHoldsUserIsAMember = {}
    responseData.forEach((holds) => {
        allHoldsUserIsAMember[holds.hold_id] = true
    })
    let allUsersAndHolds = await axios.get(`http://localhost:11000/users/holds/`)
    let allUsersAndHoldsData = allUsersAndHolds.data.body
    let allMemeberId = []
    let nonrepeatAllMemberId = []
    allUsersAndHoldsData.forEach((users) => {
        if (allHoldsUserIsAMember[users.hold_id]) {
            allMemeberId.push(users.user_id)
        }
    })
    for (let i = 0; i < allMemeberId.length; i++) {
        if (!nonrepeatAllMemberId.includes(allMemeberId[i])) {
            nonrepeatAllMemberId.push(allMemeberId[i])
        }
    }
    let sameid = []


    for (let i = 0; i < nonrepeatAllMemberId.length; i++) {
        if (userId.includes(nonrepeatAllMemberId[i])) {
            sameid.push(nonrepeatAllMemberId[i])
        }
    }


    if (sameid.length > 0) {
        for (let i = 0; i < sameid.length; i++) {
            let responseSearch = await axios.get(`http://localhost:11000/users/${sameid[i]}`)
            responseSearch.data.body.forEach((users) => {
                title.innerHTML = `Results for : ${userName}`;

                let searchDiv = document.createElement('div')
                searchDiv.className = "searchResultsDiv"
                userPost.append(searchDiv)
                let linkToUser = document.createElement('a')
                linkToUser.href = `./usersProfile.html?user=${users.user_id}&hold=${0}`
                searchDiv.appendChild(linkToUser)
                let usersName = document.createElement('li')
                let usersAvatar = document.createElement('img')
                let UsersUsername = document.createElement('li')
                let UsersAge = document.createElement('li')
                usersName.innerText = `Name:${users.firstname} ${users.lastname}`;
                UsersUsername.innerText = `UserName:${users.username}`
                usersAvatar.id = "avatar"
                usersAvatar.src = `${users.avatar}`
                usersAvatar.height = "150"
                usersAvatar.width = "150"
                usersAvatar.className = "profileImage"
                UsersAge.innerText = `Age: ${users.age}`;
                linkToUser.append(usersAvatar, usersName, UsersUsername, UsersAge)
            })
        }
    } else {
        title.innerHTML = `No Results Found For:  ${userName}`;

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
    const username = document.querySelector("#searchBoxAddUsername").value
    const findAllUsers = await axios.get(`http://localhost:11000/users/`)
    let responseData = findAllUsers.data.body
    let id = filerResults(responseData, username)
   




    if (id > -1) {
        await axios.post(`http://localhost:11000/users/`, { username: username, password: password, firstname: firstname, lastname: lastname, age: age });
        loadUsers()
    }
}





const filerResults = async (data, username) => {
    let holdValue = document.querySelector("#currentHold").value;
    console.log(holdValue)
    let usernameId = -2; //-2: Does not exist at all; -1: exist and in the hold ; other:exist and not in the hold
    // let usernameExistInTheHold = -1 // -1: already in the hold; other: does not exist in the hold
    let allUsers = await axios.get(`http://localhost:11000/users/`)
    allUsersData = allUsers.data.body
    console.log(allUsersData)


    let allUsersFromSpecificHold = await axios.get(`http://localhost:11000/holds/${holdValue}`)
    usersFromHold = allUsersFromSpecificHold.data.body
    console.log(usersFromHold)




    for (let i = 0; i < allUsersData.length; i++) {
        if (username === allUsersData[i].username) {
            usernameId = allUsersData[i].user_id

        }
    }
    console.log(usernameId)
    if (!usernameId === -2) {
        for (let j = 0; j < usersFromHold.length; j++) {
            if (usernameId === usersFromHold[i].username) {
                usernameId = -1
                console.log(usernameId)
            } else {
                usernameId = usersFromHold.userId
                console.log(usernameId)
            }

        }
    }
    
    return usernameId;
}








// const deleteAUser = async (user_id) => {
//     event.preventDefault();
//     let username = document.querySelector('#searchBoxDeleteUsername').value;
//     await axios.get(`http://localhost:11000/users/`)
//     let responseData = findAllUsers.data.body
//     await axios.delete(`http://localhost:11000/users/${user_id}`, { user_id: user_id });
//     // let div = document.querySelector(".allResultsDiv")
//     // div.parentNode.removeChild(div);
//     // let index = filerResults(responseData, username)
//     // if (index !== -1) {
//     //     let user_id = responseData[index].user_id
//     //     loadUsers()
//     // }
// }