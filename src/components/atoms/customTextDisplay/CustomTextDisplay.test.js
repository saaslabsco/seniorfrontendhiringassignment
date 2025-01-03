import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTextDisplay from './CustomTextDisplay';

describe('CustomTextDisplay Component', () => {
  test('renders the message correctly', () => {
    const message = 'This is a test message!';
    
    render(<CustomTextDisplay message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test('displays an empty string when no message is passed', () => {
    render(<CustomTextDisplay message={''} />);
    expect(screen.getAllByText('')[0]).toBeInTheDocument();
  });
});
