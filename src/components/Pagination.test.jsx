import React from 'react';
import { render } from '@testing-library/react';
import Pagination from './Pagination'; // Adjust the import as needed
import { vi } from 'vitest';
import { SaasLabsProvider, useSaasLabsContext } from '../context/context';

vi.mock('../context/context', () => ({
  useSaasLabsContext: vi.fn(),
  SaasLabsProvider: ({ children }) => <div>{children}</div>,
}));

describe('Pagination Component', () => {
  it('renders pagination buttons', () => {
    const mockContextValue = {
      currentPage: 2,
      totalPages: 5,
      changePage: vi.fn(),
    };

    useSaasLabsContext.mockReturnValue(mockContextValue);

    const { getByRole } = render(
      <SaasLabsProvider>
        <Pagination />
      </SaasLabsProvider>
    );

    expect(getByRole('button', { name: /first/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /1/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /next/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /last/i })).toBeInTheDocument();
  });
});
