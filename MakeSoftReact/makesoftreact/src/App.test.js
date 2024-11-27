import React from 'react'; // Add this line
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
jest.mock('@tensorflow/tfjs', () => ({
  __esModule: true,
  tensor: jest.fn(),
  dispose: jest.fn(),
}));

jest.mock('@tensorflow-models/toxicity', () => ({
  __esModule: true,
  load: jest.fn().mockResolvedValue({
    classify: jest.fn().mockResolvedValue([]),
  }),
}));

test('renders Peer Evaluation heading', () => {
  render(<App />);
  // Replace 'Your text here' with actual text you expect from App.js
  const element = screen.getByText(/peer evaluation/i);
  expect(element).toBeInTheDocument();
});
