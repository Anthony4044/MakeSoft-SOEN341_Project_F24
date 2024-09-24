// Import React and the Signup component
import React, { useState } from 'react';
import Signup from './SignUp'; // Import the Signup component from the SignUp.js file
import Signin from './SignIn';
import conco from './Conco.png';
import conco_library from './Conco-library.jpg';
import conco_picture from './Conco-picture.webp';

import { Menu, MenuItem, Button, MenuMenu, ButtonGroup, ButtonOr } from 'semantic-ui-react';

// Main App Component
function App() {
  // State to track the current component to display
  const [currentComponent, setCurrentComponent] = useState('home');

  // Function to handle button clicks
  const handleButtonClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div className="App">
      <Menu>
        <MenuItem>
          <img src={conco} alt="Conco" />
          <div className="Title"> &nbsp;&nbsp; MakeSoft Peer Evaluation &nbsp;&nbsp; </div>
          <Button style={{fontSize: '18px', borderRadius: '20px'} }onClick={() => handleButtonClick('home')}> Home </Button> &nbsp;&nbsp;
          
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
      <header className="App-header"style={{
      backgroundImage: `url(${conco_picture})`,filter: 'blur(0.5px)', position: 'absolute', margin: '0', backgroundRepeat: 'no-repeat', display: 'flex' , height: '130px', width: '100%', backgroundPosition: 'top left',backgroundSize: 'contain'}}>
        <h1> </h1>
      </header>
      {/* Render the current component based on state */}
      {currentComponent === 'signup' && <Signup />}
      {currentComponent === 'home' && <div>Welcome to the Home Page</div> }
      {currentComponent === 'signin' && <Signin />}
    </div>
  );
}

export default App;
