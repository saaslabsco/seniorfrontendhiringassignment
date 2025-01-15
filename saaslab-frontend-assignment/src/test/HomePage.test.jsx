import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import HomePage from '../components/HomePage';

vi.stubGlobal('fetch', vi.fn());

describe('HomePage Component', () => {
  const mockApiData = [
    { 's.no': 1, 'percentage.funded': '75%', 'amt.pledged': '$10,000' },
    { 's.no': 2, 'percentage.funded': '50%', 'amt.pledged': '$5,000' },
    { 's.no': 3, 'percentage.funded': '50%', 'amt.pledged': '$5,000' },
    { 's.no': 4, 'percentage.funded': '50%', 'amt.pledged': '$5,000' },
    { 's.no': 5, 'percentage.funded': '50%', 'amt.pledged': '$5,000' },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('displays loading state initially', () => {
    render(<HomePage />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('displays error message when API call fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load Data')).toBeInTheDocument();
    });
  });

  test('renders table with correct number of rows after successful API call', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockApiData),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Project fund table')).toBeInTheDocument();
    });

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(6); // 1 header row + 5 data rows in mock data
  });
});
