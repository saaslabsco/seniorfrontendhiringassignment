import React from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import Table from '../TableGenerator'; // Import your table component

export const TEST_COLUMNS_KEYS = {
    S_NO:'s.no',
    PERCENTAGE_FUNDED: 'percentage.funded',
    AMOUNT_PLEDGED: 'amt.pledged',
}

const columnsConfig = [
    {
        key: TEST_COLUMNS_KEYS.S_NO,
        title: "S.No.",
        renderer: (value) => value,
        width: "10%",
    },
    {
        key: TEST_COLUMNS_KEYS.PERCENTAGE_FUNDED,
        title: "Percentage Funded",
        renderer: (value) => `${value}%`,
        width: "20%",
    },
    {
        key: TEST_COLUMNS_KEYS.AMOUNT_PLEDGED,
        title: "Amount Pledged",
        renderer: (value) => `$${value}`,
        width: "30%",
    },
];

const data = [
    { [TEST_COLUMNS_KEYS.S_NO]: 1, [TEST_COLUMNS_KEYS.PERCENTAGE_FUNDED]: 150, [TEST_COLUMNS_KEYS.AMOUNT_PLEDGED]: 5000 },
    { [TEST_COLUMNS_KEYS.S_NO]: 2, [TEST_COLUMNS_KEYS.PERCENTAGE_FUNDED]: 200, [TEST_COLUMNS_KEYS.AMOUNT_PLEDGED]: 8000 },
];

test("renders table headers correctly", () => {
    render(<Table columnsConfig={columnsConfig} data={data} />);
    columnsConfig.forEach((col) => {
        expect(screen.getByText(col.title)).toBeInTheDocument();
    });
});

test("renders data rows correctly", () => {
    render(<Table columnsConfig={columnsConfig} data={data} />);

    data.forEach((item) => {
        expect(screen.getByText(item[TEST_COLUMNS_KEYS.PERCENTAGE_FUNDED].toString())).toBeInTheDocument();
        expect(screen.getByText(`$${item[TEST_COLUMNS_KEYS.AMOUNT_PLEDGED]}`)).toBeInTheDocument();
    });
});

test("applies column widths correctly", () => {
    render(<Table columnsConfig={columnsConfig} data={data} />);
    const headers = screen.getAllByRole("columnheader");

    headers.forEach((header, index) => {
        expect(header).toHaveStyle(`width: ${columnsConfig[index].width}`);
    });
});

test("table has no accessibility violations", async () => {
    const { container } = render(<Table columnsConfig={columnsConfig} data={data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test("renders the correct number of rows", () => {
    render(<Table columnsConfig={columnsConfig} data={data} />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(data.length + 1);
});
