import { render, screen } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination', () => {
    it('should render the Pagination component', async () => {
        render(<Pagination />);
        expect(await screen.findByLabelText('pagination navigation')).toBeInTheDocument();
    });

    it('should render the Pagination component with page numbers and next and previous buttons', async () => {
        render(<Pagination dataLength={10} pageSize={5} onPageChange={() => {}} />);
        let buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(3);
        expect(buttons[0]).toHaveTextContent('1');
        expect(buttons[1]).toHaveTextContent('2');
        expect(buttons[2]).toHaveTextContent('Next');

        expect(buttons[0]).toHaveClass('selected-btn');
        await buttons[1].click();
        expect(buttons[1]).toHaveClass('selected-btn');
        buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(3);
        expect(buttons[0]).toHaveTextContent('Previous');
        expect(buttons[1]).toHaveTextContent('1');
        expect(buttons[2]).toHaveTextContent('2');

        await buttons[2].click();
        expect(buttons[2]).toHaveClass('selected-btn');

        await buttons[0].click();
        buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(3);
        expect(buttons[0]).toHaveTextContent('1');
        expect(buttons[1]).toHaveTextContent('2');
        expect(buttons[2]).toHaveTextContent('Next');

        expect(buttons[0]).toHaveClass('selected-btn');
    });

    it('should render the Pagination component with 5 number buttons', async () => {
        render(<Pagination dataLength={30} pageSize={5} onPageChange={() => {}} />);
        let buttons = await screen.findAllByRole('button');

        expect(buttons).toHaveLength(6);
        expect(buttons[0]).toHaveTextContent('1');
        expect(buttons[1]).toHaveTextContent('2');
        expect(buttons[2]).toHaveTextContent('3');
        expect(buttons[3]).toHaveTextContent('4');
        expect(buttons[4]).toHaveTextContent('5');
        expect(buttons[5]).toHaveTextContent('Next');

        await buttons[1].click();
        buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(7);
        expect(buttons[0]).toHaveTextContent('Previous');
        expect(buttons[1]).toHaveTextContent('2');
        expect(buttons[2]).toHaveTextContent('3');
        expect(buttons[3]).toHaveTextContent('4');
        expect(buttons[4]).toHaveTextContent('5');
        expect(buttons[5]).toHaveTextContent('6');
        expect(buttons[6]).toHaveTextContent('Next');
        expect(buttons[1]).toHaveClass('selected-btn');

        await buttons[6].click();
        buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(7);
        expect(buttons[0]).toHaveTextContent('Previous');
        expect(buttons[1]).toHaveTextContent('2');
        expect(buttons[2]).toHaveTextContent('3');
        expect(buttons[3]).toHaveTextContent('4');
        expect(buttons[4]).toHaveTextContent('5');
        expect(buttons[5]).toHaveTextContent('6');
        expect(buttons[6]).toHaveTextContent('Next');
        expect(buttons[2]).toHaveClass('selected-btn');

        await buttons[5].click();
        buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(6);
        expect(buttons[0]).toHaveTextContent('Previous');
        expect(buttons[1]).toHaveTextContent('2');
        expect(buttons[2]).toHaveTextContent('3');
        expect(buttons[3]).toHaveTextContent('4');
        expect(buttons[4]).toHaveTextContent('5');
        expect(buttons[5]).toHaveTextContent('6');
        expect(buttons[5]).toHaveClass('selected-btn');
    });

    it('should handle for single page', async () => {
        render(<Pagination dataLength={5} pageSize={5} onPageChange={() => {}} />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(1);
        expect(buttons[0]).toHaveTextContent('1');
    });

    it('should call onPageChange with correct page number', async () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination dataLength={15} pageSize={5} onPageChange={mockOnPageChange} />);
        const buttons = await screen.findAllByRole('button');
        
        await buttons[1].click();
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
        
        await buttons[0].click();
        expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });
});
