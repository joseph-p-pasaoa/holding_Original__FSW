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

const singleUser = async (req, res) => {
  try {
    let selectQuery = `SELECT * FROM users WHERE user_id = $1`
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
  INSERT INTO users(firstname, lastname, age)
  VALUES($1, $2, $3)
  `
    await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age]);

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
router.get("/:id", singleUser); //get single user
router.post("/:id", addUser); // add a user
router.delete("/:id", removeUser); // delete a user



module.exports = router;