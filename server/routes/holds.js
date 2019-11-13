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

const holdUsers = async (req, res) => {
  try{
    let selectQuery = `SELECT * FROM users 
    INNER JOIN user_holds ON users.user_id = user_holds.holds_user_id 
    INNER JOIN holds ON user_holds.holds_hold_id = holds.hold_id 
    WHERE holds.hold_id = $1;`

    let response = await db.any(selectQuery, parseInt(req.params.hold_id));
    res.json({
      status: "success",
      message: req.get('host') + req.originalUrl,
      body: response
    });
  }catch (error) {
    log(error);
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    });

  }
}

router.get("/:hold_id", holdUsers)
module.exports = router;