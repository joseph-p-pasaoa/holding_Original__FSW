/*
Site-Wide Header & Table of Contents Builder JS | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


const insertFill = () => {
  const fill = `
      <div id="header">
         <img id="logo" src="../assets/images/logo-191107.png" alt="Holding Logo" />
         <div id="right-console">
            <div id="cornerNav">
               <a href="#">Me</a>
               <a href="#">Events</a>
            </div>
            <div>
               <input type="text" id="search" name="search" placeholder="Search" />
            </div>
         </div>
      </div><!-- end header -->

      <div id="marquee">A Family Social Media!</div>

      <div id="left-body">
         <ul id="toc">
            <li><a href="./html/posts.html" id="tocPosts">Posts</a></li>
            <li><a href="./html/albums.html" id="tocAlbums">Albums</a></li>
            <li><a href="./html/users.html" id="tocPosts">Users</a></li>
         </ul>
         <div id="section-actions"></div>
      </div>
  `;
document.querySelector('#base-grid').innerHTML = fill;
}

const setActive = () => {
  let whereAreWe = null;
  if (window.location.href.includes("posts.html")) {
    whereAreWe = document.querySelector('#tocPosts');
  }
  if (window.location.href.includes("albums.html")) {
    whereAreWe = document.querySelector('#tocAlbums');
  }
  if (window.location.href.includes("users.html")) {
    whereAreWe = document.querySelector('#tocUsers');
  }
  if (whereAreWe) {
    whereAreWe.className += ' current';
    whereAreWe.href = 'javascript: void(0)';
    // whereAreWe.parentElement.style.display = 'none'; // maybe used in future
  }
}

insertFill();
setActive();
