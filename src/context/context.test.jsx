import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { SaasLabsProvider, useSaasLabsContext } from './context';

vi.stubGlobal('fetch', vi.fn());

describe('SaasLabsProvider', () => {
  it('fetches data successfully and renders it', async () => {
    const mockData = [
      { "s.no": 1, "percentage.funded": "50%", "amt.pledged": "$5000" },
      { "s.no": 2, "percentage.funded": "70%", "amt.pledged": "$7000" }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(
      <SaasLabsProvider>
        <TestComponent />
      </SaasLabsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('$5000')).toBeInTheDocument();
      expect(screen.getByText('70%')).toBeInTheDocument();
      expect(screen.getByText('$7000')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <SaasLabsProvider>
        <TestComponent />
      </SaasLabsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });
});

function TestComponent() {
  const { data, loading, error } = useSaasLabsContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Catalog</h2>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item["s.no"]}>
              <td>{item["s.no"]}</td>
              <td>{item["percentage.funded"]}</td>
              <td>{item["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
