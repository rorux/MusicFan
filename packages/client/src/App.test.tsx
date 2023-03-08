import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should have hello world', () => {
  render(<App />);
  const message = screen.queryByText(/Hello World/i);
  expect(message).toBeVisible();
});
