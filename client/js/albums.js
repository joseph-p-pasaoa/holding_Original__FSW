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

const clearStage = () => {
  const stage = document.querySelector('#albumsStage');
  while (stage.firstChild) {
    stage.removeChild(stage.lastChild);
  }
}

const grabAllAlbums = async () => {
  const currentUser = document.querySelector('#userNum').value;
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
          photoObj.photo_url
            ? makingImg.src = photoObj.photo_url
            : makingImg.src = "../assets/images/emptyAlbumPh.gif";
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

const newAlbum = async () => {
  const userId = document.querySelector('#userNum').value;
  const body = {
    title: document.querySelector('#titleBox').value
  };
  await serverComm("post", `albums/${userId}`, body);
}


/* POST DOM Loaded Exec */
document.addEventListener("DOMContentLoaded", async () => {
    buildAlbumCards(await grabAllAlbums());

    document.querySelector('#createAlbum').addEventListener("click", async () => {
        await newAlbum();
        // window.location.href = ""; // send to photos page of new album instead?
        clearStage();
        buildAlbumCards(await grabAllAlbums());
    });
});