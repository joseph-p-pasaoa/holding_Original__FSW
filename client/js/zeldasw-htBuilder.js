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
                <li><a href="./profile.html" id="tocProfile" class="toc">Me</a></li>
                <li><a href="./users.html" id="tocUsers" class="toc">Others</a></li>
                <li><a href="./albums.html" id="tocAlbums" class="toc">My Photos</a></li>
                <li><a href="./about.html" id="tocAboutH" class="toc">About holDING</a></li>
            </ul>
        </div>
  
        <div id="leftBase">
            <div id="crownShim"></div>
            <div id="crownHolder">
                <form>
                    <select id="holdsDropper">The Blue Boys</select>
                    <input type="hidden" id="currentHold" />
                </form>
            </div>
            <div id="bodyLeftSpot"></div>
            <div id="bodyAboutHold">
            <h3 id= "blueboys">The Blue Boys<h3>
                <div id="aboutHold">
                
Blue is the best! The world’s most favorite color is blue. According to a YouGov poll, pretty much every country on the planet lists it as such. Plus, it’s delighted and intrigued scientists and artists (see: Picasso’s Blue Period) alike for centuries, and is a number-one choice for everything from house paint to the jeans you’re probably wearing this very minute. Yet it turns out the color is surprisingly hard to come by in nature.</div>


            </div>
        </div>
  
        <div id="crownMarquee">
            <div id="marquee">Welcome notsheik to
            The Blue Boys</div>
        </div>
  
  
  
        <!-- input type="text" id="search" name="search" placeholder="Search" / -->
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