
import { bindActionCreators } from "redux";

import { Dispatch } from "@/state/utils";

import {
    setCycle,
    setImmigrationTimer,
    setImmigrationReady
} from "@/services/save-editor/general/actions";

export interface DispatchProps {
    setCycle: typeof setCycle,
    setImmigrationTimer: typeof setImmigrationTimer,
    setImmigrationReady: typeof setImmigrationReady
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        setCycle,
        setImmigrationTimer,
        setImmigrationReady
    }, dispatch);
}
