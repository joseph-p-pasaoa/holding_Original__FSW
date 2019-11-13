/*
User Simulator Script | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


const whoIsUser = () => {
  const urlParams = (new URL(document.location)).searchParams;
  return urlParams.get('user');
}

const reloadFromUserChange = () => {
  const userId = document.querySelector('#userNum').value;
  currentPathname = window.location.pathname;
  if (currentPathname.includes('photos.html')) {
    let urlBuild = window.location.href;
    urlBuild = urlBuild.replace("photos.html", "albums.html");
    urlBuild = urlBuild.replace(window.location.search, `?user=${userId}`);
    window.location.href = urlBuild;
  } else {
    window.location.search = `?user=${userId}`;
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
    });
    makingUSInput.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
          reloadFromUserChange();
        };
    });
    makingUSInput.addEventListener("change", () => {
          reloadFromUserChange();
    });

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
