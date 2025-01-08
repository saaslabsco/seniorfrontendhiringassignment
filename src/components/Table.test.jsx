import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';
import { vi } from 'vitest';
import { useSaasLabsContext, SaasLabsProvider } from '../context/context';

vi.mock('../context/context', () => ({
  useSaasLabsContext: vi.fn(),
  SaasLabsProvider: ({ children }) => <div>{children}</div>,
}));

describe('Table Component', () => {
  it('renders loading state', () => {
    const mockContextValue = {
      loading: true,
      error: null,
    };

    useSaasLabsContext.mockReturnValue(mockContextValue);

    const { getByText } = render(
      <SaasLabsProvider>
        <Table />
      </SaasLabsProvider>
    );

    expect(getByText('Loading .....')).toBeInTheDocument();
  });


  it('renders data correctly on table', () => {
    const mockContextValue = {
      loading: false,
      error: null,
      currentRows: [
        { "s.no": 1, "percentage.funded": "50%", "amt.pledged": "$5000" },
        { "s.no": 2, "percentage.funded": "70%", "amt.pledged": "$7000" },
      ],
    };

    useSaasLabsContext.mockReturnValue(mockContextValue);

    const { getByText } = render(
      <SaasLabsProvider>
        <Table />
      </SaasLabsProvider>
    );

    expect(getByText('50%')).toBeInTheDocument();
    expect(getByText('$5000')).toBeInTheDocument();
    expect(getByText('70%')).toBeInTheDocument();
    expect(getByText('$7000')).toBeInTheDocument();

  });
});
