/*
Database Init + Seed | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* CREATE DATABASE */
DROP DATABASE IF EXISTS holding_db;
CREATE DATABASE holding_db;
\c holding_db;

CREATE TABLE users
(
   user_id SERIAL PRIMARY KEY,
   username VARCHAR(16),
   password VARCHAR(36),
   firstname VARCHAR(36),
   lastname VARCHAR(36),
   age INT
);

CREATE TABLE posts
(
   post_id SERIAL PRIMARY KEY,
   poster_id INT REFERENCES users(user_id) ON DELETE CASCADE,
   body TEXT
);

CREATE TABLE comments
(
   comment_id SERIAL PRIMARY KEY,
   commenter_id INT REFERENCES users(user_id) ON DELETE CASCADE,
   post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
   body TEXT
);

CREATE TABLE likes
(
   like_id SERIAL PRIMARY KEY,
   liker_id INT REFERENCES users(user_id) ON DELETE CASCADE,
   post_id INT REFERENCES posts(post_id) ON DELETE CASCADE
);

CREATE TABLE albums
(
   album_id SERIAL PRIMARY KEY,
   creator_id INT REFERENCES users(user_id) ON DELETE CASCADE,
   title VARCHAR(140)
);

CREATE TABLE photos
(
   photo_id SERIAL PRIMARY KEY,
   album_id INT REFERENCES albums(album_id) ON DELETE CASCADE,
   title VARCHAR(140),
   photo_url TEXT
);

/* SEED DATA */
INSERT INTO users
   (username, password, firstname, lastname, age)
VALUES
   ('notsheik', '*tLoZ@14', 'Zelda', 'Alpha', 23),
   ('ElfWithSword', '321cba', 'Link', 'Beta', 19),
   ('gerudoMaster', '3$trifs', 'Ganon', 'Charlie', 61),
   ('NEIGH', 'nay nay', 'Epona', 'Delta', 36);

INSERT INTO posts
   (poster_id, body)
VALUES(1, 'Stuck in this castle. AGAIN.'),
   (2, 'People say I don''t talk much. I guess they don''t follow me on holDING!'),
   (3, 'JUST ONE MORE PIECE OF THE TRIFORCE, AND I WILL BE UNSTOPPABLE'),
   (3, 'YES I WANT CHICKEN NUGGETS, MOM'),
   (3, 'HOW DO YOU DELETE A DING ON THIS SITE?'),
   (4, 'Apples apples apples. Carrot?');

INSERT INTO comments
   (commenter_id, post_id, body)
VALUES(1, 2, 'I''d like to see you talk my way out of this mess.'),
   (1, 3, 'LOL'),
   (2, 1, 'Well EXCUSE ME, Princess.'),
   (2, 3, 'You''re going down!'),
   (2, 5, 'You press the button that says DELETE USER.'),
   (2, 6, 'Who''s a good horse?! YOU ARE!!'),
   (3, 1, 'HOW DO YOU MAKE A DING PRIVATE? NO ONE READ THIS.'),
   (4, 2, 'Apple?');

INSERT INTO likes
   (liker_id, post_id)
VALUES(1, 4),
   (2, 1),
   (2, 2),
   (2, 3),
   (2, 4),
   (2, 5),
   (2, 6),
   (3, 3),
   (4, 1),
   (4, 2);

INSERT INTO albums
   (creator_id, title)
VALUES(1, 'Castle Pics'),
   (2, 'Pots I''ve smashed'),
   (3, 'DATING PROFILE PICTURES'),
   (4, 'Foodie-isms'),
   (4, 'Profile Photos'),
   (4, 'friends'),
   (4, 'field shots'),
   (4, 'artwork of the most awesome horse eva'),
   (4, 'trip to botw');

INSERT INTO photos
   (album_id, title, photo_url)
VALUES
   (1, 'Pretty Parapet', '../../database/photoDbSim/albums/parapet.jpg'),
   (2, 'This was a big one', '../../database/photoDbSim/albums/clay-pot.jpg'),
   (2, 'This one had a rupee inside!', '../../database/photoDbSim/albums/vintage-clay-pot.jpeg'),
   (3, 'I GET SWEATY AFTER WORKING OUT SO MUCH', '../../database/photoDbSim/albums/hydrated.png'),
   (3, 'SOMETIMES I JUST LIKE TO HUG', '../../database/photoDbSim/albums/hugs.png'),
   (4, 'Apple', '../../database/photoDbSim/albums/apples-in-box.png'),
   (4, 'Carrot', '../../database/photoDbSim/albums/carrots.jpg'),
   (5, 'my good side', '../../database/photoDbSim/albums/hc-epona-horse-c-ben-blackall.jpg'),
   (5, 'high school portrait', '../../database/photoDbSim/albums/Inspection_b.jpg'),
   (6, 'morvan', '../../database/photoDbSim/albums/9-10-17_Morvan_c.jpeg'),
   (6, 'aonbarr fell asleep!', '../../database/photoDbSim/albums/Aonbarr_sleeping_7-4-14.jpeg'),
   (7, 'link and me epicness of epicness', '../../database/photoDbSim/albums/link and epona.jpg'),
   (7, 'glamour musculature!', '../../database/photoDbSim/albums/Keidranx.jpg'),
   (8, 'Ayo B''s sketch', '../../database/photoDbSim/albums/Ayo B.jpg'),
   (8, 'Rhiannon''s sculpture', '../../database/photoDbSim/albums/Rhiannon(Epona).jpg'),
   (9, 'horse be horsing', '../../database/photoDbSim/albums/epona-breath-of-the-wild-3.jpg'),
   (9, 'showing some skin', '../../database/photoDbSim/albums/Epona-Breath-of-the-Wild.jpg'),
   (9, 'cool horses dont look at splosions', '../../database/photoDbSim/albums/LoZ_wronghorse.jpg'),
   (9, 'wind in my mane!!!', '../../database/photoDbSim/albums/tlozbotw-run.jpg');


/* QUERIES */

SELECT *
FROM users;

SELECT *
FROM posts;

SELECT *
FROM comments;

SELECT *
FROM likes;

SELECT *
FROM albums;

SELECT *
FROM photos;