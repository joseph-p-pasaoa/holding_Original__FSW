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
   age INT,
   avatar TEXT
);

CREATE TABLE posts
(
   post_id SERIAL PRIMARY KEY,
   poster_id INT REFERENCES users(user_id) ON DELETE CASCADE,
   body TEXT,
   time_post text DEFAULT NOW()
);

CREATE TABLE comments
(
   comment_id SERIAL PRIMARY KEY,
   commenter_id INT REFERENCES users(user_id) ON DELETE CASCADE,
   post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
   body TEXT,
   time_comment text DEFAULT NOW()
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
   album_title VARCHAR(140)
);

CREATE TABLE photos
(
   photo_id SERIAL PRIMARY KEY,
   album_id INT REFERENCES albums(album_id) ON DELETE CASCADE,
   photo_title VARCHAR(140),
   photo_url TEXT
);

CREATE TABLE holds
(
   hold_id SERIAL PRIMARY KEY,
   password VARCHAR(36),
   description VARCHAR(500),
   max_users INT,
   name VARCHAR(36)
);

CREATE TABLE user_holds
(
   holds_user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
   holds_hold_id INT REFERENCES holds(hold_id) ON DELETE CASCADE
);

/* SEED DATA */
INSERT INTO users
   (username, password, firstname, lastname, age, avatar)
VALUES
   ('notsheik', 'Wisdom', 'Zelda', 'Queensworth', 23, '../../database/photoDbSim/avatars/zelda by manreeree.jpg'),
   ('ElfWithSword', 'Courage', 'Link', 'Masterswordsman', 19, '../../database/photoDbSim/avatars/Link Avatar.jpg'),
   ('gerudoMaster', 'Power', 'Ganon', 'Dorf', 35, '../../database/photoDbSim/avatars/Ganon-Avatar1.jpeg'),
   ('NEIGH', 'nay nay', 'Epona', 'Horse', 36, '../../database/photoDbSim/avatars/Epona-Avatar.png'),
   ('Super Mario', 'MamaMia','Mario', 'Mario', 31, '../../database/photoDbSim/avatars/Mario-Avatar.jpg'),
   ('Player 2', 'PlAyEr1', 'Luigi', 'Mario', 25, '../../database/photoDbSim/avatars/luigi-circle.jpg'),
   ('Toadstool', 'password', 'Princess', 'Peach', 21, '../../database/photoDbSim/avatars/Peach-Avatar.jpg'),
   ('TheVeryBest', 'LkeNo1EvrWuz', 'Ash', 'Ketchum', 14, '../../database/photoDbSim/avatars/Ash-Avatar.png'),
   ('StarGirl', 'TokaPeePee', 'Misty', 'Mysterious', 15, '../../database/photoDbSim/avatars/Misty_Burnt_Bike.png'),
   ('RockMaster', 'J33lyD0nut', 'Brock', 'Sampson', 19, '../../database/photoDbSim/avatars/brockcharacter.jpg');

INSERT INTO posts
   (poster_id, body)
VALUES
   (2, 'People say I don''t talk much. I guess they don''t follow me on holDING!'),
   (1, 'Stuck in this castle. AGAIN.'),
   (3, 'Just one more piece of the triforce, and I will be unstoppable'),
   (4, 'Apples apples apples. Carrot?'),
   (5, 'Sometimes I wish the princess was in THIS castle.'),
   (5, 'FUN FACT: Fire Flowers taste like Mint!'),
   (6, 'Haunted Mansion? It''s free real estate.'),
   (6, 'It''s easy being green.'),
   (3, 'How do you delete a ding on this site?'),
   (7, 'Who wants cake?!'),
   (8, 'Only 732 more Pokemon to catch!'),
   (8, 'On my way to the Gym!'),
   (9, 'Bike 4 Sale, slightly used.'),
   (10, 'My DMs are open, Nurse Joy.'),
   (3, 'Yes, I want chicken nuggets, mom'),
   (10, 'Officer Jenny, U up?');

INSERT INTO comments
   (commenter_id, post_id, body)
VALUES(1, 2, 'I''d like to see you talk my way out of this mess.'),
   (1, 3, 'LOL'),
   (2, 1, 'Well EXCUSE ME, Princess.'),
   (2, 3, 'You''re going down!'),
   (2, 5, 'You press the button that says DELETE USER.'),
   (2, 6, 'Who''s a good horse?! YOU ARE!!'),
   (3, 1, 'HOW DO YOU MAKE A DING PRIVATE? NO ONE READ THIS.'),
   (4, 2, 'Apple?'),
   (5, 11, 'Me! Mario! Let''s-a GO!'),
   (5, 1, 'I can-a help with that.'),
   (5, 9, 'You need to stop. This-a is an intervention.'),
   (6, 8, 'MARIO! Stop trying to trick people into eating those things!'),
   (6, 14, 'If it''s still for sale, I''m interested!'),
   (7, 5, 'You seem trustworthy, so just stop by my castle and I''ll show you how. The gate password is 1234.'),
   (7, 9, 'Ghosts are too scary for me!'),
   (8, 3, 'I suggest getting a jacket you can pin them to. That''s where I keep my Gym Badges!'),
   (8, 14, 'I said I was sorry!'),
   (8, 16, 'Brock, you''re posting in the wrong HOLD.'),
   (9, 6, 'What a pretty horse!'),
   (9, 15, 'Ew, Brock. Gross.'),
   (10, 1, 'WOW! YOU ARE SO BEAUTIFUL, HAS ANYONE EVER TOLD YOU THAT?'),
   (10, 7, 'They never are, buddy. They never are.');

INSERT INTO likes
   (liker_id, post_id)
VALUES(1, 4),
   (2, 1),
   (2, 2),
   (2, 3),
   (2, 4),
   (2, 5),
   (2, 6),
   (2, 7),
   (2, 8),
   (2, 9),
   (2, 10),
   (2, 11),
   (2, 12),
   (2, 13),
   (2, 14),
   (2, 15),
   (2, 16),
   (3, 3),
   (4, 1),
   (4, 2),
   (5, 1),
   (5, 9),
   (5, 10),
   (6, 2),
   (6, 6),
   (6, 7),
   (6, 8),
   (6, 11),
   (6, 14),
   (7, 1),
   (7, 3),
   (7, 4),
   (7, 5),
   (7, 7),
   (7, 8),
   (7, 15),
   (7, 16),
   (8, 6),
   (8, 14),
   (8, 15),
   (8, 16),
   (9, 2),
   (9, 6),
   (9, 8),
   (9, 9),
   (9, 12),
   (9, 13),
   (10, 1),
   (10, 11);

INSERT INTO albums
   (creator_id, album_title)
VALUES(1, 'Castle Pics'),
   (2, 'Pots I''ve smashed'),
   (3, 'Selfies'),
   (4, 'Foodie-isms'),
   (4, 'Profile Photos'),
   (3, 'friends'),
   (4, 'field shots'),
   (4, 'artwork of the most awesome horse eva'),
   (4, 'trip to botw'),
   (5, 'Selfies'),
   (5, 'Family'),
   (3, 'Pasta'),
   (6, 'Family'),
   (6, 'Plumbing Mishaps'),
   (6, 'Ghosts And Other Dead People I Know'),
   (7, 'Castle Blueprints'),
   (7, 'My Favorite Secret Entrances'),
   (8, 'Pokemon'),
   (8, 'More Pokemon'),
   (9, 'The Great Lakes'),
   (9, 'Water Dancing'),
   (10, 'Ladies'),
   (10, 'Ladies, Vol 2.');

INSERT INTO photos
   (album_id, photo_title, photo_url)
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
   (9, 'wind in my mane!!!', '../../database/photoDbSim/albums/tlozbotw-run.jpg'),
   (10, 'It''s a ME', 'https://cdn.arstechnica.net/wp-content/uploads/2017/09/mario-collage-800x450.jpg'),
   (10, 'Stop and smell-a the roses', 'https://mario.nintendo.com/assets/img/home/fb-mario-pose_2x.png'),
   (11, 'My Bro!', 'https://nintendosoup.com/wp-content/uploads/2018/10/luigi-super-mario-party.jpg'),
   (11, 'Luigi gets so-a scared', 'https://cdn.wccftech.com/wp-content/uploads/2019/07/WCCFluigismansion31.jpg'),
   (12, 'Ravioli', 'https://www.donnafugata.it/wp-content/uploads/2016/08/ravioli.jpg'),
   (12, 'Lasagna', 'https://www.tasteofhome.com/wp-content/uploads/0001/01/The-Best-Ever-Lasagna_EXPS_THD18_233582_E08_01_2b-696x696.jpg'),
   (13, 'Mario wins the race again', 'https://cdn.vox-cdn.com/thumbor/ItgQB6vbeE99EEUXR83NsU_kbdg=/0x0:2048x2048/1820x1213/filters:focal(861x861:1187x1187):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65327601/mobile_MarioKartTour_screen_07_png_jpgcopy.0.jpg'),
   (13, 'Men at work', 'https://supermariomaker.nintendo.com/assets/img/buy/char-mario-luigi-2x.png'),
   (14, 'Quick Fix', 'https://www.familyhandyman.com/wp-content/uploads/2017/10/Duct-tape-drains.jpg'),
   (14, 'Toad''s Shower', 'https://www.familyhandyman.com/wp-content/uploads/2017/10/Low-Shower.jpg'),
   (15, 'Man at Arms', 'http://images.nintendolife.com/cf1b6818b1948/switch-luigismansion3-e3-artwork-140.large.jpg'),
   (15, 'Sucks to be him', 'http://images.nintendolife.com/fcd959f5c572c/switch-luigismansion3-e3-artwork-137.large.jpg'),
   (16, 'Mushroom Kingdom', 'https://jhmrad.com/wp-content/uploads/real-castle-blueprints-romantic-retreat_29940-670x400.jpg'),
   (16, 'Summer Castle', 'http://www.0onegames.com/images/product_pres/blu43/shot01.jpg'),
   (17, 'Opens right into my bedroom!', 'https://preview.redd.it/ch400mpthcd11.jpg?width=640&crop=smart&auto=webp&s=648d88eb96064fe1056bba3e910847a58bdbc3dc'),
   (17, 'Gets me past the castle guards! ;)', 'https://www.newslinq.com/wp-content/uploads/2017/01/secret-entrance-2.jpg'),
   (18, 'Bulbasaur', 'https://www.thefactsite.com/wp-content/uploads/2018/04/Bulbasaur-facts.jpg'),
   (18, 'Charmander', 'https://cdn.vox-cdn.com/thumbor/Pgdis0zYgwp1PfGrqXbAQzsXayc=/0x0:898x504/1820x1213/filters:focal(378x181:520x323):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/57504397/Screen_Shot_2017_11_07_at_1.39.21_PM.0.png'),
   (19, 'Squirtle', 'https://cdn.vox-cdn.com/thumbor/jBIzWLPmABAW32GI_LS4Whz-0YY=/0x0:951x724/1820x1213/filters:focal(397x384:549x536):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/54808171/Screen_Shot_2017_05_16_at_1.32.45_PM.0.png'),
   (19, 'Pikachu', 'https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png'),
   (20, 'Lake Erie', 'https://greatlakes.org/wp-content/uploads/2017/10/Lake-Erie-algal-bloom-Aerial-Associates-Photography.jpg'),
   (20, 'Lake Superior', 'https://www.cleanwateraction.org/sites/default/files/images/features/water_MN_great%20lakes_Lake%20superior_Split-Rock-Lighthouse-000069674007_Full.jpg'),
   (21, 'Splash City', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/01/2d/0c.jpg'),
   (21, 'The Splash Sisters', 'https://i.dailymail.co.uk/i/pix/2012/08/06/article-0-146959EC000005DC-587_964x636.jpg'),
   (22, 'Joy', 'https://princessofdragons.files.wordpress.com/2016/04/800px-nurse_joy.png'),
   (22, 'Joy At Work', 'http://images6.fanpop.com/image/photos/32900000/Nurse-Joy-girls-of-pokemon-32920705-342-192.jpg'),
   (23, 'Jenny', 'https://cdn.bulbagarden.net/upload/thumb/4/4d/Officer_Jenny.png/730px-Officer_Jenny.png'),
   (23, 'Jenny At Work', 'https://cdn.bulbagarden.net/upload/2/22/Jenny_Blue.png'),
   (3, 'Me', '../../database/photoDbSim/albums/Ganon-Avatar1.jpeg');

INSERT INTO holds
   (password, description, max_users, name)
VALUES
   ('PWblue', 'Blue is the best color there is! Here in The Blue Boys, your favorite colors must be as follows: Blue. That''s it. All colors are welcome, but we celebrate blue hue here.', 2, 'The Blue Boys'),
   ('PWcastle', 'Castles are the best! We just can''t get enough of castles in this group. Parapets, Drawbridges, Moats, Turrets, Flying Buttresses - the list goes on! Join this hold if you''d like to stay on top of the lastest castle news!', 4, 'Castle Creeps'),
   ('PWcars', 'Do you like cars? BECAUSE WE DO! All kinds of cars! Big cars to karts, we''ve got it covered in this Hold! Join us for some fast and furious conversation!', 3, 'Car Talk'),
   ('PWapple', 'My Little Pony is the best show on TV, and this is a Hold that celebrates that fact! Here we share our favorite episodes and talk about what friendship means to us. Everypony is welcome!', 10, 'My Little Pony Superfans'),
   ('staR13Star', 'Some thirst for power, and we know how to wet that whistle! Fire Flowers, Invincibility Stars, Feathers, Leaves, Master Swords, Heart Containers, Berries - WE CONSUME THEM ALL! Feel the energy!!!', 7, 'Powerup Players'),
   ('6Le5*2', 'It can be hard for those of us who are always guided with the broken controller saved for guests and younger siblings. For those of you, the Player 2 Support Group is here. Please join this private hold for frank and safe conversation about how YOU feel.', 3, 'Supporting Players'),
   ('1234', 'Get down and dirty with Princess Toadstool''s personal Hold! Swap recipes and secrets with the QUEEN of baking! I can increase your baking skills faster than you can get into my castle through the unguarded portcullis on the East side of my castle!', 100, 'Get Baked'),
   ('iLk3p3cAchu', 'I made this Hold to share my best catches, but I''d love to see yours too! I need every tip and trick I can get on my quest to be the very best like no one ever was! To catch them all and understand the power that''s inside of Pokemon. Join me!', 5, 'Gotta Catch ''Em All'),
   ('Atlantic1Pacific2', 'Oceanic Research And Study (or ORAS) for short, is the primary focus of this Hold. Please join us for stimulating coversation about the seven seas and even some larger lakes and the Pokeon that inhabit them. Off topic conversation is NOT ALLOWED, and you WILL be removed from my Hold if you break this rule.', 5, 'Water Watchers'),
   ('th4tsAr0ckF4ct', 'Welcome to the Legends of Rock! Here we talk about all types of sedemetary. It''s elementary! From Granite to Onyx, we investigate both regular rocks and rock pokemon, as well as finding new stragtiges for battling. Rock Facts Only (no rock music please)!!!', 10, 'Legends Of Rock'),
   ('Triforce85', 'I can''t Majora''s Mask my love for my LoZ fam. They''re my Link To The Past! Wherever our adventures take us - like that weird one with the train that I can''t remember the title of - we always stay tight. My family is like a breath of the wild', 4, 'Legend Of Zelda'),
   ('wOrLd1DASH1', 'Mama Mia! We''re the Mario Brothers and plumbin''s our game. We''re not like the others who get all the fame! If your sink is in trouble, you can call us on the double - We''re faster than the others, you''ll be hooked on the brothers!', 3, 'Super Mario Brothers'),
   ('pOKm0nG0', 'Electrode, Diglett, Nidoran, Mankey, Venusaur, Rattatta, Fearow, Pidgey, Seaking, Jolteon, Dragonite, Gastly, Ponyta, Vaporeon, Poliwrath, Butterfree! Venomoth, Poliwag, Nidorino, Golduck, Ivysaur, Grimer, Victreebel, Moltres, Nidoking, Farfetch''d, Abra, Jigglypuff, Kingler, Rhyhorn, Clefable, Wigglytuff', 3, 'Pokemon Red/Blue');

INSERT INTO user_holds
   (holds_user_id, holds_hold_id)
VALUES
   (1, 1),
   (1, 2),
   (1, 11),
   (2, 11),
   (3, 1),
   (3, 2),
   (3, 3),
   (3, 4),
   (3, 11),
   (4, 3),
   (5, 2),
   (5, 5),
   (5, 7),
   (5, 1),
   (5, 12),
   (6, 3),
   (6, 5),
   (6, 6),
   (6, 7),
   (6, 1),
   (6, 12),
   (7, 4),
   (8, 4),
   (9, 4),
   (10, 7),
   (10, 8),
   (10, 9),
   (10, 10),
   (10, 1);

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

SELECT *
FROM holds;

SELECT *
FROM user_holds;