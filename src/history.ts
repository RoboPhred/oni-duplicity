import { createHashHistory } from "history";

const history = createHashHistory({
  basename: __webpack_public_path__
});
export default history;
