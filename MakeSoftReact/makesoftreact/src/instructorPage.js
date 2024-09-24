
// InstructorPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Message, Dropdown } from 'semantic-ui-react';

const InstructorPage = ({ instructor }) => {
  // Move all Hook calls to the top level
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');

  // Update useEffect to check for instructor
  useEffect(() => {
    if (instructor) {
      fetchStudents();
      fetchTeams();
    }
  }, [instructor]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/instructors/${instructor.section}/students`
      );
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/instructors/${instructor.section}/teams`
      );
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleAddTeam = async () => {
    if (!teamName || selectedStudents.length === 0) {
      setMessage('Please enter a team name and select students.');
      return;
    }

    const team = {
      teamName,
      section: instructor.section,
      studentIds: selectedStudents,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/instructors/${instructor.section}/teams`,
        team
      );
      setMessage(response.data);
      setTeamName('');
      setSelectedStudents([]);
      fetchTeams();
    } catch (error) {
      console.error('Error adding team:', error);
      setMessage('Failed to add team.');
    }
  };

  // Move the conditional return AFTER the Hooks
  if (!instructor) {
    return <div>No instructor data available.</div>;
  }

  // Prepare student options for the dropdown
  const studentOptions = students.map((student) => ({
    key: student.studentId,
    text: `${student.name} (${student.studentId})`,
    value: student.studentId,
  }));

  return (
    <div>
      <h1>Welcome, {instructor.name}!</h1>
      <h2>Section: {instructor.section}</h2>

      <h3>Add a Team</h3>
      <Form>
        <Form.Field>
          <label>Team Name</label>
          <input
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Select Students</label>
          <Dropdown
            placeholder="Select Students"
            fluid
            multiple
            selection
            options={studentOptions}
            value={selectedStudents}
            onChange={(e, { value }) => setSelectedStudents(value)}
          />
        </Form.Field>
        <Button onClick={handleAddTeam}>Add Team</Button>
      </Form>

      {message && <Message content={message} />}

      <h3>Teams</h3>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            <strong>{team.teamName}</strong>: {team.studentIds.join(', ')}
          </li>
        ))}
      </ul>

      <h3>All Students in Section {instructor.section}</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.studentId} - {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorPage;
