import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';
import { PAGINATION_TEXT } from '../../config/constants';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    handlePrevious: jest.fn(),
    handleNext: jest.fn(),
  };

  test('renders pagination with correct text and buttons', () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText(PAGINATION_TEXT.previous)).toBeInTheDocument();
    expect(screen.getByText(PAGINATION_TEXT.next)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${PAGINATION_TEXT.pageLabel} ${defaultProps.currentPage} ${PAGINATION_TEXT.of} ${defaultProps.totalPages}`
      )
    ).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    expect(screen.getByText(PAGINATION_TEXT.previous)).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={defaultProps.totalPages} />);

    expect(screen.getByText(PAGINATION_TEXT.next)).toBeDisabled();
  });

  test('calls handlePrevious on previous button click', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    fireEvent.click(screen.getByText(PAGINATION_TEXT.previous));

    expect(defaultProps.handlePrevious).toHaveBeenCalledTimes(1);
  });

  test('calls handleNext on next button click', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    fireEvent.click(screen.getByText(PAGINATION_TEXT.next));

    expect(defaultProps.handleNext).toHaveBeenCalledTimes(1);
  });

  test('handles pluralization correctly for multiple pages', () => {
    render(<Pagination {...defaultProps} totalPages={5} />);

    expect(screen.getByText(PAGINATION_TEXT.pagesLabel, { exact: false })).toBeInTheDocument();
  });

  test('does not show plural label for a single page', () => {
    render(<Pagination {...defaultProps} totalPages={1} />);

    expect(screen.queryByText(PAGINATION_TEXT.pagesLabel)).not.toBeInTheDocument();
  });
});
