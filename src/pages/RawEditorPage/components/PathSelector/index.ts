import PathSelector from "./component";
import connectPathSelector from "./connector";
import withPathSelectorLogic from "./logic";

export default connectPathSelector(withPathSelectorLogic(PathSelector));
