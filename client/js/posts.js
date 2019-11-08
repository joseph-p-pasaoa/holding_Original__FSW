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
    listItem.setAttribute('class', 'post');

    //this is where the test comment made from yesterday
    // let comment = document.createElement("p");
    // comment.setAttribute('class', 'comment')
    // comment.innerText = 'test';

    listItem.innerText = `${post.body}`;
    // listItem.appendChild(comment)

    postList.appendChild(listItem);
  });
}

const getPosts = async () => {
  const text = document.querySelector('#text').value;
  let id = parseInt('1');
  let response = await axios.post(`http://localhost:11000/posts/ `, { poster_id: id, body: text });
  loadPost();
}

const newPostFormSubmitted = (event) => {
  event.preventDefault();
  getPosts();
}

/*I was thinking about making a separete function to get all comments for a specific post but im 
unsure how to implement it in the load posts function*/

const loadComment = async () => {
  let id = Math.floor(Math.random()*(6));
  let response = await axios.get(`http://localhost:11000/comments/posts/${id}`);
  // log(response)
  let marks = response.data.body
  marks.forEach((mark) => {

log(`comment for post ${mark.post_id}: ${mark.body}`)
    // let comment = document.createElement("p");
    // comment.setAttribute('class', 'comment')
    // comment.innerText = `mark.body`;
    
    // }
  })
  // let comment = document.createElement("p");
  //   comment.setAttribute('class', 'comment')
  //   comment.innerText = `response.body`;
}
 loadComment()