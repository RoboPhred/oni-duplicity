import * as React from "react";
import { AIAttributeLevelsBehavior, AttributeLevel } from "oni-save-parser";
import { findIndex, merge } from "lodash";

import { Trans } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import useBehavior from "@/services/oni-save/hooks/useBehavior";

import AttributeName from "./components/AttributeName";
import AttributeField from "./components/AttributeField";

const PRIMARY_ATTRIBUTES = [
  "Athletics",
  "Cooking",
  "Digging",
  "Caring",
  "Ranching",
  "Machinery",
  "Construction",
  "Art",
  "Botanist",
  "Learning",
  "Strength"
];

export interface AttributesProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    header: {
      marginTop: theme.spacing(),
      marginLeft: theme.spacing()
    },
    divider: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing()
    },
    attributeList: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      height: theme.spacing(20),
      padding: theme.spacing()
    },
    attributeItem: {
      margin: theme.spacing(0.5),
      display: "flex",
      flexDirection: "row"
    },
    attributeInput: {
      width: 50,
      marginRight: theme.spacing()
    }
  });

type Props = AttributesProps & WithStyles<typeof styles>;

const Attributes: React.FC<Props> = ({ classes, gameObjectId }) => {
  const { templateData: { saveLoadLevels } } = useBehavior(gameObjectId, AIAttributeLevelsBehavior);
  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant="h6">
        <Trans i18nKey="duplicant_attribute.primary_titlecase">Primary</Trans>
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.attributeList}>
        {PRIMARY_ATTRIBUTES.map(attributeId => (
          <div key={attributeId} className={classes.attributeItem}>
            <AttributeField
              className={classes.attributeInput}
              gameObjectId={gameObjectId}
              attributeId={attributeId}
            />
            <AttributeName attributeId={attributeId} />
          </div>
        ))}
      </div>
      <Typography className={classes.header} variant="h6">
        <Trans i18nKey="duplicant_attribute.secondary_titlecase">
          Secondary
          </Trans>
      </Typography>
      <Divider className={classes.divider} />
      <div className={classes.attributeList}>
        {nonPrimaryAttributeIds(saveLoadLevels).map(attributeId => (
          <div key={attributeId} className={classes.attributeItem}>
            <AttributeField
              className={classes.attributeInput}
              gameObjectId={gameObjectId}
              attributeId={attributeId}
            />
            <AttributeName attributeId={attributeId} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default withStyles(styles)(Attributes);

function nonPrimaryAttributeIds(attributes: AttributeLevel[]): string[] {
  return attributes
    .map(x => x.attributeId)
    .filter(x => PRIMARY_ATTRIBUTES.indexOf(x) === -1);
}
