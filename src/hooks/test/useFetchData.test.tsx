import { render, screen, waitFor } from '@testing-library/react';
import useFetchData from 'hooks/useFetchData';
import { ProjectProps } from 'type';

const TestComponent = ({ url }: { url: string }) => {
  const { data, loading, error } = useFetchData(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      {data.map((project: ProjectProps) => (
        <div key={project['s.no']}>{project['amt.pledged']}</div>
      ))}
    </div>
  );
};

describe('useFetchData Hook', () => {
  it('fetches data successfully', async () => {
    // Mocking the global fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: {
          get: () => 'application/json',
        },
        json: () =>
          Promise.resolve([
            { 's.no': 1, 'percentage.funded': 50, 'amt.pledged': 1000 },
          ]),
      } as unknown as Response)
    );

    render(
      <TestComponent url="https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json" />
    );

    await waitFor(() => {
      const amountText = screen.getByText('1000');
      expect(amountText).toBeInTheDocument();
    });
  });

  it('handles error when fetching data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          get: () => 'application/json',
        },
        json: () => Promise.resolve({}),
      } as unknown as Response)
    );

    render(
      <TestComponent url="https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json" />
    );

    await waitFor(() => {
      const errorText = screen.getByText(
        'Failed to load data. Please try again later.'
      );
      expect(errorText).toBeInTheDocument();
    });
  });
});
