import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Message, Dropdown, Header, List } from 'semantic-ui-react';
import './instructorPage.css'

const InstructorPage = ({ instructor }) => {
  const [students, setStudents] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');

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

  const handleCreateTeam = async () => {
    if (!teamName) {
      setMessage('Please enter a team name.');
      return;
    }

    const team = {
      teamName,
      section: instructor.section,
      studentIds: [], // Start with an empty team
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/instructors/${instructor.section}/teams`,
        team
      );
      setMessage(response.data);
      setTeamName('');
      fetchTeams();
    } catch (error) {
      console.error('Error creating team:', error);
      setMessage('Failed to create team.');
    }
  };

  const handleAssignStudent = async (studentId, teamName) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/instructors/${instructor.section}/teams/${teamName}/addStudent`,
        { studentId }
      );
      setMessage(response.data);
      fetchStudents();
      fetchTeams();
    } catch (error) {
      console.error('Error assigning student:', error);
      setMessage('Failed to assign student.');
    }
  };

  const handleRemoveStudent = async (studentId, teamName) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/instructors/${instructor.section}/teams/${teamName}/removeStudent`,
        { studentId }
      );
      setMessage(response.data);
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
    return <div>No instructor data available.</div>;
  }

  return (
    <div>
      <Header className ='Inst-header' as="h1">Hello, {instructor.name}</Header>
      <Header className ='Inst-header'as="h2">Your section: {instructor.section}</Header>

      <Form className ='Inst-boxWrapper' onSubmit={handleCreateTeam}>
        <Form.Field className ='Inst-teamField'>
          <label className ='Inst-elemHeader'>Create team:</label>
          <input
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Form.Field>
        <Button class ='Inst-button'type="submit">Make the team</Button>
      </Form>

      {message && <Message content={message} />}
      <div class='Inst-boxWrapper'>
        <Header className ='Inst-elemHeader' as="h1">Unassigned Students:</Header>
        <List className ='Inst-list' divided>
          {unassignedStudents.map((student) => (
            <List.Item key={student.studentId}>
              <List.Content floated="right">
                <Dropdown
                  placeholder="Assign to team"
                  selection
                  options={teamOptions}
                  onChange={(e, { value }) => handleAssignStudent(student.studentId, value)}
                />
              </List.Content>
              <List.Content>
                {student.name} ({student.studentId})
              </List.Content>
            </List.Item>
          ))}
        </List>
        </div>
      <div class='Inst-boxWrapper'>
        <Header className ='Inst-elemHeader' as="h1">Teams:</Header>
        {teams.map((team) => (
          <div class='Inst-teamWrapper' key={team.teamName}>
            <Header className ='Inst-teamHeader' as="h3">{team.teamName}:</Header>
            <List className ='Inst-teamlist' bulleted>
              {team.studentIds.map((studentId) => {
                const student = students.find((s) => s.studentId === studentId);
                return (
                  <List.Item class= 'Inst-teamItem' key={studentId}>
                    {student ? `${student.name} (${student.studentId})` : `Student ID: ${studentId}`}
                    <Button
                      size="small"
                      class='Inst-remove' 
                      onClick={() => handleRemoveStudent(studentId, team.teamName)}
                    >
                      Remove
                    </Button>
                  </List.Item>
                );
              })}
            </List>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorPage;