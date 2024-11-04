# MakeSoft-SOEN341_Project_F24

# Project Overview
The Peer Assessment System is designed for university team projects, allowing students to evaluate their teammates based on, cooperation, conceptual contribution, practical contribution, and work ethic. The system is meant to promote accountability and provide feedback to both students and instructors about individual contributions. Instructors can manage teams, monitor performance, and export results for grading purposes.

The project is developed using Agile Scrum methodology over 4 sprints, using GitHub for version control, task management, and collaboration. Our goal is to deliver a prototype that demonstrates core functionality.

# Team Members and Roles
| Student ID | Name            | GitHub Username |
| ---------- | --------------- | --------------- |
| 40275666    | Mark Antoun    | mark9494        |
| 40281790   | Anthony Monaco  | Anthony4044     |
| 40277789   | Danial Kouba    | DaniK1001       |
| 40283180   | Firas Al Haddad | Lemonada10      |
| 40191431   | Oscar Mirontsuk | ren-cc          |
| 40282971   | Marco Patulli   | MARC0CND        |

# Project Documentation
All important documents, such as meeting minutes, sprint plans, and team activity logs, are stored in the `Sprint#` directory in accordance to each sprint.
## Sprint 2 **(Current)**
- **[Meeting Minutes](./Sprint%202/meeting_minutes/)**: `./Sprint 2/meeting_minutes/`
- **[Sprint Plans](./Sprint%202/Sprint_Plan.xls)**: `./Sprint 2/sprint_plan.md`
- **[Team Activity Logs](./Sprint%202/activity_logs/)**: `./Sprint 2/activity_logs/`
## Sprint 1
- **[Meeting Minutes](./Sprint%201/meeting_minutes/)**: `./Sprint 1/meeting_minutes/`
- **[Sprint Plans](./Sprint%201/Sprint_Plan.xls)**: `./Sprint 1/sprint_plan.md`
- **[Team Activity Logs](./Sprint%201/activity_logs/)**: `./Sprint 1/activity_logs/`

# How to Run the Project

Follow these steps to set up and run the Makesoft application, which includes both the backend (Java/Spring Boot) and the frontend (React).

## Prerequisites

- **Java Development Kit (JDK) 8 or higher**
- **Node.js and npm** (Node Package Manager)
- **An IDE for Java** (e.g., IntelliJ IDEA)
- **An IDE or text editor for JavaScript** (e.g., Visual Studio Code)
- **Git** (for cloning the repository)

## Setup Instructions

### 1. Clone the Repository

Open your terminal or command prompt and run:

```
git clone https://github.com/Anthony4044/MakeSoft-SOEN341_Project_F24.git
```


### 2. Set Up the Backend (Java/Spring Boot)

#### a. Install PostgreSQL

- **Download PostgreSQL:**
  - Visit the [PostgreSQL Downloads](https://www.postgresql.org/download/) page.
  - Download the installer for your operating system and follow the installation instructions.

#### b. Launch pgAdmin 4

- **Open pgAdmin 4:**
  - After installing PostgreSQL, launch pgAdmin 4 from your applications menu.
  - You might be prompted to set a master password if it's your first time using pgAdmin.

#### c. Create a New Database


-  **Create Database:**
   - Expand **Servers** > **Local PostgreSQL** > **Databases**.
   - Right-click on **Databases** and select **Create** > **Database...**.
   - **General Tab:**
     - **Database:** `PeerReview`
   - Click **Save**.

#### d. Navigate to the Backend Directory

```
cd Makesoft
```

#### e. Open the Project in Your Java IDE

- Open **IntelliJ IDEA** or your preferred Java IDE.
- Choose **Open** or **Import Project**, then select the `Makesoft` folder you just cloned.

#### f. Run the Backend Application

- Locate the `MakesoftApplication.java` file in the `src/main/java` directory.
- Right-click on `MakesoftApplication.java` and select **Run**.
- The Spring Boot application should start, and you should see logs indicating that the back end is running.

### 3. Set Up the Frontend (React)

#### a. Navigate to the Frontend Directory

In a new terminal window, navigate to the frontend directory:

```
cd MakeSoftReact
```

#### b. Install Node.js Dependencies

Make sure you have Node.js and npm installed. You can check by running:

```
node -v
npm -v
```

If not installed, download and install Node.js from [https://nodejs.org/](https://nodejs.org/).

#### c. Install Required Packages

Run the following commands to install the necessary npm packages:

```
npm install semantic-ui-css semantic-ui-react @nextui-org/theme @tabler/icons-react @nextui-org/react framer-motion @radix-ui/react-label tailwind-merge simplex-noise @react-stately/data
```

#### d. Start the Frontend Application

```
npm start
```

This should open a new browser window or tab pointing to `http://localhost:3000`. If it doesn't open automatically, you can manually navigate to this URL.

### 4. Interact with the Application

- With both the backend and frontend running, you can now interact with the website.
- The frontend communicates with the backend API running on `http://localhost:8080`.



# User Stories
The project is organized into user stories, each user story is broken down into smaller tasks.

## Example User Stories (Prefix: US.#):
- **US.01: Student Login System**
  - As a student, I want to log in to the system using my university credentials, so that I can access my assigned team information.
  
- **US.02: Instructor Creates Teams**
  - As an instructor, I want to create teams and assign students by importing a CSV file, so that I can manage student groups efficiently.

Visit the [Sprint Plan](./docs/sprint_plan.Xlsx) to see a comprehensive list of user stories and tasks, along with additional information. 

# Task Breakdown
Each user story has been broken down into tasks. Tasks are assigned to team members, and tracked via GitHub Issues and the project board.

## Example Tasks (Prefix: Task.#):
- **Task.01.01**: Create login page (Frontend).
- **Task.02.01**: CSV file import functionality for instructors.

Visit the [Sprint Plan](./docs/sprint_plan.xlsx) to see a comprehensive list of user stories and tasks, along with additional information. 


# Project Management

We are using the **GitHub Projects** board to manage tasks. You can view the project board [here](#)

- **To Do**: User stories and tasks yet to be started.
- **In Progress**: Tasks currently being worked on.
- **Done**: Completed tasks.

# License

- **TBD** 
