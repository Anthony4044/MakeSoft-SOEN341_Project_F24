import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'
import StudentPage from './studentPage';
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
const InstructorSignup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');

  //Backend TODO
  const handleSignup = async (e) => {
    e.preventDefault();
    const instructor = { name, email, password, section };
    try {
      const response = await axios.post('http://localhost:8080/api/instructors/signup', instructor);
      alert(instructor.name + "has signed up successfully");

      if (props.onInstructorSignup) {
        props.onInstructorSignup(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Instructor already Exists!");
    }
  };

  return (
    <div className={"dark"} onSubmit={handleSignup}>
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xxl text-neutral-800 dark:text-neutral-200">
          Welcome to Makesoft
        </h2>
        <div className="button-container w-60 ">
          <span className="button-background" />
          <span className="button-content font-bold-span">
            Instructor
          </span>
        </div>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 p-2">
          Login to your instructor account
        </p>
        <form className="form">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Full Name</Label>
              <Input type="text" placeholder="John Cena" value={name} onChange={(e) => setName(e.target.value)} required/>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Instructor Section</Label>
              <Input type="text" placeholder="1234" value={section} onChange={(e) => setSection(e.target.value)} required/>
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="instructor-email">Email Address</Label>
            <Input id="instructor-email" type="email" placeholder="cena.icecream@.chill.bing.cn" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </LabelInputContainer>

          <button
            className="signup bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
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

// Student Signup Form
const StudentSignup = (props) => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false); // Make sure this is defined

  const handleSignup = async (e) => {
    e.preventDefault();
    const student = { studentId, name, email, password, section };
    try {
      // Send POST request to sign up student
      const response = await axios.post('http://localhost:8080/api/students/signup', student);
  
      // Check if the signup was successful
      if (response.data) {
        alert('Success!');
        if (props.onStudentSignup) {
          props.onStudentSignup(response.data);
        }
      } else {
        // If response.data is null, signup failed
        alert('Failed to sign up.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during signup.');

    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div>
      <div className={"dark"}>
      <div className="max-w-sm sm:max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-neutral-800 dark:text-neutral-200">
        Welcome to Makesoft
      </h2>
      <div className="button-container w-60 ">
        <span className="button-background" />
        <span className="button-content font-bold-span">
          Student
        </span>
      </div>
      <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mt-2 dark:text-neutral-300 p-2">
        Sign up to become a student
      </p>

      <form className="form" onSubmit={handleSignup}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="student-fullname">Full Name</Label>
            <Input
              id="student-fullname"
              type="text"
              placeholder="John Cena"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="student-id">Student ID</Label>
            <Input
              id="student-id"
              type="text"
              placeholder="1234"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="student-section">Section</Label>
          <Input
            id="student-section"
            type="text"
            placeholder="Section 1"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="student-email">Email Address</Label>
          <Input
            id="student-email"
            type="email"
            placeholder="cena.icecream@.chill.bing.cn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="student-password">Password</Label>
          <Input
            id="student-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LabelInputContainer>

        <button
          className="signup bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
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

// Main Signup Page with Toggle Button
const SignupPage = (props) => {
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
            {isInstructor ? <InstructorSignup onInstructorSignup={props.onInstructorSignup} /> : <StudentSignup onStudentSignup={props.onStudentSignup} />}
            </div>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default SignupPage;
