/*
Server Posts Route | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Mauge, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;


/* MODULE INITS */
const express = require('express');
    const router = express.Router();
    router.use(express.json());
    router.use(express.urlencoded({extended: false}));
// Database 
const db = require('../db.js');


/* MIDDLEWARE */
const middleWare = (req, res, next) => {
  res.json({
    status: "success/fail",
    message: "<description>",
    payload: "<data object goes here>"
  });
}


/* ROUTES */
router.get('/', middleWare);


module.exports = router;
