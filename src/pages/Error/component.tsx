
import * as React from "react";

import {
    NonIdealState,
    Text
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";


export interface ErrorPageProps {
    error: Error;
}
type Props = ErrorPageProps;
class ErrorPage extends React.Component<Props> {
    render() {
        let {
            error
        } = this.props;

        if (!error) {
            error = new Error("Well, this is weird... The Error page loaded, but there is no error.");
            error.stack = "I really don't know what to do about this..."
        }

        return (
            <NonIdealState visual={IconNames.ERROR} description="An Error Occurred">
                <Text>{error.message}</Text>
                <div>
                    <code>{error.stack}</code>
                </div>
            </NonIdealState>
        );
    }
}
export default ErrorPage;