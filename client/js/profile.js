/*
Profile JS | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;

const serverComm = async (method, urlAdds, body) => {
  const url = `http://localhost:11000/${urlAdds}`;
  try {
    const response = await axios[method](url, body);
    return response.data;
  } catch (err) {
    log("client-side error: ", err);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector('#leftBase').style.background = 'url("file:///Users/joeyp/Code/_repos/holding__WebApp/database/photoDbSim/avatars/zelda%20by%20manreeree.jpg")';
    document.querySelector('#bodyLeftSpot').style.opacity = 0.23;
  }, 100);
});