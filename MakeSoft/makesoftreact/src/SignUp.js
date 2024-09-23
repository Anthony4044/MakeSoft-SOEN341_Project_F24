import React, { useState } from 'react';
import './SignUp.css'
import {
  ButtonContent, Button, Icon, FormField, Form, FormInput,
  FormGroup,
  Message, Radio, Segment, Label
} from 'semantic-ui-react'
import conco_library from './Conco-library.jpg';

// Instructor Signup Form
const InstructorSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');

  //Backend TODO
  const handleSignup = async () => {

  };

  return (
    
    <div>
      <Message className="welcome"
        attached
        header='Welcome to our site!'
        content='Fill out the form below to sign-up for a new account'
      />
      <Form className="form" style={{ minWidth: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <FormField>
          <label style={{fontSize: '18px'}}>Name</label>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <FormField>
          <label style={{fontSize: '18px'}}>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <FormField>
          <label style={{fontSize: '18px'}}>Section</label>
          <input type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} />
        </FormField>
        <FormField>
          <label style={{fontSize: '18px'}}>Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <Button animated className="signup" onClick={handleSignup}>
          <ButtonContent visible>Sign Up</ButtonContent>
          <ButtonContent hidden>
            <Icon name='arrow right' />
          </ButtonContent>
        </Button>
      </Form>
    </div>
   
  );
};

// Student Signup Form
const StudentSignup = () => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');

    //Backend TODO
  const handleSignup = async () => {

  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    
    <div>
      <Message className="welcome"
        attached
        header='Welcome to our site!'
        content='Fill out the form below to sign-up for a new account'
      />
      <Form className="form" style={{ minWidth: '800px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <FormGroup style={{fontSize: '17px'}} widths='equal'>
          <FormInput fluid label='Student ID' type="text" placeholder="ID Number" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <FormInput fluid label='Student Name' type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FormInput fluid label='Student Section' type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} />
        </FormGroup>
        <FormField>
          <label style={{fontSize: '18px'}}>Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <FormField>
          <label style={{fontSize: '18px'}}>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <Button animated className="signup" onClick={handleSignup} style={{hover: 'green'}}>
          <ButtonContent visible>Sign Up</ButtonContent>
          <ButtonContent hidden>
            <Icon name='arrow right' />
          </ButtonContent>
        </Button>
      </Form>
    </div>
    
  );
};

// Main Signup Page with Toggle Button
const SignupPage = () => {
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
      <h1 className="Title2" style={{color: 'black'}}>{isInstructor ? 'Instructor' : 'Student'} Signup Page</h1>
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
        {isInstructor ? <InstructorSignup /> : <StudentSignup />}
      </div>
    </div>
    
  );
};

export default SignupPage;
