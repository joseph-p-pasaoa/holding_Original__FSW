

/*
Server Comments Route | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Mauge, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;


/* MODULE INITS */
const express = require('express');
    const router = express.Router();
// Database 
const db = require('../db.js');


/* MIDDLEWARE */
const middleWare = async (req, res, next) => {
  try {
    let response = await db.any("SELECT * FROM comments;");
    res.json({
        status: "success",
        message: "got all the comments",
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



const getAllCommentsFromASinglePost =  async(req, res) => {

  try {
    let post_id = req.params.post_id



    let insertQuery =`
    SELECT body FROM comments 
    WHERE post_id = $1`
    let response =   await db.any(insertQuery,post_id) 


    // let response = await db.any(`SELECT * FROM comments WHERE post_id = ${post_id}`);
    // let response = await db.any(`SELECT body FROM comments WHERE post_id = ${post_id}`);
    res.json({
        status: "success",
        message: `got all the comments from ${post_id}`,
        body: response
    });
  } catch (error) {
      res.status(500)
      res.json({
          message: "Error. Something went wrong"
      })
  }
};




const addASingleComment =  async(req, res) => {
  try {
    
    let insertQuery = `
    INSERT INTO comments(commenter_id, post_id,body)
        VALUES($1, $2, $3)`

      await db.none(insertQuery,[req.params.commenter_id, req.body.post_id, req.body.body]) 

    res.json({
        status: "success",
        message: `Altered Sucess`,
        body: req.body
    });
  } catch (error) {
      res.status(500)
      res.json({
          message: "Error. Something went wrong"
      })
  }
};




const editASinglePost = async(req, res) => {
  try {
    let post_id = parseInt(req.params.post_id)
    let comment_id = parseInt(req.params.comment_id)

    let insertQuery = `
    UPDATE comments 
    SET body = $1
    WHERE post_id= $2 AND comment_id = $3`
      await db.none(insertQuery,[req.body.body,post_id, comment_id ]) 

    res.json({
        status: "success",
        message: `Altered Sucess`,
        body: req.body
    });
  } catch (error) {
      res.status(500)
      res.json({
          message: "Error. Something went wrong"
          
      })
  }
};



const deleteSingleComment=  async(req, res) => {
  try {
    let post_id = parseInt(req.params.post_id)
    let comment_id = parseInt(req.params.comment_id)

      let insertQuery = `
      DELETE FROM comments 
      WHERE post_id= $1 AND comment_id = $2`
      await db.none(insertQuery,[post_id, comment_id ]) 

    res.json({
        status: "success",
        message: `Delete Sucess`,
        body: req.body
    });
  } catch (error) {
      res.status(500)
      res.json({
          message: "Error. Something went wrong"
      })
  }
};

/* ROUTES */
router.get("/", middleWare);
router.get("/posts/:post_id", getAllCommentsFromASinglePost);
router.post('/posts/:post_id/:commenter_id',addASingleComment);
router.patch('/:post_id/:comment_id', editASinglePost);
router.delete('/:post_id/:comment_id', deleteSingleComment);


module.exports = router;
