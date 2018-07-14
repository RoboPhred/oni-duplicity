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

// TODO theme.
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

// const DataTable = styled<Partial<TableProps> & DataTableStyleProps>(ReactTable)`
//   &.ReactTable {
//     ${width};
//     ${height};
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     ${border.of(Border.Normal, Background.Separator)};
//     box-sizing: border-box;
//   }

//   &.ReactTable * {
//     box-sizing: border-box;
//   }

//   &.ReactTable .rt-table {
//     flex: auto 1;
//     display: flex;
//     flex-direction: column;
//     align-items: stretch;
//     width: 100%;
//     border-collapse: collapse;
//     overflow: auto;
//   }

//   &.ReactTable .rt-thead {
//     flex: 1 0 auto;
//     display: flex;
//     flex-direction: column;
//     user-select: none;
//   }

//   &.ReactTable .rt-thead.-headerGroups {
//   }

//   &.ReactTable .rt-thead.-filters {
//   }

//   &.ReactTable .rt-thead.-filters input,
//   &.ReactTable .rt-thead.-filters select {
//     ${inputStyle};
//   }

//   &.ReactTable .rt-thead.-filters .rt-th {
//   }

//   &.ReactTable .rt-thead.-header {
//   }

//   &.ReactTable .rt-thead .rt-tr {
//     text-align: center;
//   }

//   &.ReactTable .rt-thead .rt-th,
//   &.ReactTable .rt-thead .rt-td {
//     padding: ${props => getTheme(props).space[Space.Small]}px;
//     position: relative;
//     border-right: ${borderValue(Border.Normal, Background.Separator)};
//     ${intent.of(Intent.Secondary)};
//   }

//   &.ReactTable .rt-thead .rt-th.-sort-asc,
//   &.ReactTable .rt-thead .rt-td.-sort-asc {
//   }

//   &.ReactTable .rt-thead .rt-th.-sort-desc,
//   &.ReactTable .rt-thead .rt-td.-sort-desc {
//   }

//   &.ReactTable .rt-thead .rt-th.-cursor-pointer,
//   &.ReactTable .rt-thead .rt-td.-cursor-pointer {
//     cursor: pointer;
//   }

//   &.ReactTable .rt-thead .rt-th:last-child,
//   &.ReactTable .rt-thead .rt-td:last-child {
//     border-right: none;
//   }

//   &.ReactTable .rt-thead .rt-th:focus {
//     outline: none;
//   }

//   &.ReactTable .rt-thead .rt-resizable-header {
//     overflow: visible;
//   }

//   &.ReactTable .rt-thead .rt-resizable-header.:last-child {
//     overflow: hidden;
//   }

//   &.ReactTable .rt-thead .rt-resizable-header-content {
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }

//   &.ReactTable .rt-thead .rt-header-pivot {
//     border-right-color: ${colorValue.of(Intent.Primary)};
//   }

//   &.ReactTable .rt-thead .rt-header-pivot:after,
//   &.ReactTable .rt-thead .rt-header-pivot:before {
//     left: 100%;
//     top: 50%;
//     border: solid transparent;
//     content: " ";
//     height: 0;
//     width: 0;
//     position: absolute;
//     pointer-events: none;
//   }

//   &.ReactTable .rt-thead .rt-header-pivot:after {
//     border-color: rgba(255, 255, 255, 0);
//     border-left-color: #fff;
//     border-width: 8px;
//     margin-top: -8px;
//   }

//   &.ReactTable .rt-thead .rt-header-pivot:before {
//     border-color: rgba(102, 102, 102, 0);
//     border-left-color: ${colorValue.of(Intent.Primary)};
//     border-width: 10px;
//     margin-top: -10px;
//   }

//   &.ReactTable .rt-tbody {
//     flex: 99999 1 auto;
//     display: flex;
//     flex-direction: column;
//     overflow: auto;
//   }

//   &.ReactTable .rt-tbody .rt-tr-group {
//     border-bottom: ${borderValue(Border.Normal, Background.Separator)};
//   }

//   &.ReactTable .rt-tbody .rt-tr-group:last-child {
//     border-bottom: none;
//   }

//   &.ReactTable .rt-tbody .rt-td {
//     border-right: ${borderValue(Border.Normal, Background.Separator)};
//   }

//   &.ReactTable .rt-tbody .rt-td:last-child {
//     border-right: none;
//   }

//   &.ReactTable .rt-tbody .rt-expandable {
//     cursor: pointer;
//     text-overflow: clip;
//   }

//   &.ReactTable .rt-tr-group {
//     flex: 1 0 auto;
//     display: flex;
//     flex-direction: column;
//     align-items: stretch;
//   }

//   &.ReactTable .rt-tr {
//     flex: 1 0 auto;
//     display: inline-flex;
//   }

//   &.ReactTable .rt-th,
//   &.ReactTable .rt-td {
//     flex: 1 0 0px;
//     white-space: nowrap;
//     text-overflow: ellipsis;
//     padding: 7px 5px;
//     overflow: hidden;
//     transition: 0.3s ease;
//     transition-property: width, min-width, padding, opacity;
//   }

//   &.ReactTable .rt-th.-hidden,
//   &.ReactTable .rt-td.-hidden {
//     width: 0 !important;
//     min-width: 0 !important;
//     padding: 0 !important;
//     border: 0 !important;
//     opacity: 0 !important;
//   }

//   &.ReactTable .rt-expander {
//     display: inline-block;
//     position: relative;
//     margin: 0;
//     color: transparent;
//     margin: 0 10px;
//   }

//   &.ReactTable .rt-expander:after {
//     content: "";
//     position: absolute;
//     width: 0;
//     height: 0;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%) rotate(-90deg);
//     border-left: ($expandSize * 0.72) solid transparent;
//     border-right: ($expandSize * 0.72) solid transparent;
//     border-top: $expandSize solid alpha(black, 0.8);
//     transition: all 0.3s $easeOutBack;
//     cursor: pointer;
//   }

//   &.ReactTable .rt-expander.-open-after {
//     transform: translate(-50%, -50%) rotate(0deg);
//   }

//   &.ReactTable .rt-resizer {
//     display: inline-block;
//     position: absolute;
//     width: 36px;
//     top: 0;
//     bottom: 0;
//     right: -18px;
//     cursor: col-resize;
//     z-index: 10;
//   }

//   &.ReactTable .rt-tfoot {
//     flex: 1 0 auto;
//     display: flex;
//     flex-direction: column;
//   }

//   &.ReactTable .rt-tfoot .rt-td {
//     border-right: ${borderValue(Border.Normal, Background.Separator)};
//   }

//   &.ReactTable .rt-tfoot .rt-td:last-child {
//     border-right: 0;
//   }

//   &.ReactTable.-striped .rt-tr.-odd {
//   }

//   &.ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
//     background: ${colorValue.of(Intent.Secondary)};
//   }

//   &.ReactTable .-pagination {
//     z-index: 1;
//     display: flex;
//     justify-content: space-between;
//     align-items: stretch;
//     flex-wrap: wrap;
//     padding: ${props => getTheme(props).space[Space.Small]}px;
//     border-top: ${borderValue(Border.Normal, Background.Separator)};
//   }

//   &.ReactTable .-pagination input,
//   &.ReactTable .-pagination select {
//     ${inputStyle};
//   }

//   &.ReactTable .-pagination .-previous,
//   &.ReactTable .-pagination .-next {
//     flex: 1;
//     text-align: center;
//   }

//   &.ReactTable .-pagination .-center {
//     flex: 1.5;
//     text-align: center;
//     margin-bottom: 0;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: space-around;
//   }

//   &.ReactTable .-pagination .-pageInfo {
//     display: inline-block;
//     margin: 3px 10px;
//     white-space: nowrap;
//   }

//   &.ReactTable .-pagination .-pageJump {
//     display: inline-block;
//   }

//   &.ReactTable .-pagination .-pageJump input {
//     width: 70px;
//     text-align: center;
//   }

//   &.ReactTable .-pagination .-pageSizeOptions {
//     margin: ${props => {
//       const theme = getTheme(props);
//       const { space } = theme;
//       return `${space[Space.Small]}px ${space[Space.Medium]}px`;
//     }};
//   }

//   &.ReactTable .rt-noData {
//   }

//   &.ReactTable .-loading {
//     display: block;
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     transition: all 0.3s ease;
//     z-index: -1;
//     opacity: 0;
//     pointer-events: none;
//   }

//   &.ReactTable .-loading > div {
//     position: absolute;
//     display: block;
//     text-align: center;
//     width: 100%;
//     top: 50%;
//     left: 0;
//     font-size: 15px;
//     color: alpha(black, 0.6);
//     transform: translateY(-52%);
//     transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//   }

//   &.ReactTable .-loading.-active {
//     opacity: 1;
//     z-index: 2;
//     pointer-events: all;
//   }

//   &.ReactTable .-loading.-active > div {
//     transform: translateY(50%);
//   }

//   &.ReactTable .rt-resizing .rt-th,
//   &.ReactTable .rt-resizing .rt-td {
//     transition: none !important;
//     cursor: col-resize user-select none;
//   }
// `;
DataTable.displayName = "DataTable";
DataTable.defaultProps = {
  showPagination: false
};

export type DataTableProps = TableProps & DataTableStyleProps;
export type DataTableColumn = Column;
export type DataTableRow<T = any> = Omit<RowRenderProps, "value"> & {
  value: T;
};

export default DataTable;
