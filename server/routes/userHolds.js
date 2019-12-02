
/* MODULE INITS */
const express = require('express');
const router = express.Router();
// Database 
const db = require('../db.js');




const middleWare = async (req, res, next) => {
  try {
    let response = await db.any("SELECT * FROM user_holds;");
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




const addUserToHold = async (req, res) => {
    try {
      let insertQuery = `
    INSERT INTO user_holds (holds_user_id, holds_hold_id)
    VALUES($1, $2);
    `
      await db.none(insertQuery, [req.body.holds_user_id, req.body.holds_hold_id]);
  
      res.json({
        body: req.body,
        message: `User registration to hold was successful!`
      });
    } catch (error) {
      res.json({
        message: `There was an error!`
      });
    }
  }

  








const removeUser = async (req, res) => {
  try {

    let deleteQuery = `DELETE FROM user_holds WHERE  holds_hold_id = $1  AND holds_user_id = $2 `
    await db.none(deleteQuery, [parseInt(req.params.holds),parseInt(req.params.id)]);

    res.json({
      message: `User in specific hold was successfully deleted!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}


router.get("/", middleWare); // get all users_holds
router.delete("/:holds/:id", removeUser); // delete a user
  router.post("/", addUserToHold); // add a user to the hold

  module.exports = router;