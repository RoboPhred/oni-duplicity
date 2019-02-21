import * as React from "react";
import classnames from "classnames";
import { AIAttributeLevelsBehavior } from "oni-save-parser";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const AttributeEditor = AbstractBehaviorEditor.ofType(
  AIAttributeLevelsBehavior
);

export interface DuplicantAttributesProps {
  className?: string;
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      width: theme.spacing.unit * 30,
      height: theme.spacing.unit * 20,
      marginLeft: -theme.spacing.unit / 2,
      marginRight: -theme.spacing.unit / 2
    },
    item: {
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2
    }
  });

type Props = DuplicantAttributesProps & StyleProps<typeof styles>;
const DuplicantAttributes: React.SFC<Props> = ({
  className,
  classes,
  gameObjectId
}) => (
  <AttributeEditor gameObjectId={gameObjectId}>
    {({ templateData }) => (
      <div className={classnames(className, classes.root)}>
        {[...templateData.saveLoadLevels].sort().map(attribute => (
          <div key={attribute.attributeId} className={classes.item}>
            {signPrefix(attribute.level)} {attribute.attributeId}
          </div>
        ))}
      </div>
    )}
  </AttributeEditor>
);

export default withStyles(styles)(DuplicantAttributes);

function signPrefix(x: number): string {
  if (x > 0) {
    return `+${x}`;
  } else if (x < 0) {
    return `-${x}`;
  }
  return String(x);
}
