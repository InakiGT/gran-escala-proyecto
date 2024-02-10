CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    imageUrl VARCHAR(255)
);

CREATE TABLE cuas (
    id  SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    imgUrl VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, imageUrl) VALUES
	('Munikzen', 'qwejniq1','https://i.pinimg.com/736x/a6/ed/f9/a6edf992b1a9ffe732f1c53e06eef91c.jpg'),
    ('DemonInsideS','rqqgeiptyg465', 'https://static.wikia.nocookie.net/villains/images/e/e7/Demonic.jpg/revision/latest?cb=20210611125546'),
    ('DaRey4178','JPOnfq3', 'https://lumiere-a.akamaihd.net/v1/images/darth-vader-main_4560aff7.jpeg');