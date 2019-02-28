import * as React from "react";
import classnames from "classnames";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import Attribute from "./components/Attribute";

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
  <div className={classnames(className, classes.root)}>
    <Attribute gameObjectId={gameObjectId} attributeId="Athletics" />
    <Attribute gameObjectId={gameObjectId} attributeId="Cooking" />
    <Attribute gameObjectId={gameObjectId} attributeId="Digging" />
    <Attribute gameObjectId={gameObjectId} attributeId="Caring" />
    <Attribute gameObjectId={gameObjectId} attributeId="Ranching" />
    <Attribute gameObjectId={gameObjectId} attributeId="Machinery" />

    <Attribute gameObjectId={gameObjectId} attributeId="Construction" />
    <Attribute gameObjectId={gameObjectId} attributeId="Art" />
    <Attribute gameObjectId={gameObjectId} attributeId="Botanist" />
    <Attribute gameObjectId={gameObjectId} attributeId="Learning" />
    <Attribute gameObjectId={gameObjectId} attributeId="Strength" />
  </div>
);

export default withStyles(styles)(DuplicantAttributes);
