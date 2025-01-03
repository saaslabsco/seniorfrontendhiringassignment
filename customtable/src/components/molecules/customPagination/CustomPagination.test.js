import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomPagination from './CustomPagination';

test('renders pagination buttons correctly', () => {
  render(<CustomPagination rowsPerPage={5} totalRecords={20} pagination={() => {}} currentPage={1} />);
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
});

test('calls pagination function on button click', () => {
  const paginateMock = jest.fn();
  render(<CustomPagination rowsPerPage={5} totalRecords={20} pagination={paginateMock} currentPage={1} />);
  fireEvent.click(screen.getByText('2'));
  expect(paginateMock).toHaveBeenCalledWith(2);
});
