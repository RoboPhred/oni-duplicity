import ReactTable, { TableProps, Column, RowRenderProps } from "react-table";
import { WidthProps, HeightProps, width, height } from "styled-system";

import styled, {
  Background,
  colorValue,
  Intent,
  intent,
  background
} from "@/theme";

import { inputStyle } from "@/components/Input";

// TODO Use https://reactabular.js.org/#/.

import "react-table/react-table.css";

export interface DataTableStyleProps extends WidthProps, HeightProps {}

const DataTable = styled<Partial<TableProps> & DataTableStyleProps>(ReactTable)`
  &.ReactTable {
    ${width};
    ${height};
    box-sizing: border-box;
  }

  &.ReactTable .rt-thead.-filters input,
  &.ReactTable .rt-thead.-filters select {
    border-radius: 0;
    ${inputStyle};
  }

  &.ReactTable .rt-thead {
    ${intent.of(Intent.Secondary)};
    ${background.of(Background.Panel)};
    font-weight: bold;
  }

  &.ReactTable .rt-thead .rt-th.-sort-asc,
  &.ReactTable .rt-thead .rt-th.-sort-desc {
    ${intent.of(Intent.Primary)};
  }

  &.ReactTable .rt-thead .rt-th.-sort-asc {
    box-shadow: none;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${props =>
      encodeURIComponent(
        colorValue.of(Intent.Primary)(props)!
      )}'><polygon points='0,50 100,50 50,0'/></svg>")
      no-repeat;
    background-size: 12px;
    background-position: calc(100% - 20px) center;
  }

  &.ReactTable .rt-thead .rt-th.-sort-desc {
    box-shadow: none;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='${props =>
      encodeURIComponent(
        colorValue.of(Intent.Primary)(props)!
      )}'><polygon points='0,0 100,0 50,50'/></svg>")
      no-repeat;
    background-size: 12px;
    background-position: calc(100% - 20px) center;
  }

  &.ReactTable .rt-td {
    ${intent.of(Intent.Default)};
  }
`;

DataTable.displayName = "DataTable";
DataTable.defaultProps = {};

export type DataTableProps = TableProps & DataTableStyleProps;
export type DataTableColumn = Column;
export type DataTableRow<T = any> = Omit<RowRenderProps, "value"> & {
  value: T;
};

export default DataTable;
