import { TableColumn } from "TableTypes";

export const TABLE_COLUMNS: TableColumn[] = [
  { key: "s.no", label: "S.No.", width: 100, align: "center" },
  {
    key: "percentage.funded",
    label: "Percentage funded",
    width: 300,
    align: "center",
  },
  {
    key: "amt.pledged",
    label: "Amount pledged",
    width: 300,
    align: "center",
  },
];
