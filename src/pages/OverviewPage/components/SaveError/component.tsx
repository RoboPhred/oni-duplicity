import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import {
  loadingErrorSelector,
  loadingFileSelector,
} from "@/services/oni-save/selectors/loading-status";

import PageContainer from "@/components/PageContainer";
import { E_VERSION_MAJOR, E_VERSION_MINOR } from "oni-save-parser";
import { loadOniSave } from "@/services/oni-save/actions/load-onisave";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(),
    },
    errorMessage: {
      marginTop: theme.spacing(),
    },
  })
);

const SaveError: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let saveError: any = useSelector(loadingErrorSelector);
  const saveFile = useSelector(loadingFileSelector);

  const onForceLoad = React.useCallback(() => {
    if (saveFile) {
      dispatch(loadOniSave(saveFile, true));
    }
  }, [saveFile]);

  let errorContent: JSX.Element;
  if (saveError.code === E_VERSION_MAJOR) {
    errorContent = (
      <>
        This save file indicates it is for a version of the game that is
        incompatible with this editor.
        <Divider />
        <Typography variant="caption" className={classes.errorMessage}>
          {saveError.message}
        </Typography>
      </>
    );
  } else if (saveError.code === E_VERSION_MINOR) {
    errorContent = (
      <>
        <p>
          This save file indicates it is for a version of the game that
          different than the editor expects.
        </p>
        <p>However, it may still be possible to edit.</p>
        <Typography color="error">
          WARNING: Editing this save file may result in corrupt data, which
          could lead to crashes and game breaking bugs further down the line.
          Load this save at your own risk.
        </Typography>
        <Button onClick={onForceLoad}>
          Override safty checks and load the save
        </Button>
        <Divider />
        <Typography variant="caption" className={classes.errorMessage}>
          {saveError.message}
        </Typography>
      </>
    );
  } else {
    errorContent = (
      <Typography className={classes.errorMessage}>
        {saveError.message}
      </Typography>
    );
  }

  return (
    <PageContainer title="Failed to Load">
      <div className={classes.root}>
        <Typography variant="h5">Error loading save</Typography>
        <Divider />
        {errorContent}
      </div>
    </PageContainer>
  );
};

export default SaveError;
