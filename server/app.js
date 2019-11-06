/*
Server Root File | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Mauge, Joseph P. Pasaoa, Kathy Puma
*/


/* HELPERS */
const log = console.log;


/* MODULE INITS */
const express = require('express');
    const app = express();
    const port = 11000;
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
const cors = require('cors');
    app.use(cors());


/* SERVER INIT */
app.listen(port, () => {
    log(`Holding Server is now listening on port ${port}. Carpe diem.`);
});


/* MAIN ROUTING */
// Imports
const usersRT = require('./routes/users.js');
const postsRT = require('./routes/posts.js');
const commentsRT = require('./routes/comments.js');
const likesRT = require('./routes/likes.js');
const albumsRT = require('./routes/albums.js');
const photosRT = require('./routes/photos.js');
const eventsRT = require('./routes/events.js');
// Connects
app.use('/users', usersRT);
app.use('/posts', postsRT);
app.use('/comments', commentsRT);
app.use('/likes', likesRT);
app.use('/albums', albumsRT);
app.use('/photos', photosRT);
app.use('/events', eventsRT);


// NO-ROUTE CATCH
app.use("*", (req, res) => {
    res.status(404).send('Error: no such route found on Holding server. Try again.');
});
