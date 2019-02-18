import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import DuplicantName from "./components/DuplicantName";
import DuplicantPortrait from "./components/DuplicantPortrait";
import DuplicantTraits from "./components/DuplicantTraits";
import DuplicantAttributes from "./components/DuplicantAttributes";

export interface DuplicantListItemProps {
  className?: string;
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    row: {
      display: "flex",
      flexDirection: "row"
    },
    column: {
      display: "flex",
      flexDirection: "column"
    }
  });

type Props = DuplicantListItemProps & StyleProps<typeof styles>;
const DuplicantListItem: React.SFC<Props> = ({
  className,
  classes,
  gameObjectId
}) => (
  <Card className={className}>
    <CardContent className={classes.column}>
      <DuplicantName gameObjectId={gameObjectId} />
      <div className={classes.row}>
        <DuplicantPortrait gameObjectId={gameObjectId} />
        <DuplicantAttributes gameObjectId={gameObjectId} />
      </div>
      <DuplicantTraits gameObjectId={gameObjectId} />
    </CardContent>
  </Card>
);

export default withStyles(styles)(DuplicantListItem);
