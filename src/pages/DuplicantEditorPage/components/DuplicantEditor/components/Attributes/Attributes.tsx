import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { findIndex, merge } from "lodash-es";

import { Trans } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

import CommitTextField from "@/components/CommitTextField";

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
            const attrIndex = findIndex(
              saveLoadLevels,
              x => x.attributeId === attributeId
            );
            if (attrIndex === -1) {
              return undefined;
            }
            const attr = saveLoadLevels[attrIndex];
            const { level } = attr;
            return (
              <div className={classes.basicAttributeItem}>
                <CommitTextField
                  className={classes.basicAttributeInput}
                  type="number"
                  value={level}
                  onCommit={value => {
                    onTemplateDataModify({
                      saveLoadLevels: merge([], saveLoadLevels, {
                        [attrIndex]: { attributeId, level: Number(value) }
                      })
                    });
                  }}
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
      </div>
    )}
  </AttributesEditor>
);

export default withStyles(styles)(Attributes);
