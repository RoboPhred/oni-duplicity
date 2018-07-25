import { getTheme, Space } from "@/style";

import Text from "@/components/Text";

const ItemText = Text.extend`
  margin-left: ${props => getTheme(props).space[Space.Small]}px;
`;
export default ItemText;
