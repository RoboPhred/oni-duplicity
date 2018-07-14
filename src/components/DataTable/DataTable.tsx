import ReactTable, { TableProps, Column, RowRenderProps } from "react-table";

export type DataTableProps = TableProps;
export type DataTableColumn = Column;
export type DataTableRow<T = any> = Omit<RowRenderProps, "value"> & {
  value: T;
};

// TODO theme.
import "react-table/react-table.css";

export default ReactTable;
