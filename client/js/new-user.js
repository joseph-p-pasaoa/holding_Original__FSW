document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", userCheck)
})

const userNotFound = async () => {
    const firstname = document.querySelector("#firstname").value 
    const lastname = document.querySelector("#lastname").value
    const age = document.querySelector("#age").value
    let response = await axios.post(`http://localhost:11000/users/`, {
        firstname: firstname, 
        lastname: lastname, 
        age: age
    });
    enterSite()
}

const userFound = () => {
    clearAlerts()
    let alertUser = document.querySelector("#alert1")
    alertUser.innerText = "User Already Exists!"
    let linkToLogin = document.querySelector("#alert2")
    linkToLogin.innerText = "Click Here To Login!"
    linkToLogin.href = "../html/login.html"
}

const enterSite = () => {
    window.location.href = "../html/posts.html"
}

const tryAgain = () => {
    clearAlerts();
    let alertUser = document.querySelector("#alert1")
    alertUser.innerText = "Missing Information! Please fill out all inputs and try again!"
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
        if (!lastname || !firstname || !age) {
            return tryAgain();
        }
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
        return userFound();
    } else {
        return userNotFound();
    }
}

const clearAlerts = () => {
    if (document.querySelector("#alert1")) {
        let removeAlert1 = document.querySelector("#alert1")
        removeAlert1.innerText = ""
    }
    if (document.querySelector("#alert2")) {
        let removeAlert2 = document.querySelector("#alert2")
        removeAlert2.innerText = ""
        removeAlert2.href = ""
    }
}