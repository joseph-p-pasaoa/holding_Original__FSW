/*
Holds JS | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* FILLER FILE - COMPLETELY COPY PASTED from Posts.js */


/* HELPERS */
const log = console.log;


/* POST DOM Loaded Exec */

document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
  document.querySelector("#userSimControl").addEventListener("click", () => {
    loadPosts();
  })

  let addPostForm = document.querySelector("#postAPost");
  addPostForm.addEventListener("submit", newPostFormSubmitted);

  let addCommentForm = document.querySelector("#postAComment");
  addCommentForm.addEventListener("submit", newCommentFormSubmitted);
});
/*           POSTS         */
const newPostFormSubmitted = (event) => {
  event.preventDefault();
  makePosts();
}

const makePosts = async () => {
  const text = document.querySelector("#text").value;
  let currentUser = parseInt(document.querySelector(`#userNum`).value)
  let response = await axios.post(`http://localhost:11000/posts/ `, { poster_id: currentUser, body: text });
  loadPosts();
}

/* Load all posts from database */
const loadPosts = async () => {
  let currentUser = parseInt(document.querySelector("#userNum").value);

  let addCommentForm = document.querySelector("#postAComment");
  addCommentForm.style.display = "none"

  const postList = document.querySelector("#postList");
  postList.innerText = "";

  let response = await axios.get("http://localhost:11000/posts/");
  let posts = response.data.body;

  posts.forEach((post) => {

    /* Create divs for each post */
    let separateDivs = document.createElement("div");
    separateDivs.id = post.post_id;
    separateDivs.className = `sep${post.post_id}`

    /* Create list items for each post */
    let listItem = document.createElement("li");
    listItem.id = post.post_id;
    listItem.className = "post";
    listItem.innerText = `${post.firstname} ${post.lastname}: ${post.body}`;

    /* Create functional delete buttons for each post */
    let deleteBTN = document.createElement("button");
    deleteBTN.id = `post${post.post_id}`;
    deleteBTN.innerText = "delete";

    deleteBTN.onclick = function () {
      if (currentUser === post.poster_id) {
        deletePost(post.post_id, separateDivs)
      }
    }

    /* Only show delete buttons on user's own posts */
    if (currentUser === post.poster_id) {
      listItem.append(deleteBTN);
    }

    /* Append all posts things to the postList ul */
    separateDivs.append(listItem);
    postList.append(separateDivs);

    /* Functions to display likes and comments for each post */
    loadLikes(post.post_id, separateDivs);
    loadComment(post.post_id, separateDivs);
  });
}

/*           COMMENTS         */

const newCommentFormSubmitted = (event) => {
  event.preventDefault();
  makeComments();
}

const makeComments = (post) => {
  let button = document.querySelector("#addCom");
  button.onclick = function (event) {
    event.preventDefault();
    postComment(post)
  }

  const postComment = async (post) => {
    let currentUser = parseInt(document.querySelector("#userNum").value);
    let commentBox = document.querySelector("#cText").value;
    commentBox.id = post;
    const text = commentBox;

    let response = await axios.post(`http://localhost:11000/comments/posts/${post}/${currentUser}`, { commenter_id: currentUser, post_id: post, body: text });
    loadPosts();
  }
}

/* Load all comments from database */

const loadComment = async (post_id, div) => {
  let currentUser = parseInt(document.querySelector("#userNum").value);
  let response = await axios.get(`http://localhost:11000/comments/posts/${post_id}`);
  let marks = response.data.body;

  let commentBtn = document.createElement("button");
  commentBtn.innerText = "Add Comment";
  commentBtn.className = `comm${post_id}`;
  commentBtn.id = post_id;
  div.append(commentBtn);

  commentBtn.onclick = function (event) {
    makeComments(commentBtn.id)
    event.preventDefault()

    let field = document.querySelector("#postAComment");
    if (field.style.display === "none") {
      field.style.display = "block";
    } else {
      field.style.display = "none";
    }

  }

  marks.forEach((mark) => {
    let comment = document.createElement("p");
    comment.id = `comment${mark.comment_id}`;
    comment.innerText = `${mark.firstname} ${mark.lastname}: ${mark.body}`;

    if (post_id === mark.post_id) {
      div.append(comment);
    }

    let deleteBTN = document.createElement("button");
    deleteBTN.id = `comment${mark.comment_id}`;
    deleteBTN.innerText = "delete";

    if (currentUser === mark.commenter_id) {
      comment.append(deleteBTN);
    }

    deleteBTN.onclick = function (event) {
      event.preventDefault()
      let currentUser = parseInt(document.querySelector("#userNum").value);
      if (currentUser === mark.commenter_id) {
        deleteComments(mark.post_id, mark.comment_id);
      }
    }
  })
}

/* Load all likes from database */

const loadLikes = async (post_id, div) => {
  let response = await axios.get(`http://localhost:11000/likes/posts/${post_id}`);
  let likes = response.data.payload;
  let bell = document.createElement("p");
  let buttonDiv = document.createElement("div");
  buttonDiv.id = "btnDiv"

  bell.className = "like";

  bell.id = `like${post_id}`
  div.append(buttonDiv);
  buttonDiv.append(bell);

  let likeBTN = document.createElement("button");
  likeBTN.id = `like_${post_id}`
  likeBTN.innerText = "like";

  buttonDiv.append(likeBTN);
  let names = document.createElement("div");
  names.id = `name_${post_id}`;


  likes.forEach((like) => {
    let name = document.createElement("a");
    name.href = "#";
    name.innerText = `${like.firstname} ${like.lastname}`

    names.append(name)
    buttonDiv.append(names)
  })

  bell.innerText = `Likes: ${likes.length}`;

  likeBTN.classList.toggle("show");
}

/* Delete specified post from database */
const deletePost = async (post, div) => {
  await axios.delete(`http://localhost:11000/posts/${post}`);
  div.parentNode.removeChild(div)
}

/* Delete specified comment from database */
const deleteComments = async (post, comment_id) => {
  let deletedComment = document.querySelector(`#comment${comment_id}`);
  deletedComment.parentNode.removeChild(deletedComment);
  await axios.delete(`http://localhost:11000/comments/${post}/${comment_id}`);
}