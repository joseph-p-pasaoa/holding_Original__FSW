/* Holds JS | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* FILLER FILE - COMPLETELY COPY PASTED from Posts.js */


/* POST DOM Loaded Exec */

document.addEventListener("DOMContentLoaded", () => {
  let addCommentForm = document.querySelector("#postAComment");
  addCommentForm.style.display = "none";
  addCommentForm.addEventListener("submit", newCommentFormSubmitted);
  
  checkHold();

  let addPostForm = document.querySelector("#postAPost");
  addPostForm.addEventListener("submit", newPostFormSubmitted);


});

/*           POSTS         */
const newPostFormSubmitted = (event) => {
  event.preventDefault();
  makePosts();
  let post = document.querySelector("#text");
  post.value = '';
}

const checkHold = async () => {
  let currentUser = parseInt(document.querySelector(`#userNum`).value);
  let hold = document.querySelector("#currentHold").value;

  let group = await axios.get(`http://localhost:11000/holds/${hold}`, { hold_id: hold });
  let holds = group.data.body;

  let uniqueUser = [];
  holds.forEach((hold) => {
    if (!uniqueUser.includes(hold.user_id)) {
      uniqueUser.push(hold.user_id);
    }
    return uniqueUser;
  })
  if (uniqueUser.includes(currentUser)) {
    loadPosts(uniqueUser);
  }
}


const makePosts = async () => {
  const text = document.querySelector("#text").value;
  let currentUser = parseInt(document.querySelector(`#userNum`).value);

await axios.post(`http://localhost:11000/posts/ `, { poster_id: currentUser, body: text });
  loadPosts();
}

/* Load all posts from database */
const loadPosts = async (hold_user) => {
  let currentUser = parseInt(document.querySelector("#userNum").value);

  let addCommentForm = document.querySelector("#postAComment");
  addCommentForm.style.display = "none"

  const postList = document.querySelector("#postList");
  postList.innerText = "";

  let hold = document.querySelector("#currentHold").value;

  let response = await axios.get(`http://localhost:11000/posts/${hold}/`);

  let posts = response.data.body;
  posts.forEach((post) => {
    makeLike(post.post_id);

    /* Create divs for each post */
    let separateDivs = document.createElement("div");
    separateDivs.id = post.post_id;
    separateDivs.className = `sep${post.post_id}`;

    /*Create picture for each post*/
    let avatar = document.createElement("img");
    avatar.src = post.avatar;
    avatar.className = "avatar";
    avatar.width = "50";
    avatar.height = "50";

    /* Create list items for each post */
    let listItem = document.createElement("li");
    listItem.id = post.post_id;
    listItem.className = "post";
    listItem.innerText = `${post.body}`;

    /* JOEY Adds for Design */
    let makingPoster = document.createElement('div');
    makingPoster.className = "posterName";
    makingPoster.innerText = `${post.firstname} ${post.lastname}`;
    let makingAva = document.createElement('img');
    makingAva.src = post.avatar;
    makingAva.className = "avatar";
    makingAva.alt = `${post.firstname} ${post.lastname}`;
    listItem.append(makingAva, makingPoster);

    /* Create functional delete buttons for each post */
    let deleteBTN = document.createElement("button");
    deleteBTN.id = `post${post.post_id}`;
    deleteBTN.className = "delPostBtn";
    deleteBTN.innerText = "delete";

    deleteBTN.onclick = function () {
      if (currentUser === post.user_id) {
        deletePost(post.post_id, separateDivs);
      }
    }

    /* Only show delete buttons on user's own posts */
    if (currentUser === post.user_id) {
      listItem.append(deleteBTN);
    }
    /* Append all posts things to the postList ul */
    postList.append(separateDivs);

    /* Functions to display likes and comments for each post */
    loadLikes(post.post_id, separateDivs, hold_user);
    loadComment(post.post_id, separateDivs);
    separateDivs.prepend(avatar, listItem);
    separateDivs.append(listItem);
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
    postComment(post);
    let ctext = document.querySelector("#cText");
    ctext.value = '';

  }

  const postComment = async (post) => {
    let currentUser = parseInt(document.querySelector("#userNum").value);
    let commentBox = document.querySelector("#cText").value;

    commentBox.id = post;
    const text = commentBox;

  await axios.post(`http://localhost:11000/comments/posts/${post}/${currentUser}`, { commenter_id: currentUser, post_id: post, body: text });
    loadPosts();
  }
}

/* Load all comments from database */
const loadComment = async (post_id, div) => {
  let currentUser = parseInt(document.querySelector("#userNum").value);
  let holdValue = document.querySelector("#currentHold").value;

  let response = await axios.get(`http://localhost:11000/comments/posts/${post_id}`);
  let marks = response.data.body;

  let holder = await axios.get(`http://localhost:11000/holds/${holdValue}`);
  let holderResponse = holder.data.body;

  let commentBtn = document.createElement("button");
  commentBtn.innerText = "Add Comment";
  commentBtn.className = `comm${post_id}`;
  commentBtn.id = post_id;

  commentBtn.onclick = function (event) {
    makeComments(commentBtn.id);
    event.preventDefault();

    let field = document.querySelector("#postAComment");
    if (field.style.display === "none") {
      field.style.display = "block";
    } else {
      field.style.display = "none";
    }
  }

  let holdMembers = {};
  holderResponse.forEach((user) => {
    holdMembers[user.user_id] = true;
  })

  marks.forEach((mark) => {

    if (holdMembers[mark.commenter_id]) {
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
        event.preventDefault();
        let currentUser = parseInt(document.querySelector("#userNum").value);
        if (currentUser === mark.commenter_id) {
          deleteComments(mark.post_id, mark.comment_id);
        }
      }
    }
  })
  div.append(commentBtn);
}

/* Make a Like for all incoming posts */
const makeLike = async (post_id, liker) => {
  await axios.post(`http://localhost:11000/likes/posts/${post_id}/${liker}`, { post_id: post_id, liker_id: liker });
}

/* Load all likes from database */
const loadLikes = async (post_id, div) => {
  let hold = document.querySelector("#currentHold").value;
  let holder = await axios.get(`http://localhost:11000/holds/${hold}`);
  let holderResponse = holder.data.body;

  let response = await axios.get(`http://localhost:11000/likes/posts/${hold}/${post_id}`);
  let likes = response.data.payload;

  let bell = document.createElement("p");
  let buttonDiv = document.createElement("div");
  buttonDiv.id = "btnDiv";

  bell.className = "like";
  bell.id = `like${post_id}`;

  div.append(buttonDiv);
  buttonDiv.append(bell);

  let likeBTN = document.createElement("button");
  likeBTN.id = `like_${post_id}`
  likeBTN.innerText = "like";

  buttonDiv.append(likeBTN);
  let names = document.createElement("div");
  names.id = `name_${post_id}`;

  likeBTN.onclick = function(event) {
    let currentUser = parseInt(document.querySelector("#userNum").value);
    event.preventDefault();
    makeLike(post_id, currentUser )
    loadPosts();
    }

  let holdMembers = {};
  holderResponse.forEach((user) => {
    holdMembers[user.user_id] = true;
  })

  let likeAmount = [];

  likes.forEach((like) => {

    if (holdMembers[like.liker_id]) {
      let name = document.createElement("a");
      name.href = "#";
      name.innerText = `${like.firstname} ${like.lastname}`;
      likeAmount.push(name);
      names.append(name);

      buttonDiv.append(names);
    }
  });

  bell.innerText = `Likes: ${likeAmount.length}`;

  likeBTN.classList.toggle("show");
}

/* Delete specified post from database */
const deletePost = async (post, div) => {
  await axios.delete(`http://localhost:11000/posts/${post}`);
  div.parentNode.removeChild(div);
}

/* Delete specified comment from database */
const deleteComments = async (post, comment_id) => {
  let deletedComment = document.querySelector(`#comment${comment_id}`);
  deletedComment.parentNode.removeChild(deletedComment);
  await axios.delete(`http://localhost:11000/comments/${post}/${comment_id}`);
}