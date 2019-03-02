import { createHashHistory } from "history";

const history = createHashHistory({
  // Only needed for browserHistory
  // basename: __webpack_public_path__
});
export default history;
