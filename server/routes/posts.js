/*
Server Posts Route | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;


/* MODULE INITS */
const express = require('express');
const router = express.Router();
// Database 
const db = require('../db.js');


/* MIDDLEWARE */
const allPosts = async (req, res) => {
  try {
    let selectQuery = `SELECT users.user_id, users.firstname, users.lastname, holds.name, posts.body, posts.post_id 
    FROM users INNER JOIN user_holds ON users.user_id = user_holds.holds_user_id 
    INNER JOIN holds ON user_holds.holds_hold_id = holds.hold_id 
    INNER JOIN posts ON posts.poster_id = users.user_id WHERE holds.hold_id = $1 ORDER BY posts.post_id DESC;`

    let response = await db.any(selectQuery, parseInt(req.params.hold));
    res.json({
      status: "success",
      message: req.get('host') + req.originalUrl,
      body: response
    });
  } catch (error) {
    log(error);
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    });
  }
}


const singlePost = async (req, res) => {
  try {
    let selectQuery = `SELECT users.user_id, users.firstname, users.lastname, holds.name, posts.body FROM users 
    INNER JOIN user_holds ON users.user_id = user_holds.holds_user_id 
    INNER JOIN holds ON user_holds.holds_hold_id = holds.hold_id 
    INNER JOIN posts ON posts.poster_id = users.user_id 
    WHERE holds.hold_id = $1 AND posts.post_id = $2;`
    let post = await db.any(selectQuery, [parseInt(req.params.hold), parseInt(req.params.id)]);

    res.json({
      body: {
        body: body,
        poster_id: id,
        hold_id: hold
      },
      message: `Here is the post!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}

const addPost = async (req, res) => {
  try {
    let insertQuery = `
  INSERT INTO posts(poster_id, body)
  VALUES($1, $2)
  `
    await db.none(insertQuery, [req.body.poster_id, req.body.body]);

    res.json({
      body: req.body,
      message: `Post was successfully added!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}

const updatePost = async (req, res) => {
  try {
    let updateQuery = `UPDATE posts SET body = $1 WHERE post_id = $2`;
    let update = await db.none(updateQuery, [req.body.body, req.params.id]);

    res.json({
      message: `post was updated!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}

const removePost = async (req, res) => {
  try {
    let deleteQuery = `DELETE FROM posts WHERE post_id = $1`;
    await db.none(deleteQuery, parseInt(req.params.id));
    res.json({
      message: `Post was successfully deleted!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}



/* ROUTES */
router.get("/:hold", allPosts);
router.get("/:hold/:id", singlePost);
router.post("/", addPost);
router.patch("/:id", updatePost);
router.delete("/:id", removePost);


module.exports = router;




