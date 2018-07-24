import styled, {
  intent,
  borderValue,
  text,
  background,
  Background,
  Intent,
  css,
  Border
} from "@/theme";

import { attachProps } from "@/utils";

const Table = styled.table`
  border: none;
  border-spacing: 0;
  border-collapse: collapse;
`;

export default attachProps(Table, {
  THead: styled.thead`
    ${background.of(Background.Panel)};
    /* border-left: ${borderValue(Border.Normal, Intent.Secondary)};
    border-right: ${borderValue(Border.Normal, Intent.Secondary)};
    border-top: ${borderValue(Border.Normal, Intent.Secondary)}; */
  `,
  TH: styled.th`
    ${intent.of(Intent.Secondary)};
    /* box-sizing: border-box;
    position: relative;

    :not(:first-child):after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50%;
      border-left: ${borderValue(Border.Normal, Intent.Secondary)};
    } */
  `,
  TBody: styled.tbody``,
  TR: styled.tr`
    ${text};
  `,
  TD: styled.td`
    ${text};
    position: relative;

    :before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 5px;
      height: 3px;
      border-top: ${borderValue(Border.Normal, Intent.Secondary)};
      border-left: ${borderValue(Border.Normal, Intent.Secondary)};
    }

    :after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 0;
      width: 5px;
      height: 3px;
      border-left: ${borderValue(Border.Normal, Intent.Secondary)};
    }

    :first-child:before {
      height: 5px;
    }
  `
});
