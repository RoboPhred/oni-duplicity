import { getTheme, Space } from "@/theme";

import Text from "@/components/Text";

const ItemText = Text.extend`
  margin-left: ${props => getTheme(props).space[Space.Small]}px;
`;
export default ItemText;
