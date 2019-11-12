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
const commForThisUserHolds = async (userId) => {
  return await swServerComm('get', `sw/userholds/${userId}`);
} 

const initHoldsDropper = async () => {
  const userId = document.querySelector('#userNum').value;
  const dropperSelect = document.querySelector('holdsDropper');
  let response = await commForThisUserHolds(userId);
  console.log(response);
} 



/* POST DOM LOAD EXEC */
document.addEventListener("DOMContentLoaded", () => {
    initHoldsDropper();
});


