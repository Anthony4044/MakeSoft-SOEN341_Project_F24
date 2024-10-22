import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css'
// import { FormField, Button, ButtonContent, Icon, Checkbox, Form, FormInput, FormGroup } from 'semantic-ui-react'
// import {
//   Radio, Segment, Label, Message
// } from 'semantic-ui-react'
// import conco_library from './Conco-library.jpg';

import { Boxes } from './components/ui/background-boxes';
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input"; 
import { cn } from "./utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import {Slider} from "@nextui-org/react";

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
        <div className={"dark"}>
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xxl text-neutral-800 dark:text-neutral-200">
            Welcome Back!
          </h2>
          <div className="button-container w-60 ">
                  <span className="button-background" />
                  <span className="button-content font-bold-span">
                    Instructor
                  </span>
          </div>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 p-2 w-80">
            Login to your instructor account
          </p>
          <form className="form">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input type="email" placeholder="cena.icecream@.chill.bing.cn
              "className="textfield" value={email} onChange={(e) => setEmail(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="••••••••" value={password}  className="textfield" value={password} onChange={(e) => setPassword(e.target.value)}  />
            </LabelInputContainer>

            <button
              className="signin signup bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              onClick={handleSignin}
            >
              Sign up &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
              >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  GitHub
                </span>
                <BottomGradient />
              </button>
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
              >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Google
                </span>
                <BottomGradient />
              </button>
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
              >
                <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  OnlyFans
                </span>
                <BottomGradient />
              </button>
            </div>
          </form>
        </div>
      </div>
    );









      {/* <Message className="welcome"
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
 className="textfield" value={password} onChange={(e) => setPassword(e.target.value)}          <label style={{ fontSize: '18px' }}>Password</label>
          <input type="password" placeholder="Password" />
        </FormField>

        <Button animated className="signup" onClick={handleSignin} style={{ hover: 'green' }}>
          <ButtonContent visible>Sign In</ButtonContent>
          <ButtonContent hidden>
            <Icon name='arrow right' />
          </ButtonContent>
        </Button>
      </Form> */}
    </div>

  );


};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
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
        alert(student.studentId);
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
          <div className={"dark"}>
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xxl text-neutral-800 dark:text-neutral-200">
          Welcome Back!
        </h2>
        <div className="button-container w-60 ">
                <span className="button-background" />
                <span className="button-content font-bold-span">
                  Student
                </span>
        </div>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 p-2 w-80">
          Login to your student account
        </p>

                <form className="form">
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input placeholder="cena.icecream@.chill.bing.cn
                  " type="email" value={email} className="textfield" value={email} onChange={(e) => setEmail(e.target.value)} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" placeholder="••••••••" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)}  />
                </LabelInputContainer>

                <button
                  className="signup bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                  onClick={handleSignin2}
                >
                  Sign up &rarr;
                  <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                  <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
                  >
                    <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      GitHub
                    </span>
                    <BottomGradient />
                  </button>
                  <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
                  >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Google
                    </span>
                    <BottomGradient />
                  </button>
                  <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="button"
                  >
                    <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                      OnlyFans
                    </span>
                    <BottomGradient />
                  </button>
                </div>
              </form>
            </div>
          </div>




        </div>
      );    





    
  //   <div>
  //     <Message className="welcome"
  //       attached
  //       header='Welcome back!'
  //       content='Fill out the form below to sign in for an existing account'
  //     />
  //     <Form style={{ minWidth: '600px', padding: '20px', backgroundColor: '#f0f0f0' }}>

  //       <FormField className="email">
  //         <label style={{ fontSize: '18px' }}>Email</label>
  //         <input type="text" placeholder="Email" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)} />
  //       </FormField>
  //       <FormField className="password">
  //         <label style={{ fontSize: '18px' }}>Password</label>
  //         <input type={isPasswordVisible ? 'text' : 'password'} placeholder="Password" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
          
  //       </FormField>

  //       <Button animated className="signup" onClick={handleSignin2} style={{ hover: 'green' }}>
  //         <ButtonContent visible>Sign In</ButtonContent>
  //         <ButtonContent hidden>
  //           <Icon name='arrow right' />
  //         </ButtonContent>
  //       </Button>
  //     </Form>
  //   </div>
  // );
};

const SignInPage = (props) => {
  const [isInstructor, setIsInstructor] = useState(true);

  const toggleSignup = () => {
    setIsInstructor(!isInstructor);
  };

  

  return (

    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg bg-wrapper">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <div style={{
          display: 'flex',

          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '70%',

        
        }} className=" relative z-20 max-height-95">
          
      <div className='w-full m-5 '>  
        <h2 className="flex justify-between items-center font-bold text-xl text-neutral-800 arrow">
          <span className="flex-grow text-left">Student</span>
          <span className="mx-2">⇆</span>
          <span className="flex-grow text-right">Instructor</span>
        </h2>
        <div className="flex flex-col items-center justify-center ">        
          <Slider   
          size="lg"
          step={1}
          color="secondary"
          label=""
          showSteps={true} 
          maxValue={1} 
          minValue={0} 
          defaultValue={0.6}
          className="slider" 
          checked={isInstructor} onChange={toggleSignup}/>
          </div>
        </div>    
  

        <div>
        {isInstructor ? <InstructorSignin onInstructorSignin={props.onInstructorSignin} /> : <StudentSignin onStudentSignin={props.onStudentSignin} />}
        </div>
        
      </div>
      </div>



    // <div style={{
    //   backgroundImage: `url(${conco_library})`,
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   minHeight: '100vh', // Full height of viewport
    //   width: '100%', // Full width of viewport
    //   backgroundSize: 'cover', // Ensure image covers entire background
    //   backgroundPosition: 'center', // Center the image
    //   backgroundRepeat: 'no-repeat', // Prevent repetition of the image
    // }} className="moving-background">
    //   <h1 className="Title2" style={{ color: 'black' }}>{isInstructor ? 'Instructor' : 'Student'} Sign in Page</h1>
    //   <Segment compact style={{
    //     backgroundColor: '#f0f0f0',
    //     border: 'none',
    //   }}>
    //     <Label size='big' style={{
    //       transform: 'translateY(-5px)'
    //     }} basic>Student</Label>
    //     <Radio toggle checked={isInstructor} onChange={toggleSignup} /><Label size='big' style={{
    //       transform: 'translateY(-5px)'
    //     }} basic>Instructor</Label>
    //   </Segment>
    //   <div>
    //     {isInstructor ? <InstructorSignin onInstructorSignin={props.onInstructorSignin} /> : <StudentSignin onStudentSignin={props.onStudentSignin} />}
    //   </div>
    // </div>
  );
};



export default SignInPage;
