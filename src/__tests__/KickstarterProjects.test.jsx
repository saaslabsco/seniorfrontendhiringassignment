import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import KickstarterProjects from "../views/kickStarterProjects/KickStaterProjects";
import useKickstarterProjects from "../hooks/useKickstarterProjects";
import Pagination from "../components/pagination/Pagination";
import "@testing-library/jest-dom";

jest.mock("../hooks/useKickstarterProjects"); // Mocking the custom hook

describe("KickstarterProjects", () => {
  test("renders loading state initially", () => {
    useKickstarterProjects.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<KickstarterProjects />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state when there is an error", () => {
    useKickstarterProjects.mockReturnValue({
      data: [],
      isLoading: false,
      error: "Error fetching data",
    });

    render(<KickstarterProjects />);
    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });

  test("renders project table and pagination after data is fetched", async () => {
    useKickstarterProjects.mockReturnValue({
      data: [{ "s.no": 1, "percentage.funded": "50", "amt.pledged": "1000" }],
      isLoading: false,
      error: null,
    });

    render(<KickstarterProjects />);
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  test("renders pagination with multiple page numbers", () => {
    const setCurrentPage = jest.fn();
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />
    );

    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  test("clicking next/previous buttons updates the page correctly", () => {
    const setCurrentPage = jest.fn();
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />
    );

    fireEvent.click(screen.getByTestId("next-page"));
    expect(setCurrentPage).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByTestId("last-page"));
    expect(setCurrentPage).toHaveBeenCalledWith(10);
  });

  test("clicking a page number updates the current page", () => {
    const setCurrentPage = jest.fn();
    render(
      <Pagination
        totalPages={10}
        currentPage={1}
        setCurrentPage={setCurrentPage}
      />
    );

    fireEvent.click(screen.getByText("3"));
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });
});
