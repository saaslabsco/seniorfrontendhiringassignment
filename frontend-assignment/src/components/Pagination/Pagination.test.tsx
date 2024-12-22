//@ts-nocheck
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalRecords={50}
        recordsPerPage={5}
        onPageChange={jest.fn()}
      />
    );
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  it("calls onPageChange when next is clicked", () => {
    const mockOnPageChange = jest.fn();
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalRecords={50}
        recordsPerPage={5}
        onPageChange={mockOnPageChange}
      />
    );
    fireEvent.click(getByText("Next"));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
