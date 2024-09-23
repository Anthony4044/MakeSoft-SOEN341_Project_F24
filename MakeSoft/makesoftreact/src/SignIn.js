import React, { useState } from 'react';
import './SignIn.css'
import { FormField, Button, Checkbox, Form } from 'semantic-ui-react'
import {
     Radio, Segment, Label, Message
  } from 'semantic-ui-react'

// Instructor Signup Form
const InstructorSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

//Backend TODO
const handleSignin = async () => {

};

  return (
    <div>
    <Message
        attached
        header='Welcome back!'
        content='Fill out the form below to sign in for an existing account'
      /> 
    <Form style={{ minWidth: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>

    <FormField className="email">
      <label>Email</label>
      <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)}/>
    </FormField>
    <FormField className="password">
      <label>Password</label>
      <input type="text" placeholder="Password" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
    </FormField>
    
    <Button type='submit'>Submit</Button>
  </Form>
  </div>     
   
  );

  
};

const StudentSignin = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  
      //Backend TODO
    const handleSignup = async () => {
  
    };
  
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    return (
        <div>
    <Message
        attached
        header='Welcome back!'
        content='Fill out the form below to sign in for an existing account'
      /> 
    <Form style={{ minWidth: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>

    <FormField className="email">
      <label>Email</label>
      <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)}/>
    </FormField>
    <FormField className="password">
      <label>Password</label>
      <input type="text" placeholder="Password" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
    </FormField>
    
    <Button type='submit'>Submit</Button>
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
        display: 'grid',
        placeItems: 'center',
        backgroundColor: '#f0f0f0'
      }}>
        <h1>{isInstructor ? 'Instructor' : 'Student'} Sign in Page</h1>
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
