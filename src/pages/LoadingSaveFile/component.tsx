
import * as React from "react";

import {
    NonIdealState,
    Spinner,
    Text
} from "@blueprintjs/core";

export default class LoadingSaveFilePageComponent extends React.Component {
    render() {
        return (
            <NonIdealState>
                <Text>Loading File</Text>
                <div>
                    <Spinner large={true}/>
                </div>
                <Text>TODO progress here</Text>
            </NonIdealState>
        );
    }
}