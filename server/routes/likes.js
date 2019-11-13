/*
Server Likes Route | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
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

router.get("/posts/:hold_id/:post_id", async (req, res) => {
  try {
    let postId = parseInt(req.params.post_id)
    let getQuery =`
    SELECT DISTINCT (liker_id), post_id FROM likes WHERE post_id IN (SELECT posts.post_id FROM users 
      INNER JOIN user_holds ON users.user_id = user_holds.holds_user_id 
      INNER JOIN holds ON user_holds.holds_hold_id = holds.hold_id 
      INNER JOIN posts ON posts.poster_id = users.user_id 
      WHERE holds.hold_id = $1 AND post_id = $2);`

    let allLikes = await db.any(getQuery, [req.params.hold_id, postId])
    res.json({
        payload: allLikes,
        message: "Yo ho, me hearties! Here be all the likes on all the posts! I'm a pirate server!"
    })
} catch (error) {
    res.json({
        message: "Oops! All Errors!"
    })
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
  }
})

module.exports = router;
