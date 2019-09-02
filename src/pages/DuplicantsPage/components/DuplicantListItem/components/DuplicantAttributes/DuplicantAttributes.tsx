import * as React from "react";
import classnames from "classnames";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";

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
      width: theme.spacing(30),
      height: theme.spacing(20),
      marginLeft: -theme.spacing(0.5),
      marginRight: -theme.spacing(0.5)
    },
    item: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5)
    }
  });

type Props = DuplicantAttributesProps & WithStyles<typeof styles>;

const DuplicantAttributes: React.FC<Props> = ({
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
