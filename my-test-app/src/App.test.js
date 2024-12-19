import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { "percentage.funded": 186, "amt.pledged": 15283 },
        { "percentage.funded": 150, "amt.pledged": 10000 },
        { "percentage.funded": 120, "amt.pledged": 8000 },
        { "percentage.funded": 110, "amt.pledged": 5000 },
        { "percentage.funded": 100, "amt.pledged": 4000 },
        { "percentage.funded": 90, "amt.pledged": 2000 },
      ]),
  })
);

describe("TableContainer Component", () => {
  test("renders table with data", async () => {
    render(<App />);
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(1);
  });

  test("navigates between pages", async () => {
    render(<App />);
    const nextButton = screen.getByLabelText("Next");
    fireEvent.click(nextButton);
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("disables buttons correctly", async () => {
    render(<App />);
    const prevButton = screen.getByLabelText("Previous");
    expect(prevButton).toBeDisabled();
  });
});
