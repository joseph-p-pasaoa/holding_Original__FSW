/*
Database Connection File | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


const pgp = require('pg-promise')();
    const connectString = 'postgres://localhost:5432/holding_db';
    const db = pgp(connectString);


module.exports = db;
