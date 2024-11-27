// Import React and the Signup component
import React, { useState } from 'react';
import Signup from './SignUp'; // Import the Signup component from the SignUp.js file
import Signin from './SignIn';
import InstructorPage from './instructorPage'; // Import InstructorPage
import StudentPage from './studentPage';
import EvaluationForm from './evaluationForm';
import InfoPage from './about';
import ResultsPage from './resultsPage';
// import { Menu, MenuItem, Button, MenuMenu, ButtonGroup, ButtonOr } from 'semantic-ui-react';
// import { Menu, MenuItem, Button, MenuMenu, ButtonGroup, ButtonOr } from 'semantic-ui-react';
import { HoveredLink, Menu, MenuItem, ProductItem } from "./components/ui/navbar-menu";
import './components/ui/light_border'; // Import the CSS file
import { cn } from "./utils/cn";
import './App.css';
import { Vortex } from './components/ui/vortex';

// Component for displaying a gradient effect at the bottom of buttons
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px left-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px left-1/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Main App Component
function App() {
  // State to track the current component to display
  const [currentComponent, setCurrentComponent] = useState('home');
  const [instructorData, setInstructorData] = useState(null); // New state to hold instructor data

  // States to hold student data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [studentId, setStudentId] = useState('');
  const studentData = { email, password, name, section, studentId };

  const [teamName, setTeamName] = useState('');
  const [Tsection, setTSection] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const teamData = { teamName, Tsection, teamMembers };

  // States to hold evaluator data
  const [evaluatedEmail, setEmail2] = useState('');
  const [evaluatedPassword, setPassword2] = useState('');
  const [evaluatedName, setName2] = useState('');
  const [evaluatedSection, setSection2] = useState('');
  const [evaluatedStudentId, setStudentId2] = useState('');
  const evaluatedData = { evaluatedEmail, evaluatedPassword, evaluatedName, evaluatedSection, evaluatedStudentId };



  // Function to handle button clicks and navigate to different components
  const handleButtonClick = (component) => {
    setCurrentComponent(component);
    if (component !== 'instructor') {
      setInstructorData(null); // Reset instructor data if navigating away
    }
  };

  // Function to handle instructor signup
  const handleInstructorSignup = (instructor) => {
    console.log('Instructor data received in App:', instructor);
    setInstructorData(instructor); // Set the instructor data in state
    setCurrentComponent('home'); // Change the current component to 'home'
  };

  // Function to handle instructor signin
  const handleInstructorSignin = (instructor) => {
    console.log('Instructor data received in App:', instructor);
    setInstructorData(instructor);
    setCurrentComponent('instructor'); // Navigate to instructor page after sign-in
  };

  // Function to handle student signup
  const handleStudentSignUp = (student) => {
    console.log('Student data received in App:', student);
    setCurrentComponent('home'); // Navigate to home page after student sign-up
  };

  // Function to handle student signin
  const handleStudentSignin = (student) => {
    console.log('Student data received in App:', student);
    setEmail(student.email); // Save student email in state
    setName(student.name); // Save student name in state
    setSection(student.section);    // Save student section in state
    setStudentId(student.studentId);  // Save student ID in state
    setPassword(student.password);    // Save student password in state
    setCurrentComponent('studentSignin'); // Navigate to student page after sign-in
  };

  // Function to handle evaluation form
  const handleEvaluationForm = (evaluated, evaluator) => {
    setEmail(evaluator.email);
    setName(evaluator.name);
    setSection(evaluator.section);
    setStudentId(evaluator.studentId);
    setPassword(evaluator.password);

    setEmail2(evaluated.email);
    setName2(evaluated.name);
    setSection2(evaluated.section);
    setStudentId2(evaluated.studentId);
    setPassword2(evaluated.password);
    setCurrentComponent('evaluationForm'); // Navigate to evaluation form
  };

  const handleSummarizedResults = (instructor) => {
    setInstructorData(instructor);
    setCurrentComponent('resultsPage');
  };




  // Function to handle navbar display
  function Navbar({ className }) {
    const [active, setActive] = useState(null);
    return (
      <div
        className={cn(
          "fixed top-0 inset-x-0 max-w-2xl mx-auto z-50 dark py-4 nav-elem",
          className
        )}
      >
        <Menu setActive={setActive}>
          <MenuItem
            setActive={setActive}
            item="Home"
            onClick={() => handleButtonClick('home')}
            style={{ padding: '110px!important' }}
          >
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="About">
            <HoveredLink onClick={() => handleButtonClick('infoPage')}>                <button
              className="px-2 relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium">
              About
              <BottomGradient />
            </button></HoveredLink>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-4 text-sm " style={{ fontSize: '20px', padding: '10px' }}>
              <HoveredLink onClick={() => handleButtonClick('signin')}>                <button
                className="px-2 relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium">
                Sign In
                <BottomGradient />
              </button></HoveredLink>
              <HoveredLink onClick={() => handleButtonClick('signup')} >
                <button
                  className="px-2 relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium">
                  Sign Up
                  <BottomGradient />
                </button>
              </HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <header></header>
      {/* Render the current component based on state */}
      {currentComponent === 'signup' && (
        <Signup onInstructorSignup={handleInstructorSignup} onStudentSignup={handleStudentSignUp} />
      )}
      {currentComponent === 'signin' && (
        <Signin onInstructorSignin={handleInstructorSignin} onStudentSignin={handleStudentSignin} />
      )}
      {currentComponent === 'home' && (
        
        <div
          className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden bg-wrapper ">
          <Vortex
            backgroundColor="black"
            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
            <h2 className="text-white text-7xl font-bold text-center">
              Peer Evaluation
            </h2>
            <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center ">
              By MakeSoft
            </p>
          </Vortex>
        </div>


      )}
      {currentComponent === 'instructor' && 
        <InstructorPage instructor={instructorData} handleSummarizedResults={handleSummarizedResults} />
        }
      {currentComponent === 'signin' && 
        <InstructorPage instructor={instructorData} handleSummarizedResults={handleSummarizedResults}/>
        }
      {currentComponent === 'studentSignin' && (
        <StudentPage student={studentData} handleEvaluationForm={handleEvaluationForm} />
      )}
      {currentComponent === 'evaluationForm' && (
        <EvaluationForm student={evaluatedData} evaluator={studentData} navigate={setCurrentComponent}/>
      )}
      {currentComponent === 'resultsPage' && (
        <ResultsPage instructor = {instructorData} navigate={setCurrentComponent}/> )
        }
      {currentComponent === 'infoPage' && 
        <InfoPage />
      }
    </div>
  );
}

export default App; // Export the App component
