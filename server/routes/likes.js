/*
Server Likes Route | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Mauge, Joseph P. Pasaoa, Kathy Puma
*/

/*
GET /posts/:post_id  - Get all likes for a single post
POST /posts/:post_id  - Add single like
DELETE /:posts_id/:liker_id  - Delete single like
*/


/* HELPERS */
const log = console.log;


/* MODULE INITS */
const express = require('express');
    const router = express.Router();
// Database 
const db = require('../db.js');

router.get("/posts/:post_id", async (req, res) => {
  try {
    let postId = parseInt(req.params.post_id)
    let getQuery =`
    SELECT COUNT(post_id) AS num_of_likes 
    FROM likes 
    WHERE post_id = $1
    `
    let allLikes = await db.any(getQuery, postId)
    res.json({
        payload: allLikes,
        message: "Yo ho, me hearties! Here be all the likes on all the posts! I'm a pirate server!"
    })
} catch (error) {
    res.json({
        message: "Oops! All Errors!"
    })
    console.log(error)
}
})

router.post("/posts/:post_id/:liker_id", async (req, res) => {
  try {
    let postId = parseInt(req.params.post_id)
    let likerId = parseInt(req.params.liker_id)
    let insertQuery = `
    INSERT INTO likes (liker_id, post_id)
    VALUES($1, $2)
    `
    let addLike = await db.none(insertQuery, [likerId, postId])
    res.json({
      payload: req.params,
      message: "Yarrrrrr! Like added!"
    })
  } catch (error) {
    res.json({
      message:"Oops! All Errors!"
    })
    log(error)
  }
})

router.delete("/posts/:post_id/:liker_id", async (req, res) => {
  try {
    let postId = parseInt(req.params.post_id)
    let likerId = parseInt(req.params.liker_id)
    let insertQuery = `
    DELETE FROM likes 
    WHERE liker_id = $1
    AND post_id = $2
    `
    let deleteLike = await db.none(insertQuery, [likerId, postId])
    res.json({
      payload: req.params,
      message: "That like just walked the plank!"
    })
  } catch (error) {
    res.json({
      message:"Oops! All Errors!"
    })
    log(error)
  }
})

module.exports = router;
