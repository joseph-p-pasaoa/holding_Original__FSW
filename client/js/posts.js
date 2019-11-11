/*
Landing Page JS | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;




/* POST DOM Loaded Exec */
document.addEventListener("DOMContentLoaded", () => {
  log('js file connected!');

  document.querySelector('#userSimControl').addEventListener("click", () => {
    log(document.querySelector(`#userNum`).value);
    loadPost() //this will reload every time you delete something or change the user
  })
  let addPostForm = document.querySelector('#postAPost');
  addPostForm.addEventListener('submit', newPostFormSubmitted);

});

const loadPost = async () => {
  const postList = document.querySelector('#postList');
  postList.innerText = '';
  let response = await axios.get(`http://localhost:11000/posts/`);
  let id = parseInt(document.querySelector(`#userNum`).value);

  let posts = response.data.body;
  posts.forEach((post) => {

    let listItem = document.createElement("li");
    listItem.id = `_${post.post_id}`;
    listItem.className = `post`;
    listItem.innerText = `${post.firstname} ${post.lastname}: ${post.body}`;

    let deleteBTN = document.createElement(`button`);
    deleteBTN.id = `post${post.post_id}`;
    deleteBTN.innerText = `delete`;


    deleteBTN.onclick = function () {
      let user = parseInt(document.querySelector(`#userNum`).value);
      if (user === post.poster_id) {
        deletePost(post.post_id)
      }
    }

    if (id === post.poster_id) {
      listItem.append(deleteBTN);
    }

    postList.appendChild(listItem);
    loadLikes(post.post_id, id);
    loadComment(post.post_id);

  });
}

const makePosts = async () => {
  const text = document.querySelector('#text').value;

  let id = parseInt(document.querySelector(`#userNum`).value)
  let response = await axios.post(`http://localhost:11000/posts/ `, { poster_id: id, body: text });
  loadPost();
}

const newPostFormSubmitted = (event) => {
  event.preventDefault();
  makePosts();
}


const loadComment = async (id) => {
  let fakeUser = parseInt(document.querySelector(`#userNum`).value);
  let response = await axios.get(`http://localhost:11000/comments/posts/${id}`);
  let marks = response.data.body;
  marks.forEach((mark) => {
    let comment = document.createElement("p");
    comment.id = `comment${mark.comment_id}`;
    comment.innerText = `${mark.firstname} ${mark.lastname}: ${mark.body}`;
    let post = document.querySelector(`#_${id}`)
    if (id === mark.post_id) {
      post.append(comment);
    }

    let deleteBTN = document.createElement(`button`);
    deleteBTN.id = `comment${mark.comment_id}`;
    deleteBTN.innerText = `delete`;
    if (fakeUser === mark.commenter_id) {
      comment.append(deleteBTN)
    }


    let user = parseInt(document.querySelector(`#userNum`).value);
    deleteBTN.onclick = function (event) {
      event.preventDefault()
      let user = parseInt(document.querySelector(`#userNum`).value);
      if (user === mark.commenter_id) {
        deleteComments(mark.post_id, mark.comment_id)
      }
    }
  })
}



const loadLikes = async (post_id) => {
  let response = await axios.get(`http://localhost:11000/likes/posts/${post_id}`);
  let likes = response.data.payload;
  let bell = document.createElement(`p`);
  let buttonDiv = document.createElement(`div`);
  buttonDiv.id = `div`

  bell.className = `like`;

  bell.id = `like${post_id}`
  let post = document.querySelector(`#_${post_id}`);
  post.append(buttonDiv);
  buttonDiv.append(bell);

  let likeBTN = document.createElement('button');
  likeBTN.id = `like_${post_id}`
  likeBTN.innerText = 'like';

buttonDiv.append(likeBTN);
  let names = document.createElement('div');
  names.id = `name_${post_id}`;
 

  likes.forEach((like) => {
    let name = document.createElement('a');
    name.href = `#`;
    name.innerText = `${like.firstname} ${like.lastname}`

      names.append(name)
      buttonDiv.append(names)
    log(name)
  })

  bell.innerText = `Likes: ${likes.length}`;
  
 likeBTN.classList.toggle('show');
}


const deletePost = async (post) => {
  await axios.delete(`http://localhost:11000/posts/${post}`);
  let deletedPost = document.querySelector(`#_${post}`);
  deletedPost.parentNode.removeChild(deletedPost)
}

const deleteComments = async (post, comment_id) => {
  let deletedComment = document.querySelector(`#comment${comment_id}`);
  console.log(deletedComment)
  deletedComment.parentNode.removeChild(deletedComment);
  await axios.delete(`http://localhost:11000/comments/${post}/${comment_id}`);
}
