/*
Site-Wide Header & Table of Contents Builder JS | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* THIS RUNS DURING FIRST PASS, ON DOM BUILD */


const buildContent = () => {
  const content = `
      <div id="headerLogo">
          <img id="logo" src="../assets/images/logo/logo-191113-jetVmmist.svg" alt="Holding Logo" />
      </div>
      <div id="headerNav">
          <ul id="toc">
              <li><a href="./holds.html" id="tocHolds" class="toc">Home</a></li>
              <li><a href="./profile.html" id="tocProfile" class="toc">Profile</a></li>
              <li><a href="./users.html" id="tocUsers" class="toc">Search</a></li>
              <li><a href="./albums.html" id="tocAlbums" class="toc">MyAlbums</a></li>
              <li><a href="./about.html" id="tocAboutH" class="toc">About</a></li>
          </ul>
      </div>

      <div id="leftBase">
          <div id="crownShim"></div>
          <div id="crownHolder">
              <form>
                  <label>Move to:
                      <select id="holdsDropper"></select>
                  </label>
                  <input type="hidden" id="currentHold" />
                  </form>
              </div>
              <div id="bodyLeftSpot"></div>
              <div id="bodyAboutHold">
                  <div id="aboutHold"></div>
              </div>
      </div>

      <div id="crownMarquee">
          <div id="marquee"></div>
      </div>


  `;
  document.querySelector('#base-grid').innerHTML = content;
}

const setCurrentTOC = () => {
  let whereAreWe = null;
  if (window.location.href.includes("holds.html")) {
    whereAreWe = document.querySelector('#tocHolds');
  }
  if (window.location.href.includes("profile.html")) {
    whereAreWe = document.querySelector('#tocProfile');
  }
  if (window.location.href.includes("users.html")) {
    whereAreWe = document.querySelector('#tocUsers');
  }
  if (window.location.href.includes("albums.html") || window.location.href.includes("photos.html")) {
    whereAreWe = document.querySelector('#tocAlbums');
  }
  if (window.location.href.includes("about.html")) {
    whereAreWe = document.querySelector('#tocAboutH');
  }
  if (whereAreWe) {
    whereAreWe.className += ' current';
    whereAreWe.href = 'javascript: void(0)';
  }
}

buildContent();
setCurrentTOC();
