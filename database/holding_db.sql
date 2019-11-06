/*
Database Init + Seed | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Mauge, Joseph P. Pasaoa, Kathy Puma
*/


/* CREATE DATABASE */
\c template1
DROP DATABASE IF EXISTS holding_db;
CREATE DATABASE holding_db;
\c holding_db;

CREATE TABLE users (
   user_id SERIAL PRIMARY KEY,
   firstname VARCHAR(36),
   lastname VARCHAR(36),
   age INT
);


/* SEED DATA */
INSERT INTO users (firstname, lastname, age) VALUES
   ('Zelda', 'Alpha', 23),
   ('Link', 'Beta', 19),
   ('Ganon', 'Charlie', 61),
   ('Epona', 'Delta', 36);


/* QUERIES */
SELECT * FROM users;
