document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", userCheck)
})

const userNotFound = async () => {
    const firstname = document.querySelector("#firstname").value 
    console.log(firstname)
    const lastname = document.querySelector("#lastname").value
    console.log(lastname)
    const age = document.querySelector("#age").value
    console.log(age)
    let response = await axios.post(`http://localhost:11000/users/`, {firstname, lastname, age});
    enterSite()
}

const userFound = () => {
    let form = document.querySelector("#formy-mcformface")
    let alertUser = document.createElement("p")
    alertUser.innerText = "User Already Exists!"
    let linkToLogin = document.createElement("a")
    linkToLogin.innerText = "Click Here To Login!"
    linkToLogin.href = "../html/login.html"
    form.appendChild(alertUser)
    form.appendChild(linkToLogin)
}

const enterSite = () => {
    window.location.href = "../html/posts.html"
}

const userCheck = async (event) => {
    event.preventDefault();
    let counter = 0
    const firstname = document.querySelector("#firstname").value 
    const lastname = document.querySelector("#lastname").value
    const age = document.querySelector("#age").value
    let response = await axios.get(`http://localhost:11000/users/`);
    let existingUsers = response.data.body
    for (let user of existingUsers) {
        if (lastname === user.lastname) {
            counter += 1
        }
        if (firstname === user.firstname) {
            counter += 1
        }
        if (parseInt(age) === user.age) {
            counter += 1
        } 
    }
    if (counter === 3) {
        return userFound()
    } else {
        return userNotFound()
    }
}