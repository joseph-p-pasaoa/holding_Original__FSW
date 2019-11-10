document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", userCheck)
})

const userNotFound = async () => {
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value
    const firstname = document.querySelector("#firstname").value 
    const lastname = document.querySelector("#lastname").value
    const age = document.querySelector("#age").value
    let response = await axios.post(`http://localhost:11000/users/`, {
        username: username,
        password: password,
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
    const username = document.querySelector("#username").value
    const firstname = document.querySelector("#firstname").value 
    const lastname = document.querySelector("#lastname").value
    const age = document.querySelector("#age").value
    const password = document.querySelector("#password").value
    if (!username) {
        let req1 = document.querySelector("#req1")
        req1.innerText = "** REQUIRED **"
    }
    if (!firstname) {
        let req2 = document.querySelector("#req2")
        req2.innerText = "** REQUIRED **"
    }
    if (!lastname) {
        let req3 = document.querySelector("#req3")
        req3.innerText = "** REQUIRED **"
    }
    if (!age) {
        let req4 = document.querySelector("#req4")
        req4.innerText = "** REQUIRED **"
    }
    if (!password) {
        let req5 = document.querySelector("#req5")
        req5.innerText = "** REQUIRED **"
    }
    let alertUser = document.querySelector("#alert1")
    alertUser.innerText = "Missing Information! Please fill out all inputs and try again!"
}

const userCheck = async (event) => {
    event.preventDefault();
    let counter = 0
    const username = document.querySelector("#username").value
    const firstname = document.querySelector("#firstname").value 
    const lastname = document.querySelector("#lastname").value
    const age = document.querySelector("#age").value
    const password = document.querySelector("#password").value
    let response = await axios.get(`http://localhost:11000/users/`);
    let existingUsers = response.data.body
    for (let user of existingUsers) {
        if (isNaN(age)){
            return tryAgain();
        }
        if (!username || !lastname || !firstname || !age || !password) {
            return tryAgain();
        }
        if (username === user.username) {
            counter += 1
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
        if (password === user.password) {
            counter += 1
        }
    }
    console.log(counter)
    if (counter === 5) {
        return userFound();
    } else {
        return userNotFound();
    }
}

const clearAlerts = () => {
    if (document.querySelector("#req1")) {
        let removeReq1 = document.querySelector("#req1")
        removeReq1.innerText = ""
    }
    if (document.querySelector("#req2")) {
        let removeReq2 = document.querySelector("#req2")
        removeReq2.innerText = ""
    }
    if (document.querySelector("#req3")) {
        let removeReq3 = document.querySelector("#req3")
        removeReq3.innerText = ""
    }
    if (document.querySelector("#req4")) {
        let removeReq4 = document.querySelector("#req4")
        removeReq4.innerText = ""
    }
    if (document.querySelector("#req5")) {
        let removeReq5 = document.querySelector("#req5")
        removeReq5.innerText = ""
    }
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