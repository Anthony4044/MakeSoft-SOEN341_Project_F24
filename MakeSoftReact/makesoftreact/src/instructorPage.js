import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Message, Dropdown, Header, List } from 'semantic-ui-react';
import './instructorPage.css'
import conco_library from './Conco-library.jpg';
import concordia from './concordia.jpg';
import 'animate.css';


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

  const [teamColors, setTeamColors] = useState({});

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/instructors/${instructor.section}/teams`
      );

      const teamsWithColor = response.data.map((team) => {
        if (!teamColors[team.teamName]) {
          teamColors[team.teamName] = getRandomDarkColor();
        }
        return { ...team, color: teamColors[team.teamName] };
      });

      setTeams(response.data);
      setTeams(teamsWithColor);

    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName) {
      setMessage('Please enter a team name.');
      setTimeout(() => setMessage(''), 20000);
      return;
    }

    const team = {
      teamName,
      section: instructor.section,
      studentIds: [], // Start with an empty team
      color: getRandomDarkColor(),
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


  function getRandomDarkColor() {
    // Generate low RGB values (0-100) to keep the color dark
    const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const colors = [
  '#e74c3c', // Soft red
  '#f39c12', // Warm yellow (goldenrod)
  '#2980b9', // Medium blue
  '#8e44ad', // Medium purple
  '#2ecc71', // Bright green
  '#e67e22', // Orange
  '#3498db', // Light blue
  '#95a5a6', // Light gray
  '#9b59b6', // Soft violet
  '#34495e', // Dark slate
  '#16a085', // Teal
  '#d35400', // Rusty orange
  '#c0392b', // Strong red
  '#27ae60', // Medium green
  '#7f8c8d', // Medium gray
  '#e84393',  // Soft pink
  '#719CCD',
  '#A2CD71',
  '71CD71',
  '8371CD'
];

  return (
    <div className="background2" style={{backgroundImage: `url(${concordia})`, 
    backgroundPosition: 'center', 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', 
     backgroundAttachment: 'fixed',
    minHeight: '100vh', // Full height of viewport
    width: '100%'  }}>

      <div class="animate__animated animate__bounceIn" className="cube">
      <div className="welcome2">
      <Header className ='Inst-header' as="h1">Welcome {instructor.name}!</Header>
      <Header className ='Inst-header'as="h2">Your section number is: {instructor.section}</Header>
      </div>
      </div>
      <br></br><br></br><br></br>
      <Form className ='Inst-boxWrapper' onSubmit={handleCreateTeam}>
        <Form.Field className ='Inst-teamField'>
          <label className ='Inst-elemHeader'>Create team:</label>
          <input
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </Form.Field>
        <Button className ='Inst-button' type="submit">Make the team</Button>
      </Form>

      {message && <Message className="custom-message" content={message} />}

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
            <Header style=
            {{ backgroundColor: team.color, color: 'white' , fontStyle: 'italic', 
              fontWeight: 'bold', borderRadius: '10px', marginLeft: '30%', width: '40%',
              textAlign: 'center' 

            }}
            
            className ='Inst-teamHeader' as="h3">{team.teamName}:</Header>
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