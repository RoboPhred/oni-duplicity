
import * as React from "react";
import { NonIdealState, Spinner } from "@blueprintjs/core";

import { SaveEditorProps, withSaveEditor } from "@/services/save-editor";

type Props = SaveEditorProps;
class SavingDialog extends React.Component<Props> {
    render() {
        const { saveEditor } = this.props;

        return (
            <NonIdealState>
                <div>
                    <Spinner large={true} />
                </div>
                <div>
                    Saving <code>{saveEditor.saveName}</code>
                </div>
            </NonIdealState>
        );
    }
}
export default withSaveEditor(SavingDialog);