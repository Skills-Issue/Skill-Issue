![SBRP](https://github.com/Skills-Issue/Skill-Issue/assets/73370403/ad47dd76-2484-4539-b35f-64bd2f4dc91a)


# Skill-based-Role-Portal (SBRP)
```
   .-'''-.  _______   .-------.    .-------.  
  / _     \\  ____  \ |  _ _   \   \  _(`)_ \ 
 (`' )/`--'| |    \ | | ( ' )  |   | (_ o._)| 
(_ o _).   | |____/ / |(_ o _) /   |  (_,_) / 
 (_,_). '. |   _ _ '. | (_,_).' __ |   '-.-'  
.---.  \  :|  ( ' )  \|  |\ \  |  ||   |      
\    `-'  || (_{;}_) ||  | \ `'   /|   |      
 \       / |  (_,_)  /|  |  \    / /   )      
  `-...-'  /_______.' ''-'   `'-'  `---'      
                                                
```
## Disclaimer: 
**This project is a module under SMU School of Computing and Information Systems - IS212 (Software Project Management).** 
### Excerpt taken from Course Description
>"In IS212 (Software Project Management), students will learn about modern frameworks and tools for software project management. In particular, students will gain hands-on experience with ‘scrum’ and several other agile techniques (e.g. test-driven development, AI-based pair programming, continuous integration) as they design and build the first release of a software system. Students will gain an appreciation for how these methods help to manage the inherent uncertainty of software projects, as well as how they ensure that developers work towards a common goal at a sustainable pace."
## Table of Contents
- [Disclaimer](#disclaimer)
- [Introduction](#sbrp)
- [Project Requirements](#project-requirements)
- [Excerpt from Course Description](#excerpt-taken-from-course-description)
- [Problem Statement](#problem-statement)
- [Team Members](#team-members)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Postman Collections](#postman-collections)
- [Context Diagram](#context-diagram)
- [Application Screenshots](#application-screenshots)

## SBRP
The Skill-Based Role Portal (SBRP) is a user-friendly web application that simplifies internal hiring at All-In-One by allowing staff to apply for roles, assessing their skill compatibility, and aiding HR and managers in candidate selection, while ensuring security, performance, and scalability for the company's future growth.

## Project Requirements: 
- Complete the following **5 Core Functions**


| Role                 | Function               | Description                                            |
|---------------------- |------------------------ |-------------------------------------------------------- |
| Human Resources      | Create, Read, and Update (CRU) of Role Listings | Maintenance of Role listings <br> There is no delete option for job listings, but there would be a deadline for each listing.|
| Human Resources      | View skills of role applicants     | View the skills of each staff                    |
| Staff                | Browse and Filter Role Listing | List out the open roles and display the details |
| Staff                | View Role-Skill Match | Display the match and gaps of the roles with current skill set |
| Staff                | Apply for role| Apply for the open role|

Other Requirements
- **Performance** <br>
Response rate for each page load should be within a reasonable timing.
- **Security**<br>
The system should be secured and only allow staff and HR to access. Access to features should be based on their role in the organisation
- **Usability**<br>
All groups of users should be able to complete their tasks without guidance.
- **Scalability**<br>
The solution proposed should be able to cater for the growth of the organisation in the next 3 years.

## Problem Statement
Develop a user-friendly web application for All-In-One, enabling staff to efficiently apply for internal job openings, assess their skill match with role requirements, and facilitate HR and managers in identifying suitable candidates, ensuring security, performance, and scalability to support the company's growth.
## Team Members
- [Kyla Sim](https://www.linkedin.com/in/kyla-sim/)
- [Tan Chi Yong](https://www.linkedin.com/in/chiyongtan/)
- [Benjamin Goh](https://www.linkedin.com/in/benjamin-goh-2a2544250/)
- [Emilia Lim](https://www.linkedin.com/in/emilialim/)
- [Swee Kiat](https://www.linkedin.com/in/swee-kiat-wong-934575229/)
- [Joel Tan](https://www.linkedin.com/in/joeltanec/)

## Requirements
- Python3
- Node

## Getting Started
First, open a terminal at the root folder 

Next, install the necessary packages:

```sh
npm i
cd backend
pip install -r requirements.txt
```
Then run the frontend server:
```sh
npm run dev
```


Next, open another terminal and proceed to run the backend server: 
```sh
cd backend
python3 staff.py
```

Lastly, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Frontend will be running on port _3000_
Backend will be running on port _5000_

## Postman Collections
- [Skill-Issue Collection](https://github.com/Skills-Issue/Skill-Issue/files/13264795/SPM.API.Calls.postman_collection.json)



### Container Diagram 
![G3T1 Container Diagram](https://github.com/Skills-Issue/Skill-Issue/assets/73370403/23be62ca-9887-433f-829e-6f636fd36c01)


<br>

### Context Diagram
![G3T1 Context Diagram](https://github.com/Skills-Issue/Skill-Issue/assets/73370403/d8b56ba9-262c-4398-83af-ac025d8f683b)



## Application Screenshots
**Login Screen**
<img width="1347" alt="Screenshot 2023-11-06 at 1 17 18 PM" src="https://github.com/Skills-Issue/Skill-Issue/assets/73370403/94d6acdd-d391-4567-8f4b-729a7786d930">

**Staff Dashboard**
<img width="1512" alt="Screenshot 2023-11-06 at 3 30 20 PM" src="https://github.com/Skills-Issue/Skill-Issue/assets/73370403/7c92adf2-704f-4094-bfa5-22d9253f74de">

**HR Dashboard**
<img width="1511" alt="Screenshot 2023-11-06 at 3 29 59 PM" src="https://github.com/Skills-Issue/Skill-Issue/assets/73370403/86499ccb-d95b-415e-82a7-bdf9d54d40cf">

