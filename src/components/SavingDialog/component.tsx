
import * as React from "react";

import { observer } from "mobx-react";

import { NonIdealState, Spinner } from "@blueprintjs/core";

import { SaveEditorProps, withSaveEditor } from "@/services/save-editor";

type Props = SaveEditorProps;
@observer
class SavingDialog extends React.Component<Props> {
    render() {
        const {
            saveEditor: {
                saveName,
                saveLoadParseStep
            }
        } = this.props;
        return (
            <NonIdealState>
                <div>
                    <Spinner large={true} />
                </div>
                <div>
                    Saving <code>{saveName}</code>
                </div>
                <div>{saveLoadParseStep}</div>
            </NonIdealState>
        );
    }
}
export default withSaveEditor(SavingDialog);