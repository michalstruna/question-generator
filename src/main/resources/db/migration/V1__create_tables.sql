CREATE TABLE IF NOT EXISTS topic (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    correct INT NOT NULL,
    wrong INT NOT NULL,
    questions_count INT NOT NULL,
    total_time INT NOT NULL
);

CREATE TABLE IF NOT EXISTS question (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    correct INT NOT NULL,
    wrong INT NOT NULL,
    total_time BIGINT NOT NULL,
    topic_id INT NOT NULL,
    FOREIGN KEY (topic_id) REFERENCES topic(id)
);

CREATE TABLE IF NOT EXISTS question_instance (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    start_time BIGINT NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question (id)
);

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL
);