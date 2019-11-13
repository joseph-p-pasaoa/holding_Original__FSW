/*
Sitewide Client Modules Script | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/
const temp = `<h3>The Blue Boys</h3>Blue is the best! The world’s most favorite color is blue. According to a YouGov poll, pretty much every country on the planet lists it as such. Plus, it’s delighted and intrigued scientists and artists (see: Picasso’s Blue Period) alike for centuries, and is a number-one choice for everything from house paint to the jeans you’re probably wearing this very minute. Yet it turns out the color is surprisingly hard to come by in nature.`;

const swServerComm = async (method, urlAdds, body) => {
  const url = `http://localhost:11000/${urlAdds}`;
  try {
    const response = await axios[method](url, body);
    return response.data;
  } catch (err) {
    log("client-side error: ", err);
  }
}


/* USERHOLDS DROP DOWN FUNCS */
const whatHoldAmIIn = () => {
  const swUrlParams = (new URL(document.location)).searchParams;
  return Number(swUrlParams.get('hold'));
}

const commForThisUserHolds = async (userId) => {
  return await swServerComm('get', `sw/userholds/${userId}`);
} 

const swReloadFromUserChange = (userId, holdId) => {
  currentPathname = window.location.pathname;
  if (currentPathname.includes('photos.html')) {
    let urlBuild = window.location.href;
    urlBuild = urlBuild.replace("photos.html", "albums.html");
    urlBuild = urlBuild.replace(window.location.search, `?user=${userId}&hold=${holdId}`);
    window.location.href = urlBuild;
  } else {
    window.location.search = `?user=${userId}&hold=${holdId}`;
  }
}

const initHoldsDropper = async () => {
  const userId = document.querySelector('#userNum').value;
  const presentHold = whatHoldAmIIn();
  document.querySelector('#currentHold').value = presentHold;
  const dropperSelect = document.querySelector('#holdsDropper');
  const response = await commForThisUserHolds(userId);
  const dataArr = response.body;
  if (dataArr.length < 1) {
    dropperSelect.style.display = "none";
  } else {
    for (let holdObj of dataArr) {
      let makingOpt = document.createElement('option');
      makingOpt.innerText = holdObj.name;
      makingOpt.value = holdObj.hold_id;
      if (presentHold === holdObj.hold_id) {
        makingOpt.selected = "selected";
        document.querySelector('#marquee').innerHTML = `Welcome <strong>${holdObj.username}</strong> to<br /><em>${holdObj.name}</em>`;
        document.querySelector('#aboutHold').innerHTML = temp; // holdObj.description;
      }
      dropperSelect.appendChild(makingOpt);
    }
    dropperSelect.addEventListener("change", (e) => {
        const holdGoingTo = e.target.options[e.target.selectedIndex].value;
        // var text = e.target.options[e.target.selectedIndex].text; // saved for future display of Hold Name
        swReloadFromUserChange(userId, holdGoingTo);
    });
  }
}

const addCurrentToTOC = () => {
  const userId = document.querySelector('#userNum').value;
  const holdId = document.querySelector('#currentHold').value;
  const tocLinks = document.querySelectorAll('.toc');
  for (let link of tocLinks) {
    if (link.href !== "javascript: void(0)") {
      link.href += `?user=${userId}&hold=${holdId}`;
    }
  }
}



/* POST DOM LOAD EXEC */
document.addEventListener("DOMContentLoaded", () => {
    initHoldsDropper();
    addCurrentToTOC();
});
