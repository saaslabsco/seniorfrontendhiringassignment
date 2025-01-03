import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("App Component", () => {
  test("displays the correct number of rows per page", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { "s.no": 0, "percentage.funded": 186, 'amt.pledged': 15283 },
        { "s.no": 1, "percentage.funded": 95, 'amt.pledged': 4500 },
        { "s.no": 2, "percentage.funded": 120, 'amt.pledged': 9000 },
        { "s.no": 3, "percentage.funded": 300, 'amt.pledged': 45000 },
        { "s.no": 4, "percentage.funded": 75, 'amt.pledged': 2000 },
        { "s.no": 5, "percentage.funded": 50, 'amt.pledged': 1000 },
      ]),
    });
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    const rows = await screen.findAllByRole("row");
    expect(rows.length).toBe(6);
  });

  test('displays "No data" when there are no records', async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    await screen.findByText("No data to display!");
  });

  test("handles API fetch errors gracefully", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockRejectedValue("API Error"),
    });
    render(<App />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });
});
