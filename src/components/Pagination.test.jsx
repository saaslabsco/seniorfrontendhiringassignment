import React from 'react';
import { render } from '@testing-library/react';
import Pagination from './Pagination'; // Adjust the import as needed
import { vi } from 'vitest';
import { SaasLabsProvider, useSaasLabsContext } from '../context/context';

// Mock the context module
vi.mock('../context/context', () => ({
  // Mock useSaasLabsContext to return mock values
  useSaasLabsContext: vi.fn(),
  // Mock the SaasLabsProvider to simply render children
  SaasLabsProvider: ({ children }) => <div>{children}</div>,
}));

describe('Pagination Component', () => {
  it('renders pagination buttons', () => {
    // Mock the context values with currentPage greater than 1
    const mockContextValue = {
      currentPage: 2, // Adjust the page to ensure "First" and "Prev" are shown
      totalPages: 5,
      changePage: vi.fn(),
    };

    // Get the mock function from the context module
    useSaasLabsContext.mockReturnValue(mockContextValue);

    // Render the Pagination component inside the mocked provider
    const { getByRole } = render(
      <SaasLabsProvider>
        <Pagination />
      </SaasLabsProvider>
    );

    // Check for the pagination buttons
    expect(getByRole('button', { name: /first/i })).toBeInTheDocument(); // "First" button
    expect(getByRole('button', { name: /prev/i })).toBeInTheDocument(); // "Prev" button
    expect(getByRole('button', { name: /1/i })).toBeInTheDocument(); // Page number 1 button
    expect(getByRole('button', { name: /next/i })).toBeInTheDocument(); // "Next" button
    expect(getByRole('button', { name: /last/i })).toBeInTheDocument(); // "Last" button
  });
});
