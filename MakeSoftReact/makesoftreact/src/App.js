// Import React and the Signup component
import React, { useState } from 'react';
import Signup from './SignUp'; // Import the Signup component from the SignUp.js file
import InstructorPage from './instructorPage'; // Import InstructorPage
import { Menu, MenuItem, Button, MenuMenu, ButtonGroup, ButtonOr } from 'semantic-ui-react';
import './global.css'

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
      setInstructorData(instructor);
      setCurrentComponent('instructor');
    };

  return (
    <div className="App">
      <Menu>
        <MenuItem>
          <Button onClick={() => handleButtonClick('home')}> Home </Button>
          {/* <Button onClick={() => handleButtonClick('instructor')}>Instructor</Button> */}
        </MenuItem>
        <MenuMenu position='right'>
          <MenuItem>
            <ButtonGroup>
              <Button onClick={() => handleButtonClick('signup')}>Sign-Up</Button>
              <ButtonOr />
              <Button positive onClick={() => handleButtonClick('signin')}>Sign In</Button>
            </ButtonGroup>
          </MenuItem>
        </MenuMenu>
      </Menu>
      {/* <header className="App-header">
        <h1>Peer Evaluation Signup</h1>
      </header> */}

      {/* Render the current component based on state */}
      {currentComponent === 'signup' && <Signup onInstructorSignup={handleInstructorSignup}/>}
      {currentComponent === 'home' && <div>Welcome to the Home Page</div>}
      {currentComponent === 'signin' && <div>Please sign in</div>}
      {currentComponent === 'instructor' && <InstructorPage instructor={instructorData} />}
    </div>
  );
}

export default App;
