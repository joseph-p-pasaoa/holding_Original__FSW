/*
Server Albums Route | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;


/* MODULE INITS */
const express = require('express');
    const router = express.Router();
// Database 
const db = require('../db.js');

router.get("/:owner_id", async (req, res) => {
  try {
    let ownerId = parseInt(req.params.owner_id);
    let getQuery = `
      SELECT creator_id AS user_id
        , albums.album_id
        , albums.title AS album_title
        , photos.photo_url AS photo_url
      FROM albums FULL OUTER JOIN photos ON (albums.album_id = photos.album_id)
      WHERE creator_id = $1
      ORDER BY albums.album_id DESC;
    `;
    let getAllAlbums = await db.any(getQuery, ownerId)
    res.json({
      payload: getAllAlbums,
      message: "Avast! Albums off the starboard side!"
    })
  } catch (error) {
    res.json({
      message: "Oops! All Errors!"
    })
  }
})

router.post("/:owner_id", async (req, res) => {
  try {
    let title = req.body.title
    let owner = parseInt(req.params.owner_id)
    let postQuery = `
      INSERT INTO albums (creator_id, title)
      VALUES($1, $2)
    `
    let newAlbum = await db.none(postQuery, [owner, title])
    res.json({
      payload: `New Album: ${title} - From: ${owner}`,
      message: "Set sail on a new Album Adventure!"
    })
  } catch (error) {
    res.json({
      message: "Oops! All Errors!"
    })
  }
})


module.exports = router;
