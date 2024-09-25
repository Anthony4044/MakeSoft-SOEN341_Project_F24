// Import React and the Signup component
import React, { useState } from 'react';
import Signup from './SignUp'; // Import the Signup component from the SignUp.js file
import Signin from './SignIn';
import InstructorPage from './instructorPage'; // Import InstructorPage
import conco from './Conco.png';
import conco_library from './Conco-library.jpg';
import conco_picture from './Conco-picture.webp';

import { Menu, MenuItem, Button, MenuMenu, ButtonGroup, ButtonOr } from 'semantic-ui-react';

// Main App Component
function App() {
  // State to track the current component to display
  const [currentComponent, setCurrentComponent] = useState('home');
  const [instructorData, setInstructorData] = useState(null); // New state to hold instructor data

  // Function to handle button clicks
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
      setCurrentComponent('instructor'); // Change the current component to 'instructor'
    };

    const handleInstructorSignin = (instructor) => { // Function to handle instructor signin
      console.log('Instructor data received in App:', instructor);
      setInstructorData(instructor);
      setCurrentComponent('instructor');//Navigate to instructor page after sign-in
    };

  return (
    <div className="App">
      <Menu>
        <MenuItem>
          <img src={conco} alt="Conco" />
          <div className="Title"> &nbsp;&nbsp; MakeSoft Peer Evaluation &nbsp;&nbsp; </div>
          <Button style={{fontSize: '18px', borderRadius: '20px'} }onClick={() => handleButtonClick('home')}> Home </Button> &nbsp;&nbsp;
                   {/* <Button onClick={() => handleButtonClick('instructor')}>Instructor</Button> */}
          
        </MenuItem>
        <MenuMenu position='right'>
          <MenuItem>
            <ButtonGroup>
              <Button style={{fontSize: '18px'}}onClick={() => handleButtonClick('signup')}>Sign-Up</Button>
              <ButtonOr />
              <Button style={{fontSize: '18px'}} positive onClick={() => handleButtonClick('signin')}>Sign In</Button>
            </ButtonGroup>
          </MenuItem>
        </MenuMenu>
      </Menu>
      <header>
      
        <h1> </h1>
      </header>
      {/* Render the current component based on state */}
      {currentComponent === 'signup' && <Signup onInstructorSignup={handleInstructorSignup}/>}
      {currentComponent === 'signin' && <Signin onInstructorSignin={handleInstructorSignin} />}
      {currentComponent === 'home' && <div style={{
        backgroundImage: `url(${conco_library})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Full height of viewport
        width: '100%', // Full width of viewport
        backgroundSize: 'cover', // Ensure image covers entire background
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent repetition of the image
      }}>
      
      
        <div className="content2">
        <span style={{fontSize: '30px'}}>What is MakeSoft Peer Evaluation</span><br></br><br></br>
        <span style={{color: 'rgb(149, 38, 38)'}}>MakeSoft Peer Assessment System </span> is designed for university team projects, allowing students to evaluate their teammates based on, cooperation, conceptual contribution, practical contribution, and work ethic. The system is meant to promote accountability and provide feedback to both students and instructors about individual contributions. Instructors can manage teams, monitor performance, and export results for grading purposes.
        <br></br><br></br>
      
         </div>
         <div className="content2"><span style={{fontSize: '30px'}}>How to use it</span> <br></br><br></br>
        For <span style={{color: 'rgb(149, 38, 38)'}}>Teachers </span>create an account and sign in. Once you log in, you'll have access to all students that signed up to the website and you'll be able to 
         assign teams by adding the students from the same section. After that, you can modify teams, remove and add students.
        If you are a <span style={{color: 'rgb(149, 38, 38)'}}>Student </span>, create an account as well and sign in. Then you'll see all the teams available and you can join a team that didn't reach its maximum capacity.

         </div>

         <div className="content2"><span style={{fontSize: '30px'}}>Contact US</span> <br></br><br></br>
         We'll be glad to answer any inquiries at MakeSoft@gmail.com <br></br>
         Phone number: +1 514 534 6356
         </div>
        
        </div> }
      {currentComponent === 'instructor' && <InstructorPage instructor={instructorData} />}
      {currentComponent === 'signin' && <InstructorPage instructor={instructorData}/>}
    </div>
  );
}

export default App;
