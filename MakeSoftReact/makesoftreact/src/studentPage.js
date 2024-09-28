import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Message, Dropdown, Header, List, ListContent } from 'semantic-ui-react';
import './instructorPage.css'



const StudentPage = ({ student }) => {
  const [teamName, setTeamName] = useState('');
  const [section, setSection] = useState('');
  const [teamMembers,setTeamMembers] = useState([]);

  const team = { teamName, section, teamMembers };

  //TODO to receive a team object that the student is in.
  const fetchTeam = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/students/findTeam', student);
      team.teamName = (response.data.teamName);
      team.section = (response.data.section);
      team.teamMembers = (response.data.teamMembers);

    } catch (error) {
      alert('Error fetching team');
      console.error('Error fetching team', error);
    }
    
  };
  fetchTeam();
  return (
    <div className='Inst-boxWrapper'>
      <Header className='Inst-elemHeader' as="h1">Team Members:</Header>
      <List className="Inst-teamlist" bulleted>


        //TODO to display the team members in a list **FIRAS**
      {team.teamMembers.map((member, index) => (
        <List.Item key={index}>{member.name}</List.Item>
      ))}
</List>
    </div>
  );
};

export default StudentPage;