// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Button, Message, List } from 'semantic-ui-react';

// const InstructorPage = () => {
//   const [teamName, setTeamName] = useState('');
//   const [section, setSection] = useState('');
//   const [studentIds, setStudentIds] = useState('');
//   const [message, setMessage] = useState('');
//   const [students, setStudents] = useState([]); // Changed from teams to students for clarity

//   // Function to create a team
//   const createTeam = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/teams/create', {
//         teamName,
//         section,
//         studentIds: studentIds.split(','), // Split by comma for multiple students
//       });
//       setMessage(response.data);
//       fetchStudentsBySection(section); // Refresh students list
//     } catch (error) {
//       console.error(error);
//       setMessage('Failed to create team.');
//     }
//   };

//   // Function to fetch students by section
//   const fetchStudentsBySection = async (section) => {
//     try {
//       // Make a request to the backend to get the list of students by section
//       const response = await axios.get(`http://localhost:8080/api/instructors/${section}/students`);
      
//       // Assuming the response data contains the list of students
//       setStudents(response.data); // Changed from setTeams to setStudents
//     } catch (error) {
//       console.error('Error fetching students by section:', error);
//     }
//   };

//   useEffect(() => {
//     if (section) {
//       fetchStudentsBySection(section);
//     }
//   }, [section]);

//   return (
//     <div>
//       <h1>Instructor Page</h1>
//       <Form>
//         <Form.Field>
//           <label>Team Name</label>
//           <input placeholder="Enter Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
//         </Form.Field>
//         <Form.Field>
//           <label>Section</label>
//           <input placeholder="Enter Section" value={section} onChange={(e) => setSection(e.target.value)} />
//         </Form.Field>
//         <Form.Field>
//           <label>Student IDs (comma separated)</label>
//           <input placeholder="Enter Student IDs" value={studentIds} onChange={(e) => setStudentIds(e.target.value)} />
//         </Form.Field>
//         <Button onClick={createTeam}>Create Team</Button>
//       </Form>

//       {message && <Message content={message} />}

//       <h1>Students in Section {section}</h1>
//       <ul>
//         {students.map((student, index) => (
//           <li key={index}>
//             {student.name} - {student.email} - Team {student.team}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const InstructorPage = () => {
//   const [section, setSection] = useState('');  // Section input state
//   const [students, setStudents] = useState([]);

//   // Fetch students for the entered section
//   const fetchStudents = async (section) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/instructors/${section}/students`);
//       setStudents(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   const handleSectionChange = (e) => {
//     const newSection = e.target.value; // Store the new section value first
//     setSection(newSection); // Update the section state
  
//     // Fetch students whenever the section changes
//     if (newSection) {
//       fetchStudents(newSection); // Fetch students with the updated section value
//     }
//   };

//   const handleFetchStudents = () => {
//     if (section) {
//       fetchStudents(section);  // Fetch students when button is clicked
//     }
//   };

//   return (
//     <div>
//       <h1>Instructor Page</h1>

//       <label>Enter Section:</label>
//       <input
//         type="text"
//         value={section}
//         onChange={handleSectionChange}
//         placeholder="Type section"
//       />
//       <button onClick={handleFetchStudents}>Fetch Students</button>

//       <h2>Students in Section {section}</h2>
//       <ul>
//         {students.length > 0 ? (
//           students.map((student, index) => (
//             <li key={index}>
//               {student.studentId} - {student.name} - {student.email} - Team {student.team}
//             </li>
//           ))
//         ) : (
//           <li>No students found for this section.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default InstructorPage;



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
