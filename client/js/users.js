document.addEventListener('DOMContentLoaded', () => {
    loadUsers()
    const searchUsers = document.querySelector('#displayAllPostFromGivenUser');
    searchUsers.addEventListener('submit', () => {
        searchUser()
    });
    const searchUsersTopCorner = document.querySelector('#searchBoxTop');
    searchUsersTopCorner.addEventListener('submit', () => {
        searchTopLeftUser()
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
        let listPost = document.createElement('li')
        listPost.className = "userList"
        let listPost2 = document.createElement('li')
        listPost2.className = "userList2"
        listPost.innerText = `Name:${users.firstname} ${users.lastname}`;
        listPost2.innerText = `Age:${users.age}`;
        resultDiv.append(listPost, listPost2)
    })
}




async function searchUser() {
    event.preventDefault();
    let userName = document.querySelector('#search').value;
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
            let listPost = document.createElement('li')
            let listPost2 = document.createElement('li')
            listPost.innerText = `Name:${users.firstname} ${users.lastname}`;
            listPost2.innerText = `Age: ${users.age}`;
            searchDiv.append(listPost, listPost2)
        })
    }
}


async function searchTopLeftUser() {
    event.preventDefault();
    let userName = document.querySelector('#search2').value;
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
            let listPost = document.createElement('li')
            let listPost2 = document.createElement('li')
            listPost.innerText = `Name:${users.firstname} ${users.lastname}`;
            listPost2.innerText = `Age: ${users.age}`;
            searchDiv.append(listPost, listPost2)
        })
    }
}

const searchNames = (data, userName) => {
    let id = []
    for (result of data) {
        if (userName.toUpperCase() === result.firstname.toUpperCase()) {
            id.push(result.user_id)
        } else if (userName.toUpperCase() === result.lastname.toUpperCase()) {
            id.push(result.user_id)
        } else if (userName.toUpperCase() === result.firstname.toUpperCase() + " " + result.lastname.toUpperCase()) {
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
    const findAllUsers = await axios.get(`http://localhost:11000/users/`)
    let responseData = findAllUsers.data.body
    let id = filerResults(responseData, firstname, lastname, age)
    if (id === -1) {
        await axios.post(`http://localhost:11000/users/`, { firstname, lastname, age });
        loadUsers()
    }
}


const deleteAUser = async () => {
    event.preventDefault();
    let firstname = document.querySelector('#searchBoxDeleteFN').value;
    let lastname = document.querySelector('#searchBoxDeleteLN').value;
    let age = document.querySelector('#searchBoxDeleteAge').value;
    const findAllUsers = await axios.get(`http://localhost:11000/users/`)
    let responseData = findAllUsers.data.body
    let index = filerResults(responseData, firstname, lastname, age)
    let user_id = responseData[index].user_id
    if (index !== -1) {
        await axios.delete(`http://localhost:11000/users/${user_id}`, { user_id });
        loadUsers()
    }
}


const filerResults = (data, firstname, lastname, age) => {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
        if (firstname === data[i].firstname) {
            if (lastname === data[i].lastname) {
                if (parseInt(age) === parseInt(data[i].age)) {
                    index = i

                }
            }
        }
    }
    return index;
}






