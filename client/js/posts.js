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
  log(posts)
  posts.forEach((post) => {
    let listItem = document.createElement("li");
    listItem.setAttribute('class', 'post');
    let p = document.createElement("p");
    p.setAttribute('class', 'comment')
    p.innerText = 'test';
    listItem.innerText = `${post.body}`;
    listItem.appendChild(p)
    
    postList.appendChild(listItem);
  });
}

const getPosts = async () => {
  const text = document.querySelector('#text').value;
  let id = parseInt('1');
let response = await axios.post(`http://localhost:11000/posts/ `, {poster_id: id, body: text});
loadPost();
}

const newPostFormSubmitted = (event) => {
  event.preventDefault();
getPosts();
}


// const loadComment = async () => {

// }