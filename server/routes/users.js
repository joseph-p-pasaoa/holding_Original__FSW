/*
Server Users Route | HOLDING Web App
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
const middleWare = async (req, res, next) => {
  try {
    let response = await db.any("SELECT * FROM users;");
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



const allUserAndHold= async (req, res, next) => {
  try {
    // let response = await db.any("SELECT * FROM users;");
    let response = await db.any(`SELECT users.*, holds.*
    FROM  user_holds
            INNER JOIN users ON  user_holds.holds_user_id = users.user_id 
            INNER JOIN holds ON user_holds.holds_hold_id = holds.hold_id`);
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



const singleUser = async (req, res) => {
  try {
    let selectQuery = `SELECT * FROM users WHERE user_id = $1`
    // let selectQuery = `SELECT users.firstname, users.lastname, users.username AS username, users.age, users.avatar, holds.*
    // FROM  user_holds
    //         INNER JOIN users ON  user_holds.holds_user_id = users.user_id 
    //         INNER JOIN holds ON user_holds.holds_hold_id = holds.hold_id
    // WHERE users.user_id = $1 `
    let user = await db.any(selectQuery, parseInt(req.params.id))

    res.json({
      body: user,
      message: `Here is the user!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}


const singleUserHolds = async (req, res) => {
  try {
    // let selectQuery = `SELECT * FROM users WHERE user_id = $1`
    let selectQuery = `SELECT users.firstname, users.lastname, users.username AS username, users.age, users.avatar, holds.*
    FROM  user_holds
            INNER JOIN users ON  user_holds.holds_user_id = users.user_id 
            INNER JOIN holds ON user_holds.holds_hold_id = holds.hold_id
    WHERE users.user_id = $1 `
    let user = await db.any(selectQuery, parseInt(req.params.id))

    res.json({
      body: user,
      message: `Here is the user!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}

const addUser = async (req, res) => {
  try {
    let insertQuery = `
  INSERT INTO users(username, password, firstname, lastname, age)
  VALUES($1, $2, $3, $4, $5);
  `
    await db.none(insertQuery, [req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.age]);

    res.json({
      body: req.body,
      message: `User registration was successful!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}

const removeUser = async (req, res) => {
  try {

    let deleteQuery = `DELETE FROM users WHERE user_id = $1`
    await db.none(deleteQuery, parseInt(req.params.id));

    res.json({
      message: `User was successfully deleted!`
    });
  } catch (error) {
    res.json({
      message: `There was an error!`
    });
  }
}


/* ROUTES */
router.get("/", middleWare); // get all users
router.get("/holds/",allUserAndHold)//get all users and the holds they are in 

router.get("/:id", singleUser); //get single user
router.get("/holds/:id", singleUserHolds); //get single user based on hold
router.post("/", addUser); // add a user
router.delete("/:id", removeUser); // delete a user



module.exports = router;


