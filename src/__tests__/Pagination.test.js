// Pagination.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const setup = (props) => {
    const defaultProps = {
      currentPage: 2,
      totalPages: 5,
      onPageChange: jest.fn(),
      ...props,
    };
    render(<Pagination {...defaultProps} />);
    return defaultProps;
  };

  test('renders pagination buttons correctly', () => {
    setup();

    const nav = screen.getByLabelText(/Pagination Navigation/i);
    expect(nav).toBeInTheDocument();

    const previousButton = screen.getByLabelText('Previous Page');
    const nextButton = screen.getByLabelText('Next Page');
    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    for (let i = 1; i <= 5; i++) {
      const pageButton = screen.getByRole('button', { name: `Page ${i}` });
      expect(pageButton).toBeInTheDocument();
    }
  });

  test('calls onPageChange when a different page button is clicked', () => {
    const { onPageChange, currentPage } = setup();

    const nextButton = screen.getByLabelText('Next Page');
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(currentPage + 1);

    const previousButton = screen.getByLabelText('Previous Page');
    fireEvent.click(previousButton);
    expect(onPageChange).toHaveBeenCalledWith(currentPage - 1);

    const pageThreeButton = screen.getByRole('button', { name: 'Page 3' });
    fireEvent.click(pageThreeButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
