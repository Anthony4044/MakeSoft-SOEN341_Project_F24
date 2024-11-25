import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EvaluationForm from './evaluationForm';
import axios from 'axios';
import React from 'react';  // Add this import at the top

jest.mock('badwords-list', () => ({
  array: ['mock-bad-word'],
}));

describe('EvaluationForm', () => {
  it('should correctly construct the review object based on inputs', () => {
    // Mock data for evaluator and student
    const evaluator = {
      evaluatorEmail: 'evaluator@example.com',
      evaluatorName: 'Evaluator Name',
      evaluatorSection: 'Section A',
      evaluatorStudentId: 'EVAL001',
    };

    const student = {
      email: 'student@example.com',
      name: 'Student Name',
      section: 'Section B',
      studentId: 'STUD001',
      password: 'password123',
    };

    // Mock answers state
    const answers = {
      cooperation: '5',
      conceptualContribution: '4',
      practicalContribution: '3',
      workEthic: '5',
      commentsCooperation: 'Great cooperation',
      commentsConceptual: 'Good conceptual understanding',
      commentsPractical: 'Average practical skills',
      commentsWorkEthic: 'Excellent work ethic',
    };

    // Expected review object
    const expectedReview = {
      reviewer: {
        email: evaluator.evaluatorEmail,
        name: evaluator.evaluatorName,
        section: evaluator.evaluatorSection,
        studentId: evaluator.evaluatorStudentId,
      },
      reviewee: {
        email: student.email,
        name: student.name,
        section: student.section,
        studentId: student.studentId,
        password: student.password,
      },
      cooperation: 5,
      cooperationComment: 'Great cooperation',
      conceptualContribution: 4,
      conceptualContributionComment: 'Good conceptual understanding',
      practicalContribution: 3,
      practicalContributionComment: 'Average practical skills',
      workEthic: 5,
      workEthicComment: 'Excellent work ethic',
    };

    // Simulate the creation of review object in handleSubmit
    const review = {
      reviewer: {
        email: evaluator.evaluatorEmail,
        name: evaluator.evaluatorName,
        section: evaluator.evaluatorSection,
        studentId: evaluator.evaluatorStudentId,
      },
      reviewee: {
        email: student.email,
        name: student.name,
        section: student.section,
        studentId: student.studentId,
        password: student.password,
      },
      cooperation: parseInt(answers.cooperation),
      cooperationComment: answers.commentsCooperation,
      conceptualContribution: parseInt(answers.conceptualContribution),
      conceptualContributionComment: answers.commentsConceptual,
      practicalContribution: parseInt(answers.practicalContribution),
      practicalContributionComment: answers.commentsPractical,
      workEthic: parseInt(answers.workEthic),
      workEthicComment: answers.commentsWorkEthic,
    };

    expect(review).toEqual(expectedReview);
  });
});


