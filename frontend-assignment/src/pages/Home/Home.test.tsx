import React from "react";
import { render, waitFor } from "@testing-library/react";
import Home from "./Home";
import useFetch from "../../hooks/useFetch";

// Mock useFetch hook
jest.mock("../../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockData = [
  { "s.no": 1, "percentage.funded": 80, "amt.pledged": 5000 },
  { "s.no": 2, "percentage.funded": 120, "amt.pledged": 15000 },
];

describe("Home Component", () => {
  it("renders data when fetch is successful", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    const { getByText } = render(<Home />);
    await waitFor(() => {
      expect(getByText("80")).toBeInTheDocument();
    });
  });

  it("renders loading state", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    const { getByText } = render(<Home />);
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch data",
    });

    const { getByText } = render(<Home />);
    expect(getByText("Error: Failed to fetch data")).toBeInTheDocument();
  });
});
