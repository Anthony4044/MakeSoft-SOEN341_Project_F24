import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import './instructorPage.css';
import concordia from './concordia.jpg';
import './studentPage.css';

const StudentPage = ({ student, handleEvaluationForm }) => {
  
  const [teamName, setTeamName] = useState('');
  const [section, setSection] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [studentIds, setStudentIds] = useState([]);

 

  useEffect(() => {
    const fetchTeam = async () => {
      const team = {teamName, section};

      try {
        const response = await axios.get(
          `http://localhost:8080/api/students/${student.studentId}/addTeam`
        );
  
        team.teamName = response.data.teamName;
        team.section = response.data.section;
        //setTeamName(response.data.teamName);
        //setSection(response.data.section);
        alert(response.data.teamName);
        
      } catch (error) {
        console.error('Error fetching team', error);
        alert('Error fetching team');
      }
    };

    if (student) {
      fetchTeam(); // Only fetch if student prop is available
    }
  }, [student]); // The useEffect depends on student prop

  return (
    <div
      className="background2"
      style={{
        backgroundImage: `url(${concordia})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div className="welcome2">
        <Header className="Inst-header" as="h1">
          Welcome {student.name}!
        </Header>
        <Header className="Inst-header" as="h2">
          Your section number is: {student.section}
        </Header>
      </div>

      <div className="Inst-boxWrapper">
        <Header className="Inst-elemHeader" as="h1">
          Team Name:
          <span style={{ marginLeft: '30%', fontWeight: 'bold', fontSize: '27px', textDecoration: 'underline', textShadow: '4px 4px 10px rgba(0, 0, 0, 0.7)' }}>
            {teamName || 'No team assigned'}
          </span>
        </Header>
        <List className="Inst-teamlist" bulleted>

          <h2 style={{ fontSize: '25px', color: "rgb(78, 23, 23)", textShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)' }}>Team members</h2>
          {teamMembers.length > 0 ? (
            teamMembers.map((member, index) => (
              <List.Item class='Inst-teamItem-student' key={index}>{member.name}
                {student.studentId != member.studentId ? (
                  <button onClick={() => handleEvaluationForm(member, student)}> Evaluate </button>
                ) : null}
              </List.Item>
            ))
          ) : (
            <List.Item>No team members assigned</List.Item>
          )}

        </List>
        <br></br>
      </div>
    </div>
  );
};

export default StudentPage;
