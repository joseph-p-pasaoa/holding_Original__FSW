document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", userCheck)
})

const userNotFound = () => {
    clearAlerts();
    let alertUser = document.querySelector("#alert1")
    alertUser.innerText = "User Not Found!"
    let linkToNewUser = document.querySelector("#alert2")
    linkToNewUser.innerText = "Click HERE to register as a new user!"
    linkToNewUser.href = "../html/new-user.html"
}

const userFound = () => {
    window.location.href = "../html/holds.html?user=3&hold=1"
}

const tryAgain = () => {
    clearAlerts();
    const username = document.querySelector("#username").value 
    const password = document.querySelector("#password").value
    if (!username) {
        let req1 = document.querySelector("#req1")
        req1.innerText = "** REQUIRED **"
    }
    if (!password) {
        let req2 = document.querySelector("#req2")
        req2.innerText = "** REQUIRED **"
    }
    let alertUser = document.querySelector("#alert1")
    alertUser.innerText = "Missing Information! Please fill out all inputs and try again!"
}

const userCheck = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username").value 
    const password = document.querySelector("#password").value
    let response = await axios.get(`http://localhost:11000/users/`);
    let existingUsers = response.data.body
    for (let user of existingUsers) {
        if (!username || !password) {
            return tryAgain();
        } else if (username === user.username) {
            if (password === user.password) {
                return userFound()
            }
        }
    }
    return userNotFound()
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