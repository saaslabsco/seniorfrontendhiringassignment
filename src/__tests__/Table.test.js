// Table.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

const fakeData = [
  { "s.no": 1, "percentage.funded": 50, "amt.pledged": 1000 },
  { "s.no": 2, "percentage.funded": 75, "amt.pledged": 2000 },
];

describe('Table Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => fakeData,
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('renders table headers after fetching data', async () => {
    render(<Table />);

    const header1 = await screen.findByText('S.No.');
    const header2 = screen.getByText('Percentage Funded');
    const header3 = screen.getByText('Amount Pledged');

    expect(header1).toBeInTheDocument();
    expect(header2).toBeInTheDocument();
    expect(header3).toBeInTheDocument();
  });

  test('renders table rows with fetched data', async () => {
    render(<Table />);

    const firstCell = await screen.findByText('1');
    const percentageCell = screen.getByText(/50%/i);
    const amountCell = screen.getByText(/\$1,000/i);

    expect(firstCell).toBeInTheDocument();
    expect(percentageCell).toBeInTheDocument();
    expect(amountCell).toBeInTheDocument();
  });
});
