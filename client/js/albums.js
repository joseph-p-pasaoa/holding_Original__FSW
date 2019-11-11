/*
Albums JS | HOLDING Web App
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

const grabAllAlbums = async () => {
  const currentUser = 4; // document.querySelector('#userNum').value;
  const response = await serverComm("get", `albums/${currentUser}`);
  return response.payload;
}

const buildAlbumCards = (dataArray) => {
    log(dataArray);
    let albumTracker = {};
    for (let photoObj of dataArray) {
      if (!albumTracker[photoObj.album_id]) {
        let makingCard = document.createElement('div');
          makingCard.className = 'album-card hover-fade';
        let makingA = document.createElement('a');
          makingA.href = `./photos.html?album=${photoObj.album_id}`;
        let makingImg = document.createElement('img');
          makingImg.src = photoObj.photo_url;
          makingImg.alt = photoObj.album_title;
          makingImg.className = "a_cover";
        let makingP = document.createElement('p');
          makingP.innerText = photoObj.album_title;
        
        const stage = document.querySelector('#albumsStage');
        makingA.append(makingImg, makingP);
        makingCard.appendChild(makingA);
        stage.appendChild(makingCard);

        albumTracker[photoObj.album_id] = true;
      }
    }
}


/* POST DOM Loaded Exec */
document.addEventListener("DOMContentLoaded", async () => {
    let albumsArray = await grabAllAlbums();
    buildAlbumCards(albumsArray);
});