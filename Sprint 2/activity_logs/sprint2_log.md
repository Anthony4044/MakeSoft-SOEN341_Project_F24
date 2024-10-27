# Team Activity Log - Sprint 2

### 2024-10-13

**Team Member:** Mark Antoun  
**Student Id:** 40275666  
**GitHub Name:** Mark9494   
**Time Spent:** 8 hours 

**Worked On:**
- US09, added database dependencies, tested database connection to backend using postman, added student and instructor table, refactored student sign up and instructor sign up to work with databse


**Comments/Notes:**
- Refactored backend to stop using csv files and use databse which eliminated a lot of lines of code to make the code cleaner

---

### 2024-10-14
**Team Member:** Danial Kouba   
**Student Id:** 40277789    
**GitHub Name:** DaniK1001      
**Time Spent:**

**Worked On:** 
-begining of team implementation for database
-Implemented instructor signin with database
-Implemented student signin with databse instead of csv

**Comments/Notes:**
Part not fully done, decided to stop, because I was really tired

---

### 2024-10-15
**Team Member:** Danial Kouba    
**Student Id:** 40277789      
**GitHub Name:** DaniK1001  
**Time Spent:** 3 hours 

**Worked On:**
-implemented removing student to team using the database
-Tried to implement fetching teams

**Comments/Notes:**
fetching teams still didn't work because of some problem in the react app, teams weren't being displayed and the info wasn't being saved in the backend or even sent properly? I asked for help from my teammates.

### 2024-10-15

**Team Member:** Mark Antoun  
**Student Id:** 40275666  
**GitHub Name:** Mark9494    
**Time Spent:** 4 hours 

**Worked On:**
- Debugging, fixed issue that prevented teams and students from being fetched, added a foreign key of team to the student table in database.
- Debugging, fixed issue that preveneted students from getting added to a team.


**Comments/Notes:**

---

### 2024-10-15

**Team Member:** Anthony Monaco  
**Student Id:** 40281790  
**GitHub Name:** Anthony4044  
**Time Spent:** 6.5 hours 

**Worked On:**
- US07, adding an evaluate button next to teammembers who are available for evaluation
- US08, creating an evaluation form to evaluate team members based on Cooperation, Conceptual Contribution, Practical Contribution, and Work Ethic
- Store this information for future manipulation

**Comments/Notes:**
- Improvements to the overall style and look of the UI can be done
- Answer object stores all evaluation information for backend request

---

### 2024-10-15

**Team Member:** Anthony Monaco  
**Student Id:** 40281790  
**GitHub Name:** Anthony4044  
**Time Spent:** 4.5 hours 

**Worked On:**
-Creating a sign in unit test to evaluate API connections and database functionality
-Created a new workflow to test out this unit test during pull requests and pushes to the main

**Comments/Notes:**
- Make sure to have the test case in the database so that the testcase can work properly

---

### 2024-10-16
**Team Member:** Danial Kouba    
**Student Id:** 40277789      
**GitHub Name:** DaniK1001  
**Time Spent:** 2 hours

**Worked On:**
- Implemented fetching team members and ensured end-to-end functionality

**Comments/Notes:**
It finally worked.

---

### 2024-10-18

**Team Member:** Firas Al Haddad  
**Student Id:** 40283180  
**GitHub Name:** Lemonada10     
**Time Spent:** 5 hours 

**Worked On:**
- US09, Task.09.01 Set up PostgreSQL database, Task.09.03 Define JPA entities, Task.09.04 Implement Spring Data JPA Repositories

**Comments/Notes:**
- Created database tables, mapping attributes to corresponding columns and ensuring the permissions were well set up

---

### 2024-10-18

**Team Member:** Oscar Mirontsuk  
**Student Id:** 40191431  
**GitHub Name:** ren-cc  
**Time Spent:** 11 hours 

**Worked On:**
- Implemented Aceternity, next.js and Tailwind for the front end 
- Improved ui of the landing page 
- Started sign up pages

**Comments/Notes:**
- Took a long time to set up and learn the framework but resulted in a nice looking page
---

### 2024-10-20

**Team Member:** Oscar Mirontsuk  
**Student Id:** 40191431  
**GitHub Name:** ren-cc  
**Time Spent:** 8 hours 

**Worked On:** 
- Finished ui of the Login and sign up pages
- Started Instructor page
- Changed the background due to performance issues

**Comments/Notes:**
- The new background still has performance issues
---

### 2024-10-23

**Team Member:** Oscar Mirontsuk  
**Student Id:** 40191431  
**GitHub Name:** ren-cc  
**Time Spent:** 10 hours 

**Worked On:** 
- Finished instructor page ui redesign
- Finished student page ui redesign
- Finished student rating page Ui
- Finished student rating page confirmation page Ui 

**Comments/Notes:**
- Pages became faster to make due to understanding the framework and now that the grownd work has been layed down 

---

### 2024-10-23

**Team Member:** Firas Al Haddad  
**Student Id:** 40283180  
**GitHub Name:** Lemonada10     
**Time Spent:** 6 hours 

**Worked On:**
- US10, Test React app with migrated backend, Verify frontend data handling

**Comments/Notes:**
- Verify that all frontend components continue to work as expected with the PostgreSQL database, Test data retrieval and submission functions in the frontend to ensure compatibility with PostgreSQL.

---

### 2024-10-25

**Team Member:** Oscar Mirontsuk  
**Student Id:** 40191431  
**GitHub Name:** ren-cc  
**Time Spent:** 4 hours 

**Worked On:** 
- Added about page 
- Formating of meeting minutes into Markdown format
- updated readme

**Comments/Notes:**
- N/A

---

### 2024-10-25

**Team Member:** Firas Al Haddad  
**Student Id:** 40283180  
**GitHub Name:** Lemonada10     
**Time Spent:** 3 hours 

**Worked On:**
- US11, Implement unit testing for sign up, sign in, database
- Implement CI/CD pipeline and connect it to back-end unit tests in order for automatic testing when merging branches


**Comments/Notes:**
- Create unit tests for user sign-in functionality, ensuring security, data accuracy and Configure CI/CD pipeline to automatically run back-end unit tests upon code integration.

---

### 2024-10-25
**Team Member:** Danial Kouba 
**Student Id:** 40277789  
**GitHub Name:** DaniK1001      
**Time Spent:** 2 hours

**Worked On:** 
- Implemented storing review (Evaluation form) in the database

**Comments/Notes:**
This is useful for future features, like fetching the reviews from database. Before that, the reviews were only being stored in the frontend.

---
### 2024-10-26

**Team Member:** Mark Antoun  
**Student Id:** 40275666  
**GitHub Name:** Mark9494    
**Time Spent:** 20 minutes 

**Worked On:**
- US11, added dependencies for unit testing, added 2 unit tests for instructor sign up in order to test pipline implementation
- Debugging, fixed issue that preveneted students from getting added to a team.


**Comments/Notes:**
- The unite tests added are meant to test the CI pipline implemetation. therefore, there will be more rigorous testing implemeted later on.

---

### 2024-10-26
**Team Member:** Danial Kouba    
**Student Id:** 40277789  
**GitHub Name:** DaniK1001  
**Time Spent:** 30 minutes

**Worked On:**
- Created minimal unit tests to test the functionality of instructor sign in.
- Updated ci.yml, worked on the yaml file for the CI pipeline.

**Comments/Notes:** 
tried to help saving the pipeline and getting it to work for sprint 2

---

### 2024-10-25

**Team Member:** Oscar Mirontsuk  
**Student Id:** 40191431  
**GitHub Name:** ren-cc  
**Time Spent:** 20 minutes 

**Worked On:** 
- Finishing touches to formating of time log files 
- final Github file structure changes

**Comments/Notes:**
- N/A
