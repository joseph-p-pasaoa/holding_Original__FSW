/*
Sitewide Client Modules Script | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


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

const initHoldsDropper = async () => {
  const userId = document.querySelector('#userNum').value;
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
      if (whatHoldAmIIn() === holdObj.hold_id) {
        makingOpt.selected = "selected";
      }
      dropperSelect.appendChild(makingOpt);
    }
    dropperSelect.addEventListener("change", (e) => {
        const holdGoingTo = e.target.options[e.target.selectedIndex].value;
        // var text = e.target.options[e.target.selectedIndex].text; // saved for future display of Hold Name

    });
  }
} 



/* POST DOM LOAD EXEC */
document.addEventListener("DOMContentLoaded", () => {
    initHoldsDropper();
});


