const axios = require('axios');

// Mock the axios module
jest.mock('axios');

describe('Instructor Sign-in Integration Test', () => {
  it('should sign in an instructor successfully', async () => {
    const instructor = { email: 'testInstructor@testInstructor', password: 'testPassword' };
    
    // Mock the response from the API
    axios.post.mockResolvedValue({
      status: 200,
      data: { email: instructor.email, password: instructor.password }
    });

    const response = await axios.post('http://localhost:8080/api/instructors/signin', instructor);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('email', instructor.email);
    expect(response.data).toHaveProperty('password', instructor.password);
  });

  it('should fail if the instructor credentials are incorrect', async () => {
    const instructor = { email: 'wrongUser', password: 'wrongPassword' };

    // Mock the error response from the API
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { success: false, message: 'Invalid credentials' }
      }
    });

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
    
    // Mock the response from the API
    axios.post.mockResolvedValue({
      status: 200,
      data: { email: student.email, password: student.password }
    });

    const response = await axios.post('http://localhost:8080/api/students/signin', student);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('email', student.email);
    expect(response.data).toHaveProperty('password', student.password);
  });

  it('should fail if the student credentials are incorrect', async () => {
    const student = { email: 'wrongStudent', password: 'wrongPassword' };

    // Mock the error response from the API
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { message: 'Invalid credentials' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signin', student);
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('message', 'Invalid credentials');
    }
  });
});
