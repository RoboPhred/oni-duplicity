
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
    
    componentWillUpdate(nextProps: Props) {
        
    }

    render() {
        const {
            editingName
        } = this.state;

        return (
            <div className="fill-parent">
                Appearance (TODO)
            </div>
        );
    }

    
}
export default DuplicantGeneralPage;