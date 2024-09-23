import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'
import {
  ButtonContent, Button, Icon, FormField, Form, FormInput,
  FormGroup,
  Message,
} from 'semantic-ui-react'
import { Radio, Segment } from 'semantic-ui-react'
import { Label } from 'semantic-ui-react'


// Instructor Signup Form
const InstructorSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');

  const handleSignup = async () => {
    const instructor = { name, email, password, section };
    try {
     const response = await axios.post('http://localhost:8080/api/instructors/signup', instructor);
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to sign up.');
    }
  };

  return (

    <div>
      <Message
        attached
        header='Welcome to our site!'
        content='Fill out the form below to sign-up for a new account'
      />
      <Form style={{ minWidth: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <FormField>
          <label>Name</label>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormField>
        <FormField>
          <label>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <FormField>
          <label>Section</label>
          <input type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} />
        </FormField>
        <FormField>
          <label>Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <Button animated onClick={handleSignup}>
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

  const handleSignup = async () => {
    const student = { studentId, name, email, password, section };
    try {
      // Send POST request to sign up student
      const response = await axios.post('http://localhost:8080/api/students/signup', student);

      // Check if the signup was successful (assuming the backend sends success message in response)
      if (response.data === true) {
        alert('Student signed up successfully!');
      } else {
        alert('Student section does not exist!');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to sign up.');
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div>
      <Message
        attached
        header='Welcome to our site!'
        content='Fill out the form below to sign-up for a new account'
      />
      <Form style={{ minWidth: '800px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <FormGroup widths='equal'>
          <FormInput fluid label='Student ID' type="text" placeholder="ID Number" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
          <FormInput fluid label='Student Name' type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FormInput fluid label='Student Name' type="text" placeholder="Section" value={section} onChange={(e) => setSection(e.target.value)} />
        </FormGroup>
        <FormField>
          <label>Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>
        <FormField>
          <label>Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <Button animated onClick={handleSignup}>
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
      display: 'grid',
      placeItems: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <h1>{isInstructor ? 'Instructor' : 'Student'} Signup Page</h1>
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
