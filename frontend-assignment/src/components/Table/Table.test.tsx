import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table";

describe("Table Component", () => {
  it("renders empty state when no data", () => {
    const { getByText } = render(<Table data={[]} />);
    expect(getByText("No records available")).toBeInTheDocument();
  });

  it("renders table with data", () => {
    const mockData = [
      { "s.no": 1, "percentage.funded": 80, "amt.pledged": 5000 },
    ];
    const { getByText } = render(<Table data={mockData} />);
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("80")).toBeInTheDocument();
    expect(getByText("5000")).toBeInTheDocument();
  });
});
