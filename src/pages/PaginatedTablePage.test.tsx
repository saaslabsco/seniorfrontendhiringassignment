import React from "react";
import { render, screen } from "@testing-library/react";
import PaginatedTablePage from "./PaginatedTablePage";
import * as PaginationHook from "../hooks/usePagination";

test("renders PaginatedTablePage component", () => {
  jest.spyOn(PaginationHook, "usePagination").mockReturnValue({
    paginatedData: [],
    currentPage: 1,
    totalPages: 1,
    setCurrentPage: jest.fn(),
    loading: false,
  });

  render(<PaginatedTablePage />);

  const title = screen.getByText(/Frontend Paginated Table/i);
  expect(title).toBeInTheDocument();

  const loadingText = screen.queryByText(/Loading.../i);
  expect(loadingText).not.toBeInTheDocument();
});

test("renders table with data", () => {
  jest.spyOn(PaginationHook, "usePagination").mockReturnValue({
    paginatedData: [
      {
        "s.no": 0,
        "amt.pledged": 15823,
        title: "Title 1",
        by: "By 1",
        country: "US",
        "percentage.funded": 50,
      },
    ],
    currentPage: 1,
    totalPages: 1,
    setCurrentPage: jest.fn(),
    loading: false,
  });

  render(<PaginatedTablePage />);

  const title = screen.getByText("Title 1");
  expect(title).toBeInTheDocument();
  const pledgedAmount = screen.getByText("15823");
  expect(pledgedAmount).toBeInTheDocument();
});

test("updates page number when page is changed", () => {
  const setCurrentPage = jest.fn();

  jest.spyOn(PaginationHook, "usePagination").mockReturnValue({
    paginatedData: [],
    currentPage: 1,
    totalPages: 3,
    setCurrentPage,
    loading: false,
  });

  render(<PaginatedTablePage />);

  const nextButton = screen.getByText("Next");
  expect(nextButton).toBeInTheDocument();

  nextButton.click();
  expect(setCurrentPage).toHaveBeenCalledWith(2);
});
