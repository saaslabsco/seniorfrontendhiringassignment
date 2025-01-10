import { render, screen } from '@testing-library/react';
import TableRow from './index.tsx';

test('render table body with correct title', () => {
    const mock = [1,2,3]
  render(<TableRow data={mock} />);
  const textEle = screen.getByText(/1/i);
  expect(textEle).toBeInTheDocument();
});
