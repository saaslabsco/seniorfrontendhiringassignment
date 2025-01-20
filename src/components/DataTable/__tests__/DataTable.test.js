import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

//component
import DataTable from '../DataTable';

//constants
import { TEST_IDS } from '../Constants';

//helpers
import * as helpers from '../helpers';


global.fetch = jest.fn();

const mockData = [
  { "s.no": 1, "percentage.funded": "50", "amt.pledged": "500" },
  { "s.no": 2, "percentage.funded": "75", "amt.pledged": "750" },
];


beforeEach(() => {
    fetch.mockClear();
  });

  describe('DataTable Component', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders the project title', () => {
      const { getAllByTestId } = render(<DataTable />);
      const element = getAllByTestId(TEST_IDS.PROJECT_TITLE);
      expect(element.length).toBe(1);
    });

    it('displays Placeholder while loading', async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: () => mockData });
      const { getByTestId } = render(<DataTable />);
      expect(getByTestId(TEST_IDS.PROJECT_TITLE)).toBeInTheDocument();
      expect(getByTestId(TEST_IDS.PLACEHOLER)).toBeInTheDocument();
      await waitFor(() => expect(fetch).toHaveBeenCalled());
    });

    it('displays ErrorPage on API error', async () => {
      fetch.mockRejectedValueOnce(new Error('API failure'));
      const { getByTestId } = render(<DataTable />);
      await waitFor(() => expect(fetch).toHaveBeenCalled());
      expect(getByTestId(TEST_IDS.ERROR)).toBeInTheDocument();
    });

    it('displays ResultNotFound when no data is returned', async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: () => [] });
      const { getByTestId } = render(<DataTable />);
      await waitFor(() => {
        expect(getByTestId(TEST_IDS.NO_RESULT)).toBeInTheDocument();
      });
    });
    
    it('displays data table and pagination when data is available', async () => {
      fetch.mockResolvedValueOnce({ ok: true, json: () => mockData });
      const { getByTestId } = render(<DataTable />);
      await waitFor(() => {
        expect(getByTestId(TEST_IDS.DATA_TABLE)).toBeInTheDocument();
        expect(getByTestId(TEST_IDS.PAGINATION_CONTROLS)).toBeInTheDocument();
      });
      
    });

    it('handles pagination correctly', async () => {
      const paginatedData = { pageItems: mockData.slice(0, 2), totalPages: 2 };
      jest.spyOn(helpers, 'paginateData').mockReturnValue(paginatedData);

      fetch.mockResolvedValueOnce({ ok: true, json: () => mockData });
      const { getByTestId } = render(<DataTable />);
  
      // Wait for data to load
      await waitFor(() => {
        expect(getByTestId(TEST_IDS.PAGE_NUMBER)).toBeInTheDocument();
      });
      
      const nextCta = getByTestId(TEST_IDS.BUTTON_NEXT);
      // Click next page
      fireEvent.click(nextCta);
      await waitFor(() => {
        const element = getByTestId(TEST_IDS.PAGE_NUMBER);
        expect(element).toBeInTheDocument();
        expect(element.textContent).toBe('Page 2 of 2');
      });
  
      // Click previous page
      const prevCta = getByTestId(TEST_IDS.BUTTON_PREV);
      fireEvent.click(prevCta);
      await waitFor(() => {
        const element = getByTestId(TEST_IDS.PAGE_NUMBER);
        expect(element).toBeInTheDocument();
        expect(element.textContent).toBe('Page 1 of 2');
      });
    });

  })