/*
Server Photos Route | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* MODULE INITS */
const express = require('express');
    const router = express.Router();
// Database 
const db = require('../db.js');


/* HELPERS */
const log = console.log;

const commError = (req, res, err, fxName) => { // handles all catch errors communicating with database
  log(`${fxName}: ${err}`);
  res.status(500).json({
      status: "fail",
      message: "error: problem communicating with server. please try again later"
  });
}


/* MIDDLEWARE */
const getAlbumPhotos = async (req, res, next) => {
  try {
    const albumId = parseInt(req.params.album_id.trim());
    const getQuery = `
      SELECT * 
      FROM photos
      FULL OUTER JOIN albums ON photos.album_id = albums.album_id 
      WHERE albums.album_id = $1
    `;
    // const getQuery = `
    //   SELECT * 
    //   FROM photos
    //   INNER JOIN albums ON photos.album_id = albums.album_id 
    //   WHERE photos.album_id = $1
    // `;
    let response = await db.any(getQuery, albumId);
    if (response.length < 1) {
      res.json({
          status: "fail",
          message: "no album found"
      });
    } else if (response.length === 1 && !response[0].photo_url) {
      res.json({
          status: "success",
          message: "empty album retrieved",
          body: response
      });
    } else {
      res.json({
          status: "success",
          message: "photos retrieved",
          body: response
      });
    }
  } catch (error) {
    commError(req, res, error, 'getAlbumPhotos');
  }
}

const checkInputs = (req, res, next) => {
  let problems = [];
  if (isNaN(req.params.album_id) || req.params.album_id < 1) {
    problems.push("album_id is invalid");
  }
  if (!req.body.title || req.body.title.trim().length > 140) {
    problems.push("title is missing or too long (140 chars max)");
  }
  if (!req.body.photo_url) {
    problems.push("photo_url is missing");
  }
  if (problems[0]) {
    problems = problems.map(el => el.toUpperCase());
    if (problems.length > 1) {
      problems[problems.length - 1] = "and " + problems[problems.length - 1];
    }
    problems.length > 2
      ? problems = problems.join(', ')
      : problems = problems.join(' ');
    res.json({
        status: "fail",
        message: `error: ${problems}. please check your inputs and re-submit.`,
    });
  } else {
    next();
  }
}

const addPhotoToAlbum = async (req, res, next) => {
  try {
    const albumId = parseInt(req.params.album_id.trim());
    const title = req.body.title.trim();
    const photo_url = req.body.photo_url.trim();
    let insertQuery = `
      INSERT INTO photos (album_id, title, photo_url) VALUES
          ($1, $2, $3);
    `;
    await db.none(insertQuery, [albumId, title, photo_url]);
    res.json({
        status: "success",
        message: "photo added to album"
    });
  } catch (error) {
    commError(req, res, error, 'addPhotoToAlbum');
  }
}

const deletePhoto = async (req, res, next) => {
  try {
    const photoId = parseInt(req.params.photo_id);
    const deleteQuery = `
          DELETE FROM photos 
          WHERE photo_id = $1 
          RETURNING 1
    `; // above psql query returns {count: x} where x is a STRING number of how many rows affected by DELETE

    let response = await db.one(deleteQuery, photoId);
    if (Number(response.count) === 0) {
      res.json({
          status: "success",
          message: "target photo not found. nothing deleted"
      });
    } else {
      res.json({
          status: "success",
          message: "photo has been deleted"
      });
    }
  } catch (error) {
    commError(req, res, error, 'deletePhoto');
  }
}


/* ROUTES */
router.get("/albums/:album_id", getAlbumPhotos); // gets all photos for a single album
router.post("/albums/:album_id", checkInputs, addPhotoToAlbum); // add single photo to album
router.delete("/:photo_id", deletePhoto); // delete single picture from album


module.exports = router;

// SELECT * FROM albums FULL OUTER JOIN photos ON photos.album_id = albums.album_id WHERE photos.album_id = 10;