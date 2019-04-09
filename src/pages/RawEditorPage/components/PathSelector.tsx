import * as React from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import Link from "@material-ui/core/Link";

import AbstractPathSelector from "@/services/oni-save/components/AbstractPathSelector";

export interface PathSelectorProps {
  path: string[];
  onChange(path: string[]): void;
}
const PathSelector: React.FC<PathSelectorProps> = ({ path, onChange }) => (
  <AbstractPathSelector path={path} onChange={onChange}>
    {({ pathMenu, nextItemMenu }) => (
      <Breadcrumbs>
        {pathMenu.map(({ label, onClick }) => (
          <Link key={label} color="inherit" onClick={onClick}>
            {label}
          </Link>
        ))}
        {nextItemMenu.length > 0 && (
          <Select
            onChange={e => nextItemMenu[Number(e.target.value)].onClick()}
          >
            {nextItemMenu.map(({ label }, i) => (
              <MenuItem key={i} value={i}>
                {label}
              </MenuItem>
            ))}
          </Select>
        )}
      </Breadcrumbs>
    )}
  </AbstractPathSelector>
);

export default PathSelector;
