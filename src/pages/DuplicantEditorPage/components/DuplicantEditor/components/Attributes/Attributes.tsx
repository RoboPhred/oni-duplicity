import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { find } from "lodash-es";

import { Trans } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

const AttributesEditor = AbstractBehaviorEditor.ofType(
  AIAttributeLevelsBehavior
);

export interface AttributesProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%"
    },
    basicAttributes: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      height: theme.spacing.unit * 20
    },
    basicAttributeItem: {
      margin: theme.spacing.unit / 2,
      display: "flex",
      flexDirection: "row"
    },
    basicAttributeInput: {
      width: 50,
      marginRight: theme.spacing.unit
    }
  });

type Props = AttributesProps & StyleProps<typeof styles>;

const PRIMARY_ATTRIBUTES = [
  "Athletics",
  "Cooking",
  "Digging",
  "Caring",
  "Ranching",
  "Toggle",
  "Construction",
  "Art",
  "Botanist",
  "Learning",
  "Strength"
];

const Attributes: React.SFC<Props> = ({ classes, gameObjectId }) => (
  <AttributesEditor gameObjectId={gameObjectId}>
    {({ templateData: { saveLoadLevels }, onTemplateDataModify }) => (
      <div className={classes.root}>
        <div className={classes.basicAttributes}>
          {PRIMARY_ATTRIBUTES.map(attributeId => {
            const attr = find(
              saveLoadLevels,
              x => x.attributeId === attributeId
            );
            if (!attr) {
              return undefined;
            }
            const { level } = attr;
            return (
              <div className={classes.basicAttributeItem}>
                <TextField
                  className={classes.basicAttributeInput}
                  type="number"
                  value={level}
                />
                <Typography component="span" variant="body1">
                  <Trans i18nKey={`oni:todo-trans.attributes.${attributeId}`}>
                    {attributeId}
                  </Trans>
                </Typography>
              </div>
            );
          })}
        </div>
        <Typography>
          Primary attributes, plus decor benefit, food benefit, and stress
          reaction
        </Typography>
      </div>
    )}
  </AttributesEditor>
);

export default withStyles(styles)(Attributes);
