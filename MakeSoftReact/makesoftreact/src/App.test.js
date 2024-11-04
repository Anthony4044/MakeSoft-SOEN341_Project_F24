import React from 'react'; // Add this line
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders Peer Evaluation heading', () => {
  render(<App />);
  // Replace 'Your text here' with actual text you expect from App.js
  const element = screen.getByText(/peer evaluation/i);
  expect(element).toBeInTheDocument();
});
