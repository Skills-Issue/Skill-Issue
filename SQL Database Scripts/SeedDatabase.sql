CREATE DATABASE IF NOT EXISTS SBRP;


USE SBRP;


CREATE TABLE IF NOT EXISTS Role_Skill (
    Role_Name VARCHAR(20),
    Skill_Name VARCHAR(50),
    PRIMARY KEY (Role_Name,Skill_Name)
);

CREATE TABLE Staff (
  Staff_ID INT NOT NULL AUTO_INCREMENT,
  Staff_FName VARCHAR(50) NOT NULL,
  Staff_LName VARCHAR(50) NOT NULL,
  Dept VARCHAR(50) NOT NULL,
  Country VARCHAR(50) NOT NULL,
  Email VARCHAR(50) NOT NULL,
  Access_Rights INT,
  PRIMARY KEY (Staff_ID),
  foreign key (Access_Rights)references Role_Skill(Role_Name)
);
