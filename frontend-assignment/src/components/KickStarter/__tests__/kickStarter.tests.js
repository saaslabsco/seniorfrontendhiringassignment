import { render, screen } from '@testing-library/react';
import KickStarter from '../KickStarter';

describe('KickStarter', () => {
    it('should render the KickStarter component', async () => {
        render(<KickStarter />);
        expect(await screen.findByRole('table')).toBeInTheDocument();
        const headers = await screen.findAllByRole('columnheader');
        expect(headers[0]).toHaveTextContent('S.No');
        expect(headers[1]).toHaveTextContent('Percentage Funded');
        expect(headers[2]).toHaveTextContent('Amount Pledged');
    });

    it('should render the KickStarter component with 5 rows', async () => {
        render(<KickStarter />);
        const rows = await screen.findAllByRole('row');
        expect(rows).toHaveLength(6);
    });

    it('should render the Pagination component', async () => {
        render(<KickStarter />);
        const pagination = await screen.findByRole('navigation', { name: /pagination navigation/i });
        expect(pagination).toBeInTheDocument();
    });
});