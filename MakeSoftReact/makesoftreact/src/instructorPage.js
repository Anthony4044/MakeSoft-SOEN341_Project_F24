
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Vortex } from './components/ui/vortex';
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { cn } from "./utils/cn";
import "./instructorPage.css"

// Reusable BottomGradient Component (Declared Once)
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition-opacity duration-500 opacity-0 absolute h-px w-full -bottom-px left-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition-opacity duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px left-1/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

// Reusable LabelInputContainer Component
const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

// Instructor Page Component
const InstructorPage = ({ instructor, handleSummarizedResults }) => {
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');
  const [teamColors, setTeamColors] = useState({});

  useEffect(() => {
    if (instructor) {
      fetchStudents();
      fetchTeams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructor]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/instructors/${instructor.section}/students`
      );
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setMessage('Error fetching students.');
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/instructors/${instructor.section}/teams`
      );

      const teamsWithColor = (response.data || []).map((team) => {
        if (!teamColors[team.teamName]) {
          teamColors[team.teamName] = getRandomDarkColor();
        }
        return { ...team, color: teamColors[team.teamName] };
      });

      setTeams(teamsWithColor);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setMessage('Error fetching teams.');
    }
  };

  const getRandomDarkColor = () => {
    const colors = [
      '#2980b9', // Medium blue
      '#8e44ad', // Medium purple
      '#9b59b6', // Soft violet
      '#e84393', // Soft pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName) {
      setMessage('Please enter a team name.');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    const team = {
      teamName,
      section: instructor.section,
      studentIds: [],
      teamMembers: [], // Start with an empty team
      color: getRandomDarkColor(),
    };

    try {
      await axios.post(
        `http://localhost:8080/api/instructors/${instructor.section}/teams`,
        team
      );
      setMessage(`${team.teamName} has been created successfully!`);
      setTeamName('');
      fetchTeams();
    } catch (error) {
      console.error('Error creating team:', error);
      setMessage('Failed to create team.');
    }
  };

  const handleAssignStudent = async (studentId, teamName) => {
    try {
      await axios.post(
        `http://localhost:8080/api/instructors/${instructor.section}/teams/${teamName}/addStudent`,
        { studentId }
      );
      setMessage(`${studentId} has been assigned to ${teamName}.`);
      fetchStudents();
      fetchTeams();
    } catch (error) {
      console.error('Error assigning student:', error);
      setMessage('Failed to assign student.');
    }
  };



  const handleRemoveStudent = async (studentId, teamName) => {
    try {
      await axios.post(
        `http://localhost:8080/api/instructors/${instructor.section}/teams/${teamName}/removeStudent`,
        { studentId }
      );
      setMessage(`Removed ${studentId} from ${teamName}.`);
      fetchStudents();
      fetchTeams();
    } catch (error) {
      console.error('Error removing student:', error);
      setMessage('Failed to remove student from team.');
    }
  };

  const unassignedStudents = students.filter(
    (student) => !teams.some((team) => team.studentIds.includes(student.studentId))
  );

  const teamOptions = teams.map((team) => ({
    key: team.teamName,
    text: team.teamName,
    value: team.teamName,
  }));

  if (!instructor) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-red-500">No instructor data available.</p>
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
            Welcome {instructor.name}!
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Your section number is: {instructor.section}
          </h2>
        </div>
        <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {/* Create Team Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr" >
          <form className="space-y-4" onSubmit={handleCreateTeam}>
            <LabelInputContainer>
              <Label className="text-xl" htmlFor="team-name">Create Team:</Label>
              <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              <Input
                id="team-name"
                type="text"
                placeholder="Enter Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </LabelInputContainer>
            <button
              className="relative group/btn bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 w-full text-white rounded-md h-10 font-medium"
              type="submit"
            >
              Make the Team &rarr;
              <BottomGradient />
            </button>
          </form>
          {message && (
            <div className="mt-4 text-center text-green-500 dark:text-green-300">
              {message}
            </div>
          )}
        </div>

        {/* Unassigned Students */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 outer-wr">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Unassigned Students:
          </h2>
          <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          {unassignedStudents.length > 0 ? (
            <ul className="space-y-4">
              {unassignedStudents.map((student) => (
                <li
                  key={student.studentId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 p-4 rounded-md inner-wr"
                >
                  <span className="text-neutral-700 dark:text-neutral-300 mb-2 sm:mb-0">
                    {student.name} ({student.studentId})
                  </span>
                  <select
                    className="mt-2 sm:mt-0 sm:ml-4 block w-full sm:w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-300 sel-wr"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAssignStudent(student.studentId, e.target.value);
                        e.target.value = ''; // Reset the select
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Assign to team
                    </option>
                    {teamOptions.map((option) => (
                      <option key={option.key} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">
              All students are assigned to teams.
            </p>
          )}
        </div>

        {/* Teams List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 outer-wr">
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            <button
              className="relative group/btn bg-zinc-800 text-white rounded-md h-10 font-medium px-4"
              onClick={() => handleSummarizedResults()}
            >
              Summarized Results
              <BottomGradient />
            </button>Teams:
          </h2>
          <div className=" bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          {teams.length > 0 ? (
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.teamName} className="bg-gray-100 bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 p-4 rounded-md shadow">
                  <h3
                    className="text-lg sm:text-xl font-bold text-white rounded-md text-center mb-2"
                    style={{ backgroundColor: team.color }}
                  >
                    {team.teamName}
                  </h3>
                  {team.studentIds.length > 0 ? (
                    <ul className="space-y-2">
                      {team.studentIds.map((studentId) => {
                        const student = students.find((s) => s.studentId === studentId);
                        return (
                          <li
                            key={studentId}
                            className="flex items-center justify-between bg-gradient-to-br from-black to-neutral-600 dark:from-zinc-900 dark:to-zinc-900 p-2 rounded-md"
                          >
                            <span className="text-neutral-700 dark:text-neutral-300 inner-wr">
                              {student ? `${student.name} (${student.studentId})` : `Student ID: ${studentId}`}
                            </span>
                            <button
                              className="relative group/btn bg-zinc-800 text-white rounded-md h-10 font-medium px-4"
                              onClick={() => handleRemoveStudent(studentId, team.teamName)}
                            >
                              Remove
                              <BottomGradient />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-neutral-600 dark:text-neutral-300">
                      No students assigned.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-neutral-600 dark:text-neutral-300">
              No teams created yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
