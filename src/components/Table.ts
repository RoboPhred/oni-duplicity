import styled, {
  intent,
  text,
  Intent,
  Border,
  getThemeColor,
  Color,
  getThemeBorder
} from "@/style";

import { attachProps } from "@/utils";

const Table = styled.table`
  border-left: ${getThemeBorder(Border.Normal)};
  border-right: ${getThemeBorder(Border.Normal)};
  border-bottom: ${getThemeBorder(Border.Normal)};
  border-color: ${getThemeColor(Color.fromIntent(Intent.Secondary))};
  border-spacing: 0;
  border-collapse: collapse;
`;

export default attachProps(Table, {
  THead: styled.thead`
    background-color: ${getThemeColor(Color.PanelBackground)};
  `,
  TH: styled.th`
    ${intent.of(Intent.Secondary)};
  `,
  TBody: styled.tbody``,
  TR: styled.tr`
    ${text};

    :hover {
      background-color: ${getThemeColor(Color.PanelBackground)};
    }
  `,
  TD: styled.td`
    ${text};

    padding: 2px;

    position: relative;

    tr:not(:first-child) > & {
      :before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 4px;
        height: 3px;
        border-top: ${getThemeBorder(Border.Normal)};
        border-color: ${getThemeColor(Color.fromIntent(Intent.Secondary))};
      }

      :first-child:before {
        width: 7px;
      }

      :after {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        width: 4px;
        height: 3px;
        border-top: ${getThemeBorder(Border.Normal)};
        border-color: ${getThemeColor(Color.fromIntent(Intent.Secondary))};
      }

      :last-child:after {
        width: 7px;
      }
    }
  `
});
