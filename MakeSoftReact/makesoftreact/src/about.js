import React from 'react';
import { Vortex } from './components/ui/vortex';
import { BackgroundGradient } from './components/ui/light_border';

const InfoPage = () => {
  return (
    <div className="dark">
      {/* Vortex Background */}
      <div className="fixed inset-0 z-0">
        <Vortex backgroundColor="black" className="w-full h-full" />
      </div>

      <div className="flex justify-center items-center w-full h-full mt-60">
        <BackgroundGradient className="rounded-[22px] max-w-5xl w-full p-4 sm:p-10 bg-white dark:bg-zinc-900">

          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            What is MakeSoft Peer Evaluation?
            <div className=" my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </h1>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <span className="text-red-600 font-semibold">
              MakeSoft Peer Assessment System</span> is designed for university 
              team projects, allowing students to evaluate their teammates based on 
              cooperation, conceptual contribution, practical contribution, and work 
              ethic. The system is meant to promote accountability and provide feedback 
              to both students and instructors about individual contributions. Instructors can manage 
              teams, monitor performance, and export results for grading purposes.
          </p>

        </BackgroundGradient>
      </div>

      <div className="flex justify-center items-center w-full h-full mt-20">
        <BackgroundGradient className="rounded-[22px] max-w-5xl w-full p-4 sm:p-10 bg-white dark:bg-zinc-900">

          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          How to Use It
          </h1>

          

          <h1 className=" flex justify-left items-left text-xl  font-bold text-neutral-800 dark:text-neutral-200">
            For Teachers
          </h1>

          <div className="  bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />

          <p className=" text-l text-neutral-600 dark:text-neutral-400">
          For <span className="text-red-600 font-semibold">Teachers</span>, create an account and sign in. Once you log in, you'll have access to all students that signed up on the website, and you'll be able to assign teams by adding students from the same section. After that, you can modify teams, remove, and add students.
          </p>

          

          <h1 className=" mt-16 flex justify-left items-left text-xl  font-bold text-neutral-800 dark:text-neutral-200">
            For Students
          </h1>

          <div className="  bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />

          <p className=" text-l text-neutral-600 dark:text-neutral-400">
          If you are a <span className="text-red-600 font-semibold">Student</span>, create an account as well and sign in. Then you'll see all the teams available and can join a team that hasn't reached its maximum capacity.
          </p>

        </BackgroundGradient>
      </div>

      <div className="flex justify-center items-center w-full h-full mt-20">
        <BackgroundGradient className="rounded-[22px] max-w-5xl w-full p-4 sm:p-10 bg-white dark:bg-zinc-900">

          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          Contact Us
            <div className=" my-2 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </h1>

          <p className="text-l text-neutral-600 dark:text-neutral-400">
          <p className=" text-neutral-700 dark:text-neutral-300">
              We'll be glad to answer any inquiries at MakeSoft@gmail.com 
              <br/>
              Phone number: +1 514 534 6356
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
            </p>
          </p>

        </BackgroundGradient>
      </div>
    </div>
  );
};

export default InfoPage;