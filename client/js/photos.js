document.addEventListener("DOMContentLoaded", () => {
    loadPhotos();
    loadAlbumInfo();
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", addPhoto)
});

const loadAlbumInfo = async () => {
    let params = (new URL(document.location)).searchParams;
    let album = params.get("album");
    let response = await axios.get(`http://localhost:11000/photos/albums/${parseInt(album)}`);
    let albumInfo = response.data.body[0].album_title
    console.log(response)
    let title = document.querySelector("#album-title")
    title.innerText = albumInfo
    // for (let singleAlbum of albumInfo) {
    //     let params = (new URL(document.location)).searchParams;
    //     let album = params.get("album");
    //     if (singleAlbum.album_id === parseInt(album)) {
    //         let title = document.querySelector("#album-title")
    //         title.innerText = singleAlbum.album_title
    //     }
    // }
}

const loadPhotos = async () => {
    let params = (new URL(document.location)).searchParams;
    let album = params.get("album");
    let response = await axios.get(`http://localhost:11000/photos/albums/${parseInt(album)}`);
    let existingPhotos = response.data.body
    if (existingPhotos) {
        for (let photo of existingPhotos) {
            let mainDiv = document.querySelector("#photo-container")
            let newDiv = document.createElement("div")
            newDiv.id = photo.photo_id
            newDiv.className = "picture-frame"
            let newPic = document.createElement("img")
            newPic.src = photo.photo_url
            newPic.className = "user-photo"
            let picTitle = document.createElement("p")
            picTitle.innerText = photo.photo_title
            let deleteBtn = document.createElement("button")
            deleteBtn.innerText = "DELETE"
            deleteBtn.className = "button"
            newDiv.append(picTitle, newPic, deleteBtn)
            mainDiv.append(newDiv)
            deleteBtn.addEventListener("click", () => {
                deletePhoto(newDiv.id);
            }) 
        }
    } else {
        let mainDiv = document.querySelector("#photo-container")
        let alert = document.createElement("p")
        alert.innerText = "Album empty! Please add a photo to this album by using the input above!"
        mainDiv.append(alert)
    }
}

const deletePhoto = async (pic_id) => {
    let response = await axios.delete(`http://localhost:11000/photos/${pic_id}`)
    window.location.reload();
}

const addPhoto = async (event) => {
    event.preventDefault()
    let params = (new URL(document.location)).searchParams;
    let album = params.get("album");
    let userTitle = document.querySelector("#user-title").value
    let userUrl = document.querySelector("#user-url").value
    if (!userTitle || !userUrl) {
        let alert = document.querySelector("#alert1")
        alert.innerText = "** PLEASE ENTER URL **"
    } else {
        let response = await axios.post(`http://localhost:11000/photos/albums/${parseInt(album)}`, {
            album_id: album,
            title: userTitle,
            photo_url: userUrl
        });
        window.location.reload();
    }
}
