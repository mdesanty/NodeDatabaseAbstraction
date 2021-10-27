DROP DATABASE IF EXISTS SongsDb;

CREATE DATABASE SongsDb;
USE SongsDb;

CREATE TABLE Songs (
  Id int NOT NULL AUTO_INCREMENT,
  Name varchar(255) NOT NULL UNIQUE,
  PRIMARY KEY(Id)
);

INSERT INTO Songs(Name) VALUES('Happy Birthday');
INSERT INTO Songs(Name) VALUES('Mary Had a Little Lamb');
INSERT INTO Songs(Name) VALUES('Circles');
INSERT INTO Songs(Name) VALUES('Kryptonite');