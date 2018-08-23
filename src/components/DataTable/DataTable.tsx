import * as React from "react";

import Table from "@/components/Table";

// Note: Went through a series of smart DataTables, they all had a fatal flaw.
//  Reverting to basic table for now.
// react-table is a pain to theme and enforces pagination.
// Griddle caused serious performance issues in redux and crashed the site when a SaveStructureLink was contained in it.

export interface DataTableCellProps {
  value: any;
  rowData: any;
}

export interface DataTableColumn {
  id?: string;
  header?: string | React.ReactChild;
  property?: string;
  // accessor?: (rowData: any) => any;
  cell?: React.ComponentType<DataTableCellProps>;

  //Can this column be filtered
  filterable?: boolean;

  //Can this column be sorted
  sortable?: boolean;

  //What sort method this column uses
  sortMethod?: (data: any[], column: string, sortAscending?: boolean) => any[];
}

export interface DataTableProps {
  data: any[];
  columns: DataTableColumn[];
  className?: string;
}

const DataTable: React.SFC<DataTableProps> = ({ data, columns, className }) => (
  <Table className={className}>
    <Table.THead>
      <Table.TR>
        {columns.map((col, i) => (
          <Table.TH key={col.id || `header-${i}`}>{col.header}</Table.TH>
        ))}
      </Table.TR>
    </Table.THead>
    <Table.TBody>
      {data.map((rowData, di) => (
        <Table.TR key={`row-${di}`}>
          {columns.map((col, ci) => (
            <Table.TD key={`cell-${di}-${col.id || ci}`}>
              <ColumnCell
                value={rowData[col.property || ci]}
                rowData={rowData}
                Cell={col.cell}
              />
            </Table.TD>
          ))}
        </Table.TR>
      ))}
    </Table.TBody>
  </Table>
);
DataTable.displayName = "DataTable";
export default DataTable;

const ColumnCell: React.SFC<
  DataTableCellProps & {
    value: any;
    Cell?: React.ComponentType<DataTableCellProps>;
  }
> = ({ rowData, value, Cell }) =>
  Cell ? <Cell value={value} rowData={rowData} /> : <span>{value}</span>;
