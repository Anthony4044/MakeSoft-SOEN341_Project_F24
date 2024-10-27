const axios = require('axios');

describe('Instructor Sign-in Integration Test', () => {
  it('should sign in an instructor successfully', async () => {
    const instructor = { email: 'testInstructor@testInstructor', password: 'testPassword' };
    const response = await axios.post('http://localhost:8080/api/instructors/signin', instructor);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('email', instructor.email);
    expect(response.data).toHaveProperty('password', instructor.password);
   

  });

  it('should fail if the instructor credentials are incorrect', async () => {
    const instructor = { username: 'wrongUser', password: 'wrongPassword' };
    try {
      await axios.post('http://localhost:8080/api/instructors/signin', instructor);
    } catch (error) {

      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Invalid credentials'); 
    }
  });
});

describe('Student Sign-in Integration Test', () => {
    it('should sign in a student successfully', async () => {
      const student = { email: 'testStudent@testStudent', password: 'testPassword' };
      const response = await axios.post('http://localhost:8080/api/students/signin', student);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('email', student.email);
      expect(response.data).toHaveProperty('password', student.password);
    });

    it('should fail if the student credentials are incorrect', async () => {
      const student = { username: 'wrongStudent', password: 'wrongPassword' };
      try {
        await axios.post('http://localhost:8080/api/students/signin', student);
      } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data).toHaveProperty('message', 'Invalid credentials'); 
      }
    });
  });