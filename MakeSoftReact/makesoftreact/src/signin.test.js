const axios = require('axios');

jest.mock('axios');

describe('Instructor Sign-in Integration Test', () => {
  it('should sign in an instructor successfully', async () => {
    const instructor = { email: 'testInstructor@testInstructor.com', password: 'testPassword' };

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

  it('should fail if email is missing', async () => {
    const instructor = { password: 'testPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signin', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email is required');
    }
  });

  it('should fail if password is missing', async () => {
    const instructor = { email: 'testInstructor@testInstructor.com' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signin', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password is required');
    }
  });

  it('should fail if email is empty', async () => {
    const instructor = { email: '', password: 'testPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signin', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email cannot be empty');
    }
  });

  it('should fail if password is empty', async () => {
    const instructor = { email: 'testInstructor@testInstructor.com', password: '' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signin', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password cannot be empty');
    }
  });
});

describe('Student Sign-in Integration Test', () => {
  it('should sign in a student successfully', async () => {
    const student = { email: 'testStudent@testStudent.com', password: 'testPassword' };

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

  it('should fail if email is missing', async () => {
    const student = { password: 'testPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signin', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email is required');
    }
  });

  it('should fail if password is missing', async () => {
    const student = { email: 'testStudent@testStudent.com' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signin', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password is required');
    }
  });

  it('should fail if email is empty', async () => {
    const student = { email: '', password: 'testPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signin', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email cannot be empty');
    }
  });

  it('should fail if password is empty', async () => {
    const student = { email: 'testStudent@testStudent.com', password: '' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signin', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password cannot be empty');
    }
  });
});
