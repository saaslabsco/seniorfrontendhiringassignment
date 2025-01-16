import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  const handlePageChange = vi.fn();
  const totalPages = 7;

  test('disables Previous button on the first page', () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={1}
        onPageChange={handlePageChange}
      />,
    );
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  test('disables Next button on the last page', () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={7}
        onPageChange={handlePageChange}
      />,
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls handlePageChange when a page number is clicked', () => {
    render(
      <Pagination
        totalPages={totalPages}
        currentPage={5}
        onPageChange={handlePageChange}
      />,
    );

    const page3Button = screen.getByText('3');
    fireEvent.click(page3Button);

    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
});
