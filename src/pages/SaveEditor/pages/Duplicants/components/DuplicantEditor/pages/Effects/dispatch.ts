
import { bindActionCreators } from "redux";

import { Dispatch } from "../../../../../../../../state/utils";

import { addDuplicantEffect, removeDuplicantEffect, setDuplicantEffectTime} from "../../../../../../../../services/save-editor/duplicants/actions";

export interface DispatchProps {
    addEffect: typeof addDuplicantEffect;
    removeEffect: typeof removeDuplicantEffect;
    setEffectTime: typeof setDuplicantEffectTime;
}

export default function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({
        addEffect: addDuplicantEffect,
        removeEffect: removeDuplicantEffect,
        setEffectTime: setDuplicantEffectTime
    }, dispatch);
}