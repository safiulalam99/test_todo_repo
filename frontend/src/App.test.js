import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders tasks', () => {
  render(<App />);
  const linkElement = screen.getByText(/TASKS/i);
  expect(linkElement).toBeInTheDocument();
});
