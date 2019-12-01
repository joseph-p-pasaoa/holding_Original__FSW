/*
User Simulator Script | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


const usServerComm = async (method, urlAdds, body) => {
  const url = `http://localhost:11000/${urlAdds}`;
  try {
    const response = await axios[method](url, body);
    return response.data;
  } catch (err) {
    log("client-side error: ", err);
  }
}

const commForDESTUserHolds = async (userId) => {
  const response = await usServerComm('get', `sw/userholds/${userId}`);
  if (response.body.length > 0) {
    return response.body[0].hold_id;
  }
  return 999;
} 


const whoIsUser = () => {
  const urlParams = (new URL(document.location)).searchParams;
  return urlParams.get('user');
}

const reloadFromUserChange = (userId, holdId) => {
  currentPathname = window.location.pathname;
  if (currentPathname.includes('photos.html')) {
    let urlBuild = window.location.href;
    urlBuild = urlBuild.replace("photos.html", "albums.html");
    urlBuild = urlBuild.replace(window.location.search, `?user=${userId}&hold=${holdId}`);
    window.location.href = urlBuild;
  } else {
    window.location.search = `?user=${userId}&hold=${holdId}`;
  }

  if (currentPathname.includes('usersProfile.html')) {
    let urlBuild = window.location.href;

    urlBuild = urlBuild.replace("usersProfile.html", "users.html");
    urlBuild = urlBuild.replace(window.location.search, `?user=${userId}&hold=${holdId}`);
    window.location.href = urlBuild;
  } else {
    window.location.search = `?user=${userId}&hold=${holdId}`;
  }
}


const initUserSim = () => {
  let makingUserSim = document.createElement('div');
    makingUserSim.id = "userSimControl";
  let makingUSLabel = document.createElement('label');
    makingUSLabel.for = "userNum";
    makingUSLabel.innerHTML = "<b>user_id</b> sim";
  let makingUSInput = document.createElement('input');
    makingUSInput.type = "text";
    makingUSInput.id = "userNum";
    makingUSInput.name = "userNum";
    makingUSInput.value = whoIsUser() || 4; 
    makingUSInput.addEventListener("focus", (e) => {
        e.target.parentNode.style.backgroundColor = "gold";
        e.target.style.backgroundColor = "red";
    });
    makingUSInput.addEventListener("keypress", async (e) => {
        if (e.keyCode === 13) {
          const userId = document.querySelector('#userNum').value;
          const holdId = await commForDESTUserHolds(userId);
          reloadFromUserChange(userId, holdId);
          // reloadFromUserProfile(userId,holdId)
        };
    });
    // makingUSInput.addEventListener("change", async () => {
    //     const userId = document.querySelector('#userNum').value;  
    //     let holdId = await commForDESTUserHolds(userId);
    //     // reloadFromUserChange(userId, holdId);
    // });

  makingUserSim.append(makingUSLabel, makingUSInput);
  document.body.appendChild(makingUserSim);
}

// const populateHoldsDrop = () => {
//   const currentUser = document.querySelector('#userNum');

// }

/* POST DOM LOAD EXEC */
document.addEventListener("DOMContentLoaded", () => {
    initUserSim();
});


/* html reference
<div id="userSimControl">
<label for="userNum"></label>
<input type="text" id="userNum" name="userNum" value="1" />
</div>
*/
