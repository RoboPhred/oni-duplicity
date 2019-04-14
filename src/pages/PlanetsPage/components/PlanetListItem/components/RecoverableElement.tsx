import * as React from "react";
import { SimHashes } from "oni-save-parser";

import Typography from "@material-ui/core/Typography";

export interface RecoverableElementProps {
  hash: number;
  chance: number;
}

export const RecoverableElement: React.FC<RecoverableElementProps> = ({
  hash,
  chance
}) => (
  <div>
    <Typography>
      {SimHashes[hash]} ({Math.round(chance * 100)}% mass)
    </Typography>
  </div>
);

export default RecoverableElement;
