import { TableSize } from "TableTypes";

export const getTableClass = (size: TableSize) => {
  return `table-${size}`;
};

export const getPaginationDataIndices = (
  dataLength: number,
  pageSize: number,
  currentPage: number
) => {
  if (!dataLength) return { startIndex: 0, endIndex: 0 };
  if (!pageSize) return { startIndex: 0, endIndex: dataLength };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return { startIndex, endIndex };
};
