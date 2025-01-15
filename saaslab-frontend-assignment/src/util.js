import { recordsPerPage } from '../constant';

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
