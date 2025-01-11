declare module "TableTypes" {
  export type TableSize = "small" | "default" | "large";

  export type TableColumn = {
    key: string;
    label: string;
    width?: number;
    align?: "left" | "center" | "right";
  };

  export type TableData = {
    [key: string]: any;
  };

  export type TablePagination = {
    pageSize: number;
  };
}
