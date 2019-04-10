import * as React from "react";
import {
  MinionRoleGroup,
  MinionResumeBehavior,
  getHashedString
} from "oni-save-parser";
import { findIndex } from "lodash-es";

import { WithTranslation, withTranslation } from "react-i18next";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

import AddAptitudeButton from "./components/AddAptitudeButton";

const ResumeEditor = AbstractBehaviorEditor.ofType(MinionResumeBehavior);

export interface InterestsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    },
    chip: {
      margin: theme.spacing.unit / 2
    }
  });

type Props = InterestsProps & WithStyles<typeof styles> & WithTranslation;

const Interests: React.FC<Props> = ({ classes, gameObjectId, t }) => {
  return (
    <ResumeEditor gameObjectId={gameObjectId}>
      {({ templateData: { AptitudeByRoleGroup }, onTemplateDataModify }) => {
        if (!AptitudeByRoleGroup) {
          AptitudeByRoleGroup = [];
        }

        const availableAptitudes = AptitudeByRoleGroup.filter(
          aptitude => aptitude[1] === 0 && aptitude[0].hash !== 0
        ).map(aptitude => MinionRoleGroup[aptitude[0].hash]);

        const selectedAptitudes = AptitudeByRoleGroup.filter(
          aptitude => aptitude[1] !== 0 && aptitude[0].hash !== 0
        );

        return (
          <div className={classes.root}>
            {selectedAptitudes.map((aptitude, i) => {
              const aptitudeName = MinionRoleGroup[aptitude[0].hash];
              const aptitudeIndex = findIndex(
                AptitudeByRoleGroup,
                a => a[0].hash === aptitude[0].hash
              );
              return (
                <Chip
                  key={i}
                  className={classes.chip}
                  label={t(`oni:todo-trans.aptitudes.${aptitudeName}`, {
                    defaultValue: aptitudeName
                  })}
                  onDelete={() => {
                    console.log(
                      "Deleting aptitude",
                      aptitudeIndex,
                      aptitude[0]
                    );
                    onTemplateDataModify({
                      AptitudeByRoleGroup: [
                        ...AptitudeByRoleGroup!.slice(0, aptitudeIndex),
                        [aptitude[0], 0],
                        ...AptitudeByRoleGroup!.slice(aptitudeIndex + 1)
                      ]
                    });
                  }}
                />
              );
            })}
            <AddAptitudeButton
              className={classes.chip}
              availableAptitudes={availableAptitudes}
              onAddAptitude={aptitude => {
                const aptitudeIndex = findIndex(
                  AptitudeByRoleGroup,
                  a => a[0].hash === getHashedString(aptitude).hash
                );
                if (aptitudeIndex === -1) {
                  return;
                }
                const aptitudeData = AptitudeByRoleGroup![aptitudeIndex];
                onTemplateDataModify({
                  AptitudeByRoleGroup: [
                    ...AptitudeByRoleGroup!.slice(0, aptitudeIndex),
                    [aptitudeData[0], 1],
                    ...AptitudeByRoleGroup!.slice(aptitudeIndex + 1)
                  ]
                });
              }}
            />
          </div>
        );
      }}
    </ResumeEditor>
  );
};

export default withStyles(styles)(withTranslation()(Interests));
