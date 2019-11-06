/*
Server Users Route | HOLDING Web App
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


/* ROUTES */
router.get("/", middleWare);


module.exports = router;
