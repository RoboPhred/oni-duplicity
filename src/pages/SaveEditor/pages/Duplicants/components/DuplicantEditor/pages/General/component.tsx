
import * as React from "react";


import DuplicantGeneralPageProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";


type Props = {}
interface State {
    editingName: string | null;
}
class DuplicantGeneralPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            editingName: null
        };
    }

    render() {
        return (
            <div className="ui-duplicant-edit-general fill-parent">
                <label className="pt-label">
                    Name <span className="pt-text-muted">(required)</span>
                    <input className="pt-input" type="text" placeholder="Name is required" dir="auto"/>
                </label>
            </div>
        );
    }
}
export default DuplicantGeneralPage;