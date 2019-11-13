/*
SiteWide Modules Route | HOLDING Web App
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
const getHoldsWNames = async (req, res, next) => {
  try {
    if (!req.params.user_id) {
      res.json({
          status: "fail",
          message: "no user specified"
      });
    } else {
      const userId = req.params.user_id;
      const getQuery = `
        SELECT hold_id
          , name
        FROM user_holds
        JOIN holds ON (user_holds.holds_hold_id = holds.hold_id)
        WHERE holds_user_id = $1;
      `;
      let response = await db.any(getQuery, userId);
      res.json({
        status: "success",
        message: "user's hold retrieved",
        body: response
      });
    }
  } catch (error) {
    commError(req, res, error, 'getHoldsWNames');
  }
}

const customMiddle = async (req, res) => {
  try {
    let response = await db.any("SELECT * FROM holds;");
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


/* ROUTES */
router.get("/user/:user_id", getHoldsWNames);


module.exports = router;
