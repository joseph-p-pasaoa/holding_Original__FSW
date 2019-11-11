document.addEventListener("DOMContentLoaded", () => {
    loadPhotos();
    const form = document.querySelector("#formy-mcformface")
    form.addEventListener("submit", addPhoto)
});


const loadPhotos = async () => {
    let params = (new URL(document.location)).searchParams;
    let album = params.get("album");
    let response = await axios.get(`http://localhost:11000/photos/albums/${parseInt(album)}`);
    let existingPhotos = response.data.body
    for (let photo of existingPhotos) {
        let mainDiv = document.querySelector("#photo-container")
        let newDiv = document.createElement("div")
        newDiv.id = photo.photo_id
        newDiv.className = "picture-frame"
        let newPic = document.createElement("img")
        newPic.src = photo.photo_url
        newPic.className = "user-photo"
        let picTitle = document.createElement("p")
        picTitle.innerText = photo.title
        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "DELETE"
        deleteBtn.className = "button"
        newDiv.append(picTitle, newPic, deleteBtn)
        mainDiv.append(newDiv)
        deleteBtn.addEventListener("click", () => {
            deletePhoto(newDiv.id);
        }) 
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
