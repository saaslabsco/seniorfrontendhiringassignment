import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

const columns = [
  { header: 'S.No', accessor: 's.no' },
  { header: 'Percentage Funded', accessor: 'percentage.funded' },
  { header: 'Amount Pledged', accessor: 'amt.pledged' },
];

const data = [
  { 's.no': 1, 'percentage.funded': '50%', 'amt.pledged': '$500' },
  { 's.no': 2, 'percentage.funded': '75%', 'amt.pledged': '$750' },
];

describe('Table Component', () => {
  test('renders table headers correctly', () => {
    render(<Table columns={columns} data={data} />);

    columns.forEach((col) => {
      expect(screen.getByText(col.header)).toBeInTheDocument();
    });
  });

  test('renders table rows correctly', () => {
    render(<Table columns={columns} data={data} />);

    data.forEach((row) => {
      columns.forEach((col) => {
        expect(screen.getByText(row[col.accessor])).toBeInTheDocument();
      });
    });
  });

  test('renders an empty table when no data is provided', () => {
    render(<Table columns={columns} data={[]} />);

    const rows = screen.queryAllByRole('row');
    expect(rows.length).toBe(1); // Only the header row should exist
  });

  test('applies custom className when provided', () => {
    const customClass = 'custom-table-class';
    render(<Table columns={columns} data={data} className={customClass} />);

    // eslint-disable-next-line testing-library/no-node-access
    const tableContainer = screen.getByRole('table').closest('div');
    expect(tableContainer).toHaveClass(customClass);
  });

  test('table headers have correct accessibility attributes', () => {
    render(<Table columns={columns} data={data} />);

    const headers = screen.getAllByRole('columnheader');
    headers.forEach((header) => {
      expect(header).toHaveAttribute('tabindex', '0');
      expect(header).toHaveAttribute('aria-sort', 'none');
    });
  });
});
