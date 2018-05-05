
import * as React from "react";

import { observer } from "mobx-react";

import {
    NonIdealState,
    Spinner,
    Text
} from "@blueprintjs/core";

import { 
    SaveEditorProps,
    withSaveEditor
} from "@/services/save-editor";

@observer
class LoadingSaveFile extends React.Component<SaveEditorProps> {
    render() {
        const currentStep = this.props.saveEditor.saveLoadParseStep;
        return (
            <NonIdealState>
                <Text>Loading File</Text>
                <div>
                    <Spinner large={true}/>
                </div>
                <Text>{currentStep}</Text>
            </NonIdealState>
        );
    }
}

export default withSaveEditor(LoadingSaveFile);
