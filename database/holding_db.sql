/*
Database Init + Seed | HOLDING Web App
GROUP 3: Douglas MacKrell, Briahana Maugé, Joseph P. Pasaoa, Kathy Puma
*/


/* CREATE DATABASE */
\c template1
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
   ('gerudo master', '3$trifs', 'Ganon', 'Charlie', 61),
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
   (4, 'Apples and Carrots');

INSERT INTO photos
   (album_id, title, photo_url)
VALUES(1, 'Nice drawbridge', ''),
   (1, 'Pretty Parapet', 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiAh_2ztNblAhXnY98KHcCiBcIQjRx6BAgBEAQ&url=https%3A%2F%2Fhavecamerawilltravel.photoshelter.com%2Fimage%2FI0000RzA3rpTNhMM&psig=AOvVaw24p3pHDzj-hjt7TZXI_wq0&ust=1573157974881749'),
   (2, 'This was a big one', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwir-tfQtNblAhVJj1kKHVb5BYMQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.alibaba.com%2Fproduct-detail%2FUnglazed-terracotta-indian-clay-pot_60356071966.html&psig=AOvVaw10a2velX9feI1HK_51CB_N&ust=1573158064002749'),
   (2, 'This one had a rupee inside!', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj1mtrmtNblAhWuxFkKHeHGAKYQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.chairish.com%2Fproduct%2F888050%2Fantique-clay-painted-handled-pot&psig=AOvVaw10a2velX9feI1HK_51CB_N&ust=1573158064002749'),
   (3, 'I GET SWEATY AFTER WORKING OUT SO MUCH', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjrh5v5tNblAhVDxVkKHf1XA5QQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.polygon.com%2Fe3%2F2019%2F6%2F13%2F18677551%2Fbreath-of-the-wild-sequel-ganondorf-e3-2019-nintendo-mummy-hydrated&psig=AOvVaw0rn7SNL2auuvUklbuxKcXJ&ust=1573158145840964'),
   (3, 'SOMETIMES I JUST LIKE TO HUG', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi657qTtdblAhXBhOAKHVojDVIQjRx6BAgBEAQ&url=https%3A%2F%2Fkotaku.com%2Fwhat-ganon-from-breath-of-the-wild-might-actually-look-1836718493&psig=AOvVaw0rn7SNL2auuvUklbuxKcXJ&ust=1573158145840964'),
   (4, 'Apple', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjd_5_vtdblAhXhhOAKHd4ZAuEQjRx6BAgBEAQ&url=https%3A%2F%2Ffood.ndtv.com%2Ffood-drinks%2Fapple-fruit-benefits-8-incredible-health-benefits-of-apple-that-you-may-not-have-known-1761603&psig=AOvVaw2HjZwZOV9BMdgtONEY4MKX&ust=1573158391905454'),
   (4, 'Carrot', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiEy5aIttblAhVOq1kKHRY8CpwQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.economist.com%2Fthe-economist-explains%2F2018%2F09%2F26%2Fhow-did-carrots-become-orange&psig=AOvVaw0vCohKjPbPM7ThJgJ5nykx&ust=1573158446476538');

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