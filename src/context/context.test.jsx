import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { SaasLabsProvider, useSaasLabsContext } from './context'; // adjust path as needed

// Mock the fetch globally for the test
vi.stubGlobal('fetch', vi.fn());

describe('SaasLabsProvider', () => {
  it('fetches data successfully and renders it', async () => {
    // Mock data that will be returned by the fetch call
    const mockData = [
      { "s.no": 1, "percentage.funded": "50%", "amt.pledged": "$5000" },
      { "s.no": 2, "percentage.funded": "70%", "amt.pledged": "$7000" }
    ];

    // Mock the fetch function to resolve with mock data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    // Render the component with the provider
    render(
      <SaasLabsProvider>
        <TestComponent />
      </SaasLabsProvider>
    );

    // Wait for the data to be loaded and ensure the table renders
    await waitFor(() => {
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByText('$5000')).toBeInTheDocument();
      expect(screen.getByText('70%')).toBeInTheDocument();
      expect(screen.getByText('$7000')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    // Mock fetch to simulate an error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    // Render the component with the provider
    render(
      <SaasLabsProvider>
        <TestComponent />
      </SaasLabsProvider>
    );

    // Wait for the error to appear on screen
    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });
});

// A simple test component to consume context and render data
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
