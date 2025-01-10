import { render, screen } from '@testing-library/react';
import TableHeader from './index.tsx';

test('render table header with correct title', () => {
  render(<TableHeader item={'S.No.'} />);
  const textEle = screen.getByText(/S.No./i);
  expect(textEle).toBeInTheDocument();
});
