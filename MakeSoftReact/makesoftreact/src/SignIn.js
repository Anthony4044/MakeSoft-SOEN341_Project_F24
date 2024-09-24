import React, { useState } from 'react';
import './SignIn.css'
import { FormField, Button, ButtonContent, Icon, Checkbox, Form, FormInput, FormGroup } from 'semantic-ui-react'
import {
     Radio, Segment, Label, Message
  } from 'semantic-ui-react'
 
  import conco_library from './Conco-library.jpg';

// Instructor Signup Form
const InstructorSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

//Backend TODO
const handleSignin = async () => {

};

  return (
    <div>
    <Message className="welcome"
        attached
        header='Welcome back!'
        content='Fill out the form below to sign in for an existing account'
      /> 
    <Form style={{ minWidth: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>

    <FormField className="email">
      <label style={{fontSize: '18px'}}>Email</label>
      <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)}/>
    </FormField>
    <FormField className="password">
      <label style={{fontSize: '18px'}}>Password</label>
      <input type="text" placeholder="Password" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
    </FormField>
    
    <Button animated className="signup" onClick={handleSignin} style={{hover: 'green'}}>
          <ButtonContent visible>Sign In</ButtonContent>
          <ButtonContent hidden>
            <Icon name='arrow right' />
          </ButtonContent>
        </Button>
  </Form>
  </div>     
   
  );

  
};

const StudentSignin = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  
      //Backend TODO
    const handleSignin2 = async () => {
  
    };
  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <div>
    <Message className="welcome"
        attached
        header='Welcome back!'
        content='Fill out the form below to sign in for an existing account'
      /> 
    <Form style={{ minWidth: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>

    <FormField className="email">
      <label style={{fontSize: '18px'}}>Email</label>
      <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)}/>
    </FormField>
    <FormField className="password">
      <label style={{fontSize: '18px'}}>Password</label>
      <input type="text" placeholder="Password" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
    </FormField>
    
    <Button animated className="signup" onClick={handleSignin2} style={{hover: 'green'}}>
          <ButtonContent visible>Sign In</ButtonContent>
          <ButtonContent hidden>
            <Icon name='arrow right' />
          </ButtonContent>
        </Button>
  </Form>
  </div> 
    );
  };

const SignInPage = () => {
    const [isInstructor, setIsInstructor] = useState(true);
  
    const toggleSignup = () => {
      setIsInstructor(!isInstructor);
    };
  
    return (
      <div style={{
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
        <h1 className="Title2" style={{color: 'black'}}>{isInstructor ? 'Instructor' : 'Student'} Sign in Page</h1>
        <Segment compact style={{
          backgroundColor: '#f0f0f0',
          border: 'none',
        }}>
          <Label size='big' style={{
            transform: 'translateY(-5px)'
          }} basic>Student</Label>
          <Radio toggle checked={isInstructor} onChange={toggleSignup} /><Label size='big' style={{
            transform: 'translateY(-5px)'
          }} basic>Instructor</Label>
        </Segment>
        <div>
          {isInstructor ? <InstructorSignin /> : <StudentSignin />}
        </div>
      </div>
    );
  };



export default SignInPage;
