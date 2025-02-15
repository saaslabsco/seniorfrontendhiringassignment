import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";
import "@testing-library/jest-dom";

const mockData = [
  {
    sNo: 1,
    amtPledged: 5000,
    percentageFunded: 80,
    blurb: "Test project",
    by: "Test Creator",
    country: "US",
    currency: "usd",
    endTime: "2026-11-01T23:59:00-04:00",
    location: "New York, NY",
    numBackers: "120",
    state: "NY",
    title: "Test Project",
    type: "Tech",
    url: "/test-url",
  },
  {
    sNo: 2,
    amtPledged: 8000,
    percentageFunded: 120,
    blurb: "Another test project",
    by: "Another Creator",
    country: "US",
    currency: "usd",
    endTime: "2026-11-01T23:59:00-04:00",
    location: "San Francisco, CA",
    numBackers: "220",
    state: "CA",
    title: "Another Test Project",
    type: "Design",
    url: "/another-test-url",
  }
];

describe("Table Component", () => {
  test("renders table with data", () => {
    render(<Table data={mockData} />);
    
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("% Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
    expect(screen.getByText("$5,000")).toBeInTheDocument();
  });

  test("sorts data when dropdown selection changes", () => {
    render(<Table data={mockData} />);
    
    const select = screen.getByLabelText("Sort table");

    fireEvent.change(select, { target: { value: "amtPledged_desc" } });

    const firstRow = screen.getAllByRole("row")[1]; // First row after header
    expect(firstRow).toHaveTextContent("2"); // 8000 should come first
  });


   test("prevents out-of-bounds pagination", () => {
    render(<Table data={mockData} />);

    const prevButton = screen.getByLabelText("Go to previous page");
    const firstButton = screen.getByLabelText("Go to first page");
    
    expect(prevButton).toBeDisabled();
    expect(firstButton).toBeDisabled();
  });
});
