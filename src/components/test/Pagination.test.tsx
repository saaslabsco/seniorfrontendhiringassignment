import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from 'components/Pagination';

describe('Pagination Component', () => {
  it('displays the correct number of page buttons', () => {
    const mockOnPageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(7);
  });

  it('calls onPageChange when a page number is clicked', () => {
    const mockOnPageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const page2Button = screen.getByText('2');
    userEvent.click(page2Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('disables the previous button on the first page', () => {
    const mockOnPageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const previousButton = screen.getByLabelText('Previous page');
    expect(previousButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    const mockOnPageChange = jest.fn();
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });
});
