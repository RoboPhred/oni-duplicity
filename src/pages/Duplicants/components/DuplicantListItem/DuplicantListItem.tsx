import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import DuplicantName from "./components/DuplicantName";
import DuplicantPortrait from "./components/DuplicantPortrait";
import DuplicantTraits from "./components/DuplicantTraits";

export interface DuplicantListItemProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {}
  });

type Props = DuplicantListItemProps & StyleProps<typeof styles>;
const DuplicantListItem: React.SFC<Props> = ({ classes, gameObjectId }) => (
  <Card className={classes.root}>
    <CardContent>
      <div>
        <DuplicantName gameObjectId={gameObjectId} />
      </div>
      <div>
        <DuplicantPortrait gameObjectId={gameObjectId} />
      </div>
      <div>
        <DuplicantTraits gameObjectId={gameObjectId} />
      </div>
    </CardContent>
  </Card>
);

export default withStyles(styles)(DuplicantListItem);
