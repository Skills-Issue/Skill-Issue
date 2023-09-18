CREATE DATABASE IF NOT EXISTS SBRP;

USE SBRP;

CREATE TABLE IF NOT EXISTS Role (
  Role_Name varchar(20) PRIMARY KEY,
  Role_Desc longtext
);

CREATE TABLE IF NOT EXISTS Skill (
  Skill_Name varchar(50) PRIMARY KEY,
  Skill_Desc longtext
);

CREATE TABLE IF NOT EXISTS Access_Control (
  Access_ID int PRIMARY KEY,
  Access_Control_Name varchar(20)
);

CREATE TABLE IF NOT EXISTS Staff (
  Staff_ID int PRIMARY KEY,
  Staff_FName varchar(50) NOT NULL,
  Staff_LName varchar(50) NOT NULL,
  Dept varchar(50) NOT NULL,
  Country varchar(50) NOT NULL,
  Email varchar(50) NOT NULL,
  Role int,
  FOREIGN KEY (Role) REFERENCES Access_Control(Access_ID)
);


CREATE TABLE IF NOT EXISTS Staff_Skill (
  Staff_ID int,
  Skill_Name varchar(20),
  PRIMARY KEY (Staff_ID, Skill_Name),
  FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID),
  FOREIGN KEY (Skill_Name) REFERENCES Skill(Skill_Name)
);


CREATE TABLE IF NOT EXISTS Role_Skill (
  Role_Name varchar(20),
  Skill_Name varchar(50),
  PRIMARY KEY (Role_Name , SKill_Name),
  FOREIGN KEY (Role_Name) REFERENCES Role(Role_Name),
  FOREIGN KEY (Skill_Name) REFERENCES Skill(Skill_Name)
);

INSERT INTO Access_Control (Access_ID, Access_Control_Name) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Manager');

INSERT INTO Skill (Skill_Name, Skill_Desc) VALUES
('Programming', 'Ability to write code in various programming languages'),
('Marketing', 'Ability to promote products or services to customers'),
('Design', 'Ability to create visual designs for various media'),
('Leadership', 'Ability to lead and manage teams effectively'),
('Communication', 'Ability to communicate effectively with others'),
('Problem Solving', 'Ability to identify and solve complex problems'),
('Project Management', 'Ability to plan, execute, and manage projects effectively'),
('Data Analysis', 'Ability to analyze and interpret data to make informed decisions'),
('Sales', 'Ability to sell products or services to customers'),
('Customer Service', 'Ability to provide excellent customer service to clients');

INSERT INTO Role (Role_Name, Role_Desc) VALUES
('Software Engineer', 'Responsible for designing, developing, and testing software applications'),
('Product Manager', 'Responsible for overseeing the development and launch of software products'),
('Business Analyst', 'Responsible for analyzing business processes and identifying areas for improvement'),
('Technical Architect', 'Responsible for designing and implementing the technical architecture of software applications'),
('UI/UX Designer', 'Responsible for designing the user interface and user experience of software applications'),
('DevOps Engineer', 'Responsible for managing the deployment and operation of software applications'),
('Data Scientist', 'Responsible for analyzing and interpreting complex data sets to inform business decisions'),
('Security Engineer', 'Responsible for designing and implementing security measures to protect software applications'),
('Technical Support', 'Responsible for providing technical support to customers who use software applications');



INSERT INTO Staff (Staff_ID, Staff_FName, Staff_LName, Dept, Country, Email, Role) VALUES
(1, 'John', 'Doe', 'Sales', 'USA', 'johndoe@example.com', 1),
(2, 'Jane', 'Doe', 'Marketing', 'USA', 'janedoe@example.com', 2),
(3, 'Bob', 'Smith', 'Engineering', 'Canada', 'bobsmith@example.com', 3),
(4, 'Alice', 'Johnson', 'Finance', 'UK', 'alicejohnson@example.com', 1),
(5, 'David', 'Lee', 'Operations', 'China', 'davidlee@example.com', 2),
(6, 'Sarah', 'Kim', 'HR', 'South Korea', 'sarahkim@example.com', 3),
(7, 'Michael', 'Nguyen', 'IT', 'Vietnam', 'michaelnguyen@example.com', 1),
(8, 'Maria', 'Garcia', 'Sales', 'Spain', 'mariagarcia@example.com', 2),
(9, 'Mohammed', 'Ali', 'Marketing', 'Egypt', 'mohammedali@example.com', 3),
(10, 'Anna', 'Kovacs', 'Engineering', 'Hungary', 'annakovacs@example.com', 1),
(11, 'Hiroshi', 'Tanaka', 'Operations', 'Japan', 'hiroshitanaka@example.com', 2),
(12, 'Lena', 'Andersen', 'HR', 'Denmark', 'lenaandersen@example.com', 3),
(13, 'Juan', 'Gonzalez', 'IT', 'Mexico', 'juangonzalez@example.com', 1),
(14, 'Sophie', 'Dubois', 'Sales', 'France', 'sophiedubois@example.com', 2),
(15, 'Giovanni', 'Ricci', 'Marketing', 'Italy', 'giovanniricci@example.com', 3);


INSERT INTO Staff_Skill (Staff_ID, Skill_Name) VALUES
(1, 'Programming'),
(1, 'Leadership'),
(1, 'Project Management'),
(2, 'Marketing'),
(2, 'Communication'),
(2, 'Sales'),
(3, 'Programming'),
(3, 'Problem Solving'),
(3, 'Data Analysis'),
(4, 'Sales'),
(4, 'Customer Service'),
(5, 'Project Management'),
(5, 'Leadership'),
(5, 'Communication'),
(6, 'Leadership'),
(6, 'Customer Service'),
(6, 'Problem Solving'),
(7, 'Programming'),
(7, 'Data Analysis'),
(7, 'Problem Solving'),
(8, 'Marketing'),
(8, 'Sales'),
(8, 'Communication'),
(9, 'Marketing'),
(9, 'Sales'),
(9, 'Customer Service'),
(10, 'Programming'),
(10, 'Problem Solving'),
(10, 'Data Analysis'),
(11, 'Project Management'),
(11, 'Leadership'),
(11, 'Communication'),
(12, 'Leadership'),
(12, 'Customer Service'),
(12, 'Problem Solving'),
(13, 'Programming'),
(13, 'Data Analysis'),
(13, 'Problem Solving'),
(14, 'Marketing'),
(14, 'Sales'),
(14, 'Communication'),
(15, 'Marketing'),
(15, 'Sales'),
(15, 'Customer Service');


INSERT INTO Role_Skill (Role_Name, Skill_Name) VALUES
('Software Engineer', 'Programming'),
('Software Engineer', 'Problem Solving'),
('Software Engineer', 'Communication'),
('Product Manager', 'Leadership'),
('Product Manager', 'Project Management'),
('Product Manager', 'Marketing'),
('Business Analyst', 'Data Analysis'),
('Business Analyst', 'Problem Solving'),
('Business Analyst', 'Communication'),
('Technical Architect', 'Programming'),
('Technical Architect', 'Design'),
('Technical Architect', 'Leadership'),
('UI/UX Designer', 'Design'),
('UI/UX Designer', 'Communication'),
('UI/UX Designer', 'Problem Solving'),
('DevOps Engineer', 'Programming'),
('DevOps Engineer', 'Project Management'),
('DevOps Engineer', 'Communication'),
('Data Scientist', 'Data Analysis'),
('Data Scientist', 'Programming'),
('Data Scientist', 'Problem Solving'),
('Security Engineer', 'Programming'),
('Security Engineer', 'Problem Solving'),
('Security Engineer', 'Leadership'),
('Technical Support', 'Communication'),
('Technical Support', 'Problem Solving'),
('Technical Support', 'Customer Service');



