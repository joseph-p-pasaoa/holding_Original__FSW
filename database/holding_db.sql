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
   (1, 'Pretty Parapet', 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiAh_2ztNblAhXnY98KHcCiBcIQjRx6BAgBEAQ&url=https%3A%2F%2Fhavecamerawilltravel.photoshelter.com%2Fimage%2FI0000RzA3rpTNhMM&psig=AOvVaw24p3pHDzj-hjt7TZXI_wq0&ust=1573157974881749'),
   (2, 'This was a big one', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwir-tfQtNblAhVJj1kKHVb5BYMQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.alibaba.com%2Fproduct-detail%2FUnglazed-terracotta-indian-clay-pot_60356071966.html&psig=AOvVaw10a2velX9feI1HK_51CB_N&ust=1573158064002749'),
   (2, 'This one had a rupee inside!', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj1mtrmtNblAhWuxFkKHeHGAKYQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.chairish.com%2Fproduct%2F888050%2Fantique-clay-painted-handled-pot&psig=AOvVaw10a2velX9feI1HK_51CB_N&ust=1573158064002749'),
   (3, 'I GET SWEATY AFTER WORKING OUT SO MUCH', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjrh5v5tNblAhVDxVkKHf1XA5QQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.polygon.com%2Fe3%2F2019%2F6%2F13%2F18677551%2Fbreath-of-the-wild-sequel-ganondorf-e3-2019-nintendo-mummy-hydrated&psig=AOvVaw0rn7SNL2auuvUklbuxKcXJ&ust=1573158145840964'),
   (3, 'SOMETIMES I JUST LIKE TO HUG', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi657qTtdblAhXBhOAKHVojDVIQjRx6BAgBEAQ&url=https%3A%2F%2Fkotaku.com%2Fwhat-ganon-from-breath-of-the-wild-might-actually-look-1836718493&psig=AOvVaw0rn7SNL2auuvUklbuxKcXJ&ust=1573158145840964'),
   (4, 'Apple', 'https://i.ndtvimg.com/i/2017-10/apple-benefits_620x350_51507721694.jpg'),
   (4, 'Carrot', 'https://www.economist.com/sites/default/files/imagecache/1280-width/20180929_BLP506.jpg'),
   (5, 'my good side', '../../database/photoDbSim/hc-epona-horse-c-ben-blackall.jpg'),
   (5, 'high school portrait', '../../database/photoDbSim/Inspection_b.jpg'),
   (6, 'morvan', '../../database/photoDbSim/9-10-17_Morvan_c.jpeg'),
   (6, 'aonbarr fell asleep!', '../../database/photoDbSim/Aonbarr_sleeping_7-4-14.jpeg'),
   (7, 'link and me epicness of epicness', '../../database/photoDbSim/link and epona.jpg'),
   (7, 'glamour musculature!', '../../database/photoDbSim/Keidranx.jpg'),
   (8, 'Ayo B''s sketch', '../../database/photoDbSim/Ayo B.jpg'),
   (8, 'Rhiannon''s sculpture', '../../database/photoDbSim/Rhiannon(Epona).jpg'),
   (9, 'horse be horsing', '../../database/photoDbSim/epona-breath-of-the-wild-3.jpg'),
   (9, 'showing some skin', '../../database/photoDbSim/Epona-Breath-of-the-Wild.jpg'),
   (9, 'cool horses dont look at splosions', '../../database/photoDbSim/LoZ_wronghorse.jpg'),
   (9, 'wind in my mane!!!', '../../database/photoDbSim/tlozbotw-run.jpg');

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