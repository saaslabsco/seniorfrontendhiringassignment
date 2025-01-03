import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTable from './CustomTable';

const mockData = [
  { percentage_funded: 186, amt_pledged: 15283 },
  { percentage_funded: 95, amt_pledged: 4500 },
];

test('renders the table headers correctly', () => {
  render(<CustomTable data={mockData} />);
  expect(screen.getByText('S.No.')).toBeInTheDocument();
  expect(screen.getByText('Percentage Funded')).toBeInTheDocument();
  expect(screen.getByText('Amount Pledged')).toBeInTheDocument();
});

test('renders the correct number of rows', () => {
  render(<CustomTable data={mockData} />);
  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(3);
});
