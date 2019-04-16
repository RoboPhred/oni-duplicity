import * as React from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { WithPathSelectorLogic } from "./logic";

type Props = WithPathSelectorLogic;
const PathSelector: React.FC<Props> = ({ pathMenu, nextItemMenu }) => (
  <Breadcrumbs>
    {pathMenu.map(({ label, onClick }) => (
      <Link key={label} color="inherit" onClick={onClick}>
        {label}
      </Link>
    ))}
    {nextItemMenu.length > 0 && (
      <Select onChange={e => nextItemMenu[Number(e.target.value)].onClick()}>
        {nextItemMenu.map(({ label }, i) => (
          <MenuItem key={i} value={i}>
            {label}
          </MenuItem>
        ))}
      </Select>
    )}
  </Breadcrumbs>
);

export default PathSelector;
