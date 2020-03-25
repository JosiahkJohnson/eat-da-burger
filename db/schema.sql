DROP DATABASE IF EXISTS burgers_DB;
CREATE DATABASE burgers_DB;

USE burgers_DB;

CREATE TABLE burgers(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    eaten BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);