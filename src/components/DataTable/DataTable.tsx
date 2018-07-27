import * as React from "react";

import Griddle, {
  components,
  RowDefinition,
  ColumnDefinition,
  GriddleComponents,
  plugins
} from "griddle-react";

import Table from "@/components/Table";
import Text from "@/components/Text";

import enhancedWithRowData from "./rowDataEnhancer";

export interface DataTableColumn {
  id?: string;
  header?: string | React.ReactChild;
  property?: string;
  // accessor?: (rowData: any) => any;
  cell?: React.ComponentType<components.CellProps & { rowData: any }>;

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
}

const defaultComponents: GriddleComponents = {
  // Table: Table as any
  // TableHeading: Table.THead as any,
  // TableHeadingCell: Table.TH as any,
  // TableBody: Table.TBody as any,
  Table: props => {
    // Note: There is some loading logic and child properties in here
    //  that were not typed and are going unused.
    const { TableHeading, TableBody, NoResults, visibleRows } = props;
    if (visibleRows === 0) {
      return <NoResults />;
    }
    return (
      <Table>
        <TableHeading />
        <TableBody />
      </Table>
    );
  },
  TableHeading: props => {
    const { columnTitles, columnIds, TableHeadingCell } = props;

    const headingCells =
      columnIds &&
      columnTitles &&
      columnTitles.map((title, i) => (
        <TableHeadingCell
          key={columnIds[i]}
          title={title}
          columnId={columnIds[i]}
        />
      ));

    return (
      <Table.THead>
        <Table.TR>{headingCells}</Table.TR>
      </Table.THead>
    );
  },
  Row: props => {
    const {
      griddleKey,
      onClick,
      onMouseEnter,
      onMouseLeave,
      style,
      className,
      columnIds,
      Cell
    } = props;
    return (
      <Table.TR
        key={griddleKey}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        className={className}
      >
        {columnIds &&
          columnIds.map(c => (
            <Cell
              key={`${c}-${griddleKey}`}
              griddleKey={griddleKey}
              columnId={c}
              style={style}
              className={className}
            />
          ))}
      </Table.TR>
    );
  },
  Cell: props => {
    const { value, ...rest } = props;
    return <Table.TD {...rest}>{value}</Table.TD>;
  }
};
const DataTable: React.SFC<DataTableProps> = ({ data, columns }) => (
  <Griddle
    data={data}
    plugins={[plugins.LocalPlugin]}
    components={defaultComponents}
  >
    <RowDefinition>{columns.map(columnToDef)}</RowDefinition>
  </Griddle>
);
DataTable.displayName = "DataTable";
export default DataTable;

function columnToDef(column: DataTableColumn): React.ReactElement<any> {
  const {
    id,
    header,
    property,
    cell,
    filterable,
    sortable,
    sortMethod
  } = column;
  if (id == null && property == null) {
    throw new Error(
      "At least one of 'id' or 'property' must be defined in a DataTableColumn."
    );
  }

  const colId = (id || property)!;

  return (
    <ColumnDefinition
      key={colId}
      id={colId}
      customHeadingComponent={header ? () => toElement(header) : undefined}
      customComponent={cell ? enhancedWithRowData(cell) : undefined}
      filterable={filterable}
      sortable={sortable}
      sortMethod={sortMethod as any} // Typedefs are wrong: should return array
    />
  );
}
function toElement(value: string | React.ReactChild): React.ReactElement<{}> {
  if (React.isValidElement(value)) {
    return value;
  }
  return <Text>{value}</Text>;
}
