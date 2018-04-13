
import { createStructuredSelector } from "../../../../../../../../state/utils";

import { AttributeLevel, EffectInstance } from "../../../../../../../../services/save-editor/behaviors";
import { makeGetDuplicantEffectsByID } from "../../../../../../../../services/save-editor/duplicants/selectors";

import Props from "./props";

export interface StateProps {
    effects: EffectInstance[];
}

const mapStateToProps = () => createStructuredSelector<Props, StateProps>({
    effects: makeGetDuplicantEffectsByID("duplicantID")
});
export default mapStateToProps;
