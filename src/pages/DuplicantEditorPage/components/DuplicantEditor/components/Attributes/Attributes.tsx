import * as React from "react";
import { AIAttributeLevelsBehavior, AttributeLevel } from "oni-save-parser";
import { findIndex, merge } from "lodash-es";

import { Trans } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%"
    },
    header: {
      marginTop: theme.spacing.unit,
      marginLeft: theme.spacing.unit
    },
    divider: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    attributeList: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      height: theme.spacing.unit * 20,
      padding: theme.spacing.unit
    },
    attributeItem: {
      margin: theme.spacing.unit / 2,
      display: "flex",
      flexDirection: "row"
    },
    attributeInput: {
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
        <Typography className={classes.header} variant="h6">
          <Trans i18nKey="duplicant-editor.primary-attributes">Primary</Trans>
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.attributeList}>
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
              <div className={classes.attributeItem}>
                <CommitTextField
                  className={classes.attributeInput}
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
        <Typography className={classes.header} variant="h6">
          <Trans i18nKey="duplicant-editor.secondary-attributes">
            Secondary
          </Trans>
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.attributeList}>
          {nonPrimaryAttributeIds(saveLoadLevels).map(attributeId => {
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
              <div className={classes.attributeItem}>
                <CommitTextField
                  className={classes.attributeInput}
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

function nonPrimaryAttributeIds(attributes: AttributeLevel[]): string[] {
  return attributes
    .map(x => x.attributeId)
    .filter(x => PRIMARY_ATTRIBUTES.indexOf(x) === -1);
}
