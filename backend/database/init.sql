CREATE DATABASE IF NOT EXISTS usersdb;
USE usersdb;
CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
);
DELIMITER // 
CREATE PROCEDURE create_and_return(
    IN email VARCHAR(255),
    IN first_name VARCHAR(255),
    IN last_name VARCHAR(255),
    IN image_url VARCHAR(255),
    IN phone VARCHAR(255)
) 
BEGIN
    INSERT INTO users(email, first_name, last_name, image_url, phone) VALUES (email, first_name, last_name, image_url, phone);
    SET @USER_ID = LAST_INSERT_ID();
    SELECT * FROM users WHERE id=@USER_ID;
END // 
DELIMITER ;