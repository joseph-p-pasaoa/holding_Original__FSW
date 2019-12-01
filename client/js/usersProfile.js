document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile()

});


async function loadUserProfile() {
    let params = (new URL(document.location)).searchParams;
    let currentUser = params.get("user");
    const allPost = document.querySelector("#usersResults");
    allPost.innerHTML = "";
    let response = await axios.get(`http://localhost:11000/users/${currentUser}`)
  
    let responseData = response.data.body
    responseData.forEach((users) => {
        console.log(responseData)
        let resultDiv = document.createElement('div')
        resultDiv.id = `allResultsDiv${users.user_id}`
        resultDiv.className = `allResultsDiv`
        allPost.appendChild(resultDiv)
        let usersAvatar = document.createElement('img')
        usersAvatar.id = "avatar"
        usersAvatar.src = `${users.avatar}`
        usersAvatar.height = "150"
        usersAvatar.className = "profileImage"
        let usersName = document.createElement('li')
        usersName.className = "usersName"
        let usersUserName = document.createElement('li')
        usersUserName.class = "usersUserName"
        let usersAge = document.createElement('li')
        usersAge.className = "usersAge"
        usersName.innerText = `Name:${users.firstname} ${users.lastname}`;
        usersUserName.innerText = `UserName:${users.username}`;
        usersAge.innerText = `Age:${users.age}`;
        resultDiv.append(usersAvatar, usersName, usersUserName, usersAge)

    })
}

