import { recordsPerPage } from '../constant';
import { visiblePageCount } from '../constant';
export const calculateTotalPages = (data) => {
  const mainPageCount = Math.ceil(data.length / recordsPerPage);
  return mainPageCount;
};

export const generatePageNumber = (start, end) => {
  console.log('start', start, end);
  const pageArray = Array.from(
    { length: end - start + 1 },
    (_, i) => i + start,
  );
  return pageArray;
};

export const calcStartEndPageRange = (totalPages, currentPage) => {
  const startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
  const adjustedStartPage = Math.max(1, endPage - visiblePageCount + 1);
  return generatePageNumber(adjustedStartPage, endPage);
};
