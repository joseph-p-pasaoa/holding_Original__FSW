document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", userCheck)
})

const userNotFound = () => {
    clearAlerts();
    let alertUser = document.querySelector("#alert1")
    alertUser.innerText = "User Not Found!"
    let linkToNewUser = document.querySelector("alert2")
    linkToNewUser.innerText = "Click Here Register As A New User!"
    linkToNewUser.href = "../html/new-user.html"
}

const userFound = () => {
    window.location.href = "../html/posts.html"
}

const tryAgain = () => {
    clearAlerts();
    const firstname = document.querySelector("#firstname").value 
    const lastname = document.querySelector("#lastname").value
    const age = document.querySelector("#age").value
    if (!firstname) {
        let req1 = document.querySelector("#req1")
        req1.innerText = "** REQUIRED **"
    }
    if (!lastname) {
        let req2 = document.querySelector("#req2")
        req2.innerText = "** REQUIRED **"
    }
    if (!age) {
        let req3 = document.querySelector("#req3")
        req3.innerText = "** REQUIRED **"
    }
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
        if (isNaN(age)){
            return tryAgain();
        }
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
        return userFound()
    } else {
        return userNotFound()
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
    if (document.querySelector("#alert1")) {
        console.log("gotcha alert1")
        let removeAlert1 = document.querySelector("#alert1")
        removeAlert1.innerText = ""
    }
    if (document.querySelector("#alert2")) {
        console.log("gotcha alert2")
        let removeAlert2 = document.querySelector("#alert2")
        removeAlert2.innerText = ""
        removeAlert2.href = ""
    }
}