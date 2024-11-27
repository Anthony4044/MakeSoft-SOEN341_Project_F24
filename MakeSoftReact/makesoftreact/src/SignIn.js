import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css'

import { Boxes } from './components/ui/background-boxes';
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input"; 
import { cn } from "./utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Slider } from "@nextui-org/react";
import { Vortex } from './components/ui/vortex';

// Instructor Signup Form
const InstructorSignin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');

  //Backend TODO
  const handleSignin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    const instructor = { email, password, name, section }; // Prepare instructor object
    try {
      // Send POST request to backend API for instructor sign-in
      const response = await axios.post('http://localhost:8080/api/instructors/signin', instructor);
      if (response.data) {
        // Update instructor object with response data and show success alert
        instructor.id = response.data.id;
        instructor.email = response.data.email;
        instructor.name = response.data.name;
        instructor.section = response.data.section;
        alert(response.data.name + ' signed in successfully!');

        // Call the callback function passed via props if provided
        if (props.onInstructorSignin) {
          props.onInstructorSignin(instructor);
        }
      } 
      // Display an alert if sign-in fails
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
              <Input type="email" placeholder="cena.icecream@.chill.bing.cn" className="textfield" value={email} onChange={(e) => setEmail(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="••••••••" value={password} className="textfield" onChange={(e) => setPassword(e.target.value)} />
            </LabelInputContainer>

            <button
              className="signup bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={handleSignin}
            >
              Sign In &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
                onClick={() => alert('Sorry! We have not implemented this feature yet.')}
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
                onClick={() => alert('Sorry! We have not implemented this feature yet.')}
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
                onClick={() => alert('Naughty naughty! 😳')}
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
};

// Bottom gradient effect for buttons (used for hover effect)
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Helper component for the label and input container
const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

const StudentSignin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [studentId, setStudentId] = useState('');

  const handleSignin2 = async (e) => {
    e.preventDefault();
    const student = { email, password, name, section, studentId };

    try {
      const response = await axios.post('http://localhost:8080/api/students/signin', student);

      if (response.data) {
        student.email = response.data.email;
        student.name = response.data.name;
        student.section = response.data.section;
        student.studentId = response.data.studentId;
        alert(response.data.name + ' signed in successfully!');
        // alert(student.studentId);
        if (props.onStudentSignin) {
          props.onStudentSignin(student);
        }
      } else {
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
              <Input placeholder="cena.icecream@.chill.bing.cn" type="email" value={email} className="textfield" onChange={(e) => setEmail(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="••••••••" className="textfield" value={password} onChange={(e) => setPassword(e.target.value)} />
            </LabelInputContainer>

            <button
              className="signup bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              onClick={handleSignin2}
            >
              Sign in &rarr;
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <div className="flex flex-col space-y-4">
              <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="button"
                onClick={() => alert('Sorry! We have not implemented this feature yet.')}
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
                onClick={() => alert('Sorry! We have not implemented this feature yet.')}
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
                onClick={() => alert('Naughty naughty! 😳')}
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
};

const SignInPage = (props) => {
  const [isInstructor, setIsInstructor] = useState(true);

  const toggleSignup = () => {
    setIsInstructor(!isInstructor);
  };

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden bg-wrapper">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="h-96 relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg bg-wrapper">
          <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: '70%',
            }}
            className="relative z-20 max-height-95"
          >
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
                  checked={isInstructor} onChange={toggleSignup}
                />
              </div>
            </div>

            <div>
              {isInstructor ? <InstructorSignin onInstructorSignin={props.onInstructorSignin} /> : <StudentSignin onStudentSignin={props.onStudentSignin} />}
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default SignInPage;
