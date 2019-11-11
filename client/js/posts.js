/*
Landing Page JS | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;




/* POST DOM Loaded Exec */
document.addEventListener("DOMContentLoaded", () => {
  log('js file connected!');
  let addPostForm = document.querySelector('#postAPost');
  addPostForm.addEventListener('submit', newPostFormSubmitted);
  loadPost();
});



const loadPost = async () => {
  const postList = document.querySelector('#postList');
  postList.innerText = '';
  let response = await axios.get(`http://localhost:11000/posts/`);
  let posts = response.data.body;
  posts.forEach((post) => {

    let listItem = document.createElement("li");
    listItem.id = `_${post.post_id}`;
    listItem.className = `post`;
    listItem.innerText = post.body;
    postList.appendChild(listItem);

    loadLikes(post.post_id);
    loadComment(post.post_id);



  });
}

const getPosts = async () => {
  const text = document.querySelector('#text').value;
  let id = parseInt('1'); //change this to accept value from Joey's Sim
  let response = await axios.post(`http://localhost:11000/posts/ `, { poster_id: id, body: text });
  loadPost();
}

const newPostFormSubmitted = (event) => {
  event.preventDefault();
  getPosts();
}


const loadComment = async (id) => {
  let response = await axios.get(`http://localhost:11000/comments/posts/${id}`);
  let marks = response.data.body;

  marks.forEach((mark) => {

    let comment = document.createElement("p");
    comment.className = `comment`;
    comment.innerText = mark.body;
    let post = document.querySelector(`#_${id}`)
    if (id === mark.post_id) {
      post.append(comment);
    }
  })
}

const loadLikes = async (id) => {
  let response = await axios.get(`http://localhost:11000/likes/posts/${id}`);
  let likes = response.data.payload;
  let num = 0;

  let bell = document.createElement(`p`);
  bell.className = `like`;
  bell.id = `like${id}`
  let post = document.querySelector(`#_${id}`)
  bell.innerText = likes.length;
  if (id === id) {
    if (likes.length > 0) {
      post.append(bell);
    }
  }
}