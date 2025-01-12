import { render, screen } from "@testing-library/react";
import Table from "@/components/Table";

const defaultProps = {
  data: [],
  columns: [],
};

describe("Table Component", () => {
  it("should render table component", () => {
    render(<Table {...defaultProps} />);
  });

  it("should render no data found message", () => {
    render(<Table {...defaultProps} />);
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("should render table component with data", () => {
    render(
      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
        ]}
        data={[{ id: 1, name: "John" }]}
      />
    );
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
