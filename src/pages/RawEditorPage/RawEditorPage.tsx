import * as React from "react";

import {
  Theme,
  createStyles,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";
import ControlledMonaco from "@/components/ControlledMonaco";

import AbstractRawEditor from "@/services/oni-save/components/AbstractRawEditor";

import PathSelector from "./components/PathSelector";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    },
    selectorContainer: {
      width: "100%",
      padding: theme.spacing()
    },
    editorContainer: {
      flexGrow: 1,
      width: "100%",
      height: "100%",
      minHeight: 0
    },
    buttonContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "row"
    }
  });

type Props = WithStyles<typeof styles>;
const RawEditorPage: React.FC<Props> = ({ classes }) => {
  const [path, setPath] = React.useState(["header"]);
  return (
    <React.Fragment>
      <RedirectIfNoSave />
      <AbstractRawEditor path={path}>
        {({ value, valid, hasChanges, onChange, onReset, onApply }) => (
          <PageContainer title="Raw Editor" back>
            <div className={classes.root}>
              <div className={classes.selectorContainer}>
                <PathSelector path={path} onChange={setPath} />
              </div>
              {value && (
                <>
                  <div className={classes.editorContainer}>
                    <ControlledMonaco
                      width="100%"
                      height="100%"
                      language="json"
                      theme="vs-dark"
                      value={value}
                      onChange={onChange}
                    />
                  </div>
                  <div className={classes.buttonContainer}>
                    <button onClick={onReset}>Reset</button>
                    <button disabled={!valid || !hasChanges} onClick={onApply}>
                      Apply
                    </button>
                    {!valid && (
                      <Typography component="span">
                        Cannot apply changes - JSON contains an error.
                      </Typography>
                    )}
                  </div>
                </>
              )}
            </div>
          </PageContainer>
        )}
      </AbstractRawEditor>
    </React.Fragment>
  );
};
export default withStyles(styles)(RawEditorPage);
