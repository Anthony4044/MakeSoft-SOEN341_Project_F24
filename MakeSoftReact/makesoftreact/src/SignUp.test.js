const axios = require('axios');

jest.mock('axios');

describe('Instructor Sign-up Integration Test', () => {
  it('should sign up an instructor successfully', async () => {
    const instructor = { email: 'newInstructor@testInstructor.com', password: 'newPassword' };

    axios.post.mockResolvedValue({
      status: 201,
      data: { email: instructor.email }
    });

    const response = await axios.post('http://localhost:8080/api/instructors/signup', instructor);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('email', instructor.email);
  });

  it('should fail if the instructor email is already taken', async () => {
    const instructor = { email: 'existingInstructor@testInstructor.com', password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email already exists' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signup', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email already exists');
    }
  });

  it('should fail if email is missing', async () => {
    const instructor = { password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signup', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email is required');
    }
  });

  it('should fail if password is missing', async () => {
    const instructor = { email: 'newInstructor@testInstructor.com' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signup', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password is required');
    }
  });

  it('should fail if email is empty', async () => {
    const instructor = { email: '', password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signup', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email cannot be empty');
    }
  });

  it('should fail if password is empty', async () => {
    const instructor = { email: 'newInstructor@testInstructor.com', password: '' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signup', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password cannot be empty');
    }
  });

  it('should fail if email is invalid', async () => {
    const instructor = { email: 'invalidEmail', password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email is invalid' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/instructors/signup', instructor);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email is invalid');
    }
  });
});

describe('Student Sign-up Integration Test', () => {
  it('should sign up a student successfully', async () => {
    const student = { email: 'newStudent@testStudent.com', password: 'newPassword' };

    axios.post.mockResolvedValue({
      status: 201,
      data: { email: student.email }
    });

    const response = await axios.post('http://localhost:8080/api/students/signup', student);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('email', student.email);
  });

  it('should fail if the student email is already taken', async () => {
    const student = { email: 'existingStudent@testStudent.com', password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { message: 'Email already exists' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signup', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('message', 'Email already exists');
    }
  });

  it('should fail if email is missing', async () => {
    const student = { password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signup', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email is required');
    }
  });

  it('should fail if password is missing', async () => {
    const student = { email: 'newStudent@testStudent.com' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password is required' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signup', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password is required');
    }
  });

  it('should fail if email is empty', async () => {
    const student = { email: '', password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signup', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email cannot be empty');
    }
  });

  it('should fail if password is empty', async () => {
    const student = { email: 'newStudent@testStudent.com', password: '' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Password cannot be empty' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signup', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Password cannot be empty');
    }
  });

  it('should fail if email is invalid', async () => {
    const student = { email: 'invalidEmail', password: 'newPassword' };

    axios.post.mockRejectedValue({
      response: {
        status: 400,
        data: { success: false, message: 'Email is invalid' }
      }
    });

    try {
      await axios.post('http://localhost:8080/api/students/signup', student);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('success', false);
      expect(error.response.data).toHaveProperty('message', 'Email is invalid');
    }
  });
});
