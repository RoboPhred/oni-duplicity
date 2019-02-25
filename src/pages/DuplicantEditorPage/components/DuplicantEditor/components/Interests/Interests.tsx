import * as React from "react";
import {
  MinionRoleGroup,
  MinionResumeBehavior,
  getHashedString
} from "oni-save-parser";
import { merge, findIndex } from "lodash-es";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

import AddAptitudeDialog from "./components/AddAptitudeDialog";

const ResumeEditor = AbstractBehaviorEditor.ofType(MinionResumeBehavior);

export interface InterestsProps {
  gameObjectId: number;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row"
    },
    chip: {
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2
    }
  });

type Props = InterestsProps & StyleProps<typeof styles> & WithTranslation;
const Interests: React.SFC<Props> = ({ classes, gameObjectId, t }) => {
  const [isAddingAptitude, setIsAddingAptitude] = React.useState(false);
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
              return (
                <Chip
                  key={i}
                  className={classes.chip}
                  label={t(`oni:todo-trans.aptitudes.${aptitudeName}`, {
                    defaultValue: aptitudeName
                  })}
                  onDelete={() => {
                    onTemplateDataModify({
                      AptitudeByRoleGroup: merge([], AptitudeByRoleGroup, {
                        [i]: [aptitude[0], 0]
                      })
                    });
                  }}
                />
              );
            })}
            <Chip
              className={classes.chip}
              color="primary"
              label={t(`duplicant-editor.add-aptitude`)}
              clickable
              onClick={() => setIsAddingAptitude(true)}
            />
            <AddAptitudeDialog
              open={isAddingAptitude}
              availableAptitudes={availableAptitudes}
              onClose={() => setIsAddingAptitude(false)}
              onAddAptitude={aptitude => {
                setIsAddingAptitude(false);
                const aptitudeIndex = findIndex(
                  AptitudeByRoleGroup,
                  a => a[0].hash === getHashedString(aptitude).hash
                );
                if (aptitudeIndex) {
                  onTemplateDataModify({
                    AptitudeByRoleGroup: merge([], AptitudeByRoleGroup, {
                      [aptitudeIndex]: [
                        AptitudeByRoleGroup![aptitudeIndex][0],
                        1
                      ]
                    })
                  });
                }
              }}
            />
          </div>
        );
      }}
    </ResumeEditor>
  );
};

export default withStyles(styles)(withTranslation()(Interests));
