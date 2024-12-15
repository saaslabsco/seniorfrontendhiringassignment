import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table'; // Adjust the import as needed
import { vi } from 'vitest';
import { useSaasLabsContext, SaasLabsProvider } from '../context/context';

// Mock the context module
vi.mock('../context/context', () => ({
  // Mock useSaasLabsContext to return mock values
  useSaasLabsContext: vi.fn(),
  // Mock the SaasLabsProvider
  SaasLabsProvider: ({ children }) => <div>{children}</div>,
}));

describe('Table Component', () => {
  it('renders loading state', () => {
    // Mock the context values
    const mockContextValue = {
      loading: true, // Simulating the loading state
      error: null,
    };

    // Get the mock function from the context module
    useSaasLabsContext.mockReturnValue(mockContextValue);

    // Render the Table component inside the mocked provider
    const { getByText } = render(
      <SaasLabsProvider>
        <Table />
      </SaasLabsProvider>
    );

    // Assert that the loading state is rendered, you may need to adjust based on your component's behavior
    expect(getByText('Loading .....')).toBeInTheDocument();
  });


  it('renders data correctly on table', () => {
    // Mock the context values
    const mockContextValue = {
      loading: false, // Simulating the loading state
      error: null,
      currentRows: [
        { "s.no": 1, "percentage.funded": "50%", "amt.pledged": "$5000" },
        { "s.no": 2, "percentage.funded": "70%", "amt.pledged": "$7000" },
      ],  // Mock currentRows data
    };

    // Get the mock function from the context module
    useSaasLabsContext.mockReturnValue(mockContextValue);

    // Render the Table component inside the mocked provider
    const { getByText } = render(
      <SaasLabsProvider>
        <Table />
      </SaasLabsProvider>
    );

    // Assert that the loading state is rendered, you may need to adjust based on your component's behavior
    expect(getByText('50%')).toBeInTheDocument();
    expect(getByText('$5000')).toBeInTheDocument();
    expect(getByText('70%')).toBeInTheDocument();
    expect(getByText('$7000')).toBeInTheDocument();

  });
});
