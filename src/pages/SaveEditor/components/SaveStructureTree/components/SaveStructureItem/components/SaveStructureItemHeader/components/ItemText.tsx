import { getTheme } from "@/theme";

import Text from "@/components/Text";

const ItemText = Text.extend`
  margin-left: ${props => getTheme(props).space[1]}px;
`;
export default ItemText;
