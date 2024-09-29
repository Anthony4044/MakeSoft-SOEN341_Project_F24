import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css'
import { FormField, Button, ButtonContent, Icon, Checkbox, Form, FormInput, FormGroup } from 'semantic-ui-react'
import {
  Radio, Segment, Label, Message
} from 'semantic-ui-react'

import conco_library from './Conco-library.jpg';

// Instructor Signup Form
const InstructorSignin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');

  
  //Backend TODO
  const handleSignin = async () => {
    const instructor = { email, password, name, section };
    try {
      const response = await axios.post('http://localhost:8080/api/instructors/signin', instructor);
      if (response.data) {
        instructor.id = response.data.id;
        instructor.email = response.data.email;
        instructor.name = response.data.name;
        instructor.section = response.data.section;
        alert(response.data.name + ' signed in successfully!');
        if (props.onInstructorSignin) {
          props.onInstructorSignin(instructor);
        }

      }
      else {
        alert('Failed to sign in. Instructor not found.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to sign in.');
    }

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
          <label style={{ fontSize: '18px' }}>Email</label>
          <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <FormField className="password">
          <label style={{ fontSize: '18px' }}>Password</label>
          <input type="password" placeholder="Password" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormField>

        <Button animated className="signup" onClick={handleSignin} style={{ hover: 'green' }}>
          <ButtonContent visible>Sign In</ButtonContent>
          <ButtonContent hidden>
            <Icon name='arrow right' />
          </ButtonContent>
        </Button>
      </Form>
    </div>

  );


};

const StudentSignin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSignin2 = async () => {
    const student = { email, password, name, section, studentId};
    
    try {
      const response = await axios.post('http://localhost:8080/api/students/signin', student);
      
      if (response.data) {
        student.email = response.data.email;
        student.name = response.data.name;
        student.section = response.data.section;
        student.studentId = response.data.studentId;
        alert(response.data.name + ' signed in successfully!');
        if (props.onStudentSignin) {
          props.onStudentSignin(student);
        }
      }
      else {
        alert('Failed to sign in. Student not found.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to sign in.');
    }

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
          <label style={{ fontSize: '18px' }}>Email</label>
          <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormField>
        <FormField className="password">
          <label style={{ fontSize: '18px' }}>Password</label>
          <input type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
          
        </FormField>

        <Button animated className="signup" onClick={handleSignin2} style={{ hover: 'green' }}>
          <ButtonContent visible>Sign In</ButtonContent>
          <ButtonContent hidden>
            <Icon name='arrow right' />
          </ButtonContent>
        </Button>
      </Form>
    </div>
  );
};

const SignInPage = (props) => {
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
    }} className="moving-background">
      <h1 className="Title2" style={{ color: 'black' }}>{isInstructor ? 'Instructor' : 'Student'} Sign in Page</h1>
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
        {isInstructor ? <InstructorSignin onInstructorSignin={props.onInstructorSignin} /> : <StudentSignin onStudentSignin={props.onStudentSignin} />}
      </div>
    </div>
  );
};



export default SignInPage;
