import { render, screen, waitFor } from '@testing-library/react';
import Table from 'components/Table';
import useFetchData from 'hooks/useFetchData';
import '@testing-library/jest-dom';

jest.mock('hooks/useFetchData');

const mockUseFetchData = useFetchData as jest.Mock;

describe('Table Component', () => {
  it('displays a loading spinner while fetching data', () => {
    mockUseFetchData.mockReturnValue({ data: [], loading: true, error: null });

    render(<Table data={[]} loading={true} error={null} />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('displays error message if there is an error fetching data', async () => {
    mockUseFetchData.mockReturnValue({
      data: [],
      loading: false,
      error: 'Failed to load data. Please try again later.',
    });

    render(
      <Table
        data={[]}
        loading={false}
        error="Failed to load data. Please try again later."
      />
    );

    const errorMessage = await screen.findByText(/Failed to load data/);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays data when fetched successfully', async () => {
    const mockData = [
      {
        's.no': 1,
        'percentage.funded': 45,
        'amt.pledged': 1000,
      },
      {
        's.no': 2,
        'percentage.funded': 75,
        'amt.pledged': 2000,
      },
    ];

    mockUseFetchData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<Table data={mockData} loading={false} error={null} />);

    await waitFor(() => {
      const firstRowAmount = screen.getByText('1,000');
      const secondRowAmount = screen.getByText('2,000');
      expect(firstRowAmount).toBeInTheDocument();
      expect(secondRowAmount).toBeInTheDocument();
    });
  });
});
