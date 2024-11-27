import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { cn } from './utils/cn';
import "./studentPage.css"

// Reusable BottomGradient Component 
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px left-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px left-1/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Student Page Component
const StudentPage = ({ student, handleEvaluationForm }) => {
  const [teamName, setTeamName] = useState('');
  const [section, setSection] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const hasAlerted = useRef(false);

  useEffect(() => {
    const fetchTeam = async () => {
      const team = { teamName, section };

      try {
        const response = await axios.get(
          `http://localhost:8080/api/students/${student.studentId}/addTeam`
        );

        try {
          const response2 = await axios.get(
            `http://localhost:8080/api/students/${student.studentId}/teamMembers`
          );
          setTeamMembers(response2.data || []);
        } catch (e) {
          console.error('Error fetching team members', e);
         
        }
        setTeamName(response.data.teamName);
        setSection(response.data.section);
        setStudentIds(response.data.studentIds || []);
      } catch (error) {
        console.error('Error fetching team', error);
        if (!hasAlerted.current) {
          
          hasAlerted.current = true;
        }
      }
    };

    if (student) {
      fetchTeam(); // Only fetch if student prop is available
    }
  }, [student]); // The useEffect depends on student prop

  if (!student) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-red-500">No student data available.</p>
      </div>
    );
  }

  return (
    <div className="dark">
      {/* Vortex Background */}
      <div className="fixed inset-0 z-0">
        <Vortex backgroundColor="black" className="w-full h-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto p-6 pt-32">
        {/* Increase pt-32 to add more top padding to avoid navbar covering content */}
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome {student.name}!
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Your section number is: {student.section}
          </h2>
        </div>

        {/* Team Name */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Team Name:
            <span
              className="ml-4 font-bold text-2xl text-indigo-500 dark:text-indigo-300"
              style={{
                // textDecoration: 'underline',
                textShadow: '4px 4px 10px rgba(0, 0, 0, 0.7)',
              }}
            >
              {teamName || 'No team assigned'}
            </span>
          </h2>
        </div>

        {/* Team Members */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 outer-wr">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 ">
            Team Members:
          </h2>
          {teamMembers.length > 0 ? (
            <ul className="space-y-4">
              {teamMembers.map((member, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 p-4 rounded-md"
                >
                  <span className="text-neutral-700 dark:text-neutral-300 text-xl">
                    {member.name}
                  </span>
                  {student.studentId !== member.studentId && (
                    <button
                      className="relative group/btn bg-zinc-800 text-white rounded-md h-10 font-medium px-4"
                      onClick={() => handleEvaluationForm(member, student)}
                    >
                      Evaluate
                      <BottomGradient />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">
              No team members assigned.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
