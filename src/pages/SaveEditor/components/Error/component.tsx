
import * as React from "react";
import { connect } from "react-redux";

import {
    NonIdealState,
    Text
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


type Props = StateProps & DispatchProps;
class ErrorPageComponent extends React.Component<Props> {
    render() {
        let {
            loadError
        } = this.props;

        if (!loadError) {
            loadError = new Error("Well, this is weird... The Error page loaded, but there is no error.");
            loadError.stack = "I really don't know what to do about this..."
        }

        return (
            <NonIdealState visual={IconNames.ERROR} description="An Error Occurred">
                <Text>{loadError.message}</Text>
                <div>
                    <code>{loadError.stack}</code>
                </div>
            </NonIdealState>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorPageComponent);