import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import { DuplicantPortraitProps } from "./props";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import SaveStructureLink from "@/components/SaveStructureLink";
import Portrait from "@/components/Portrait";

type Props = DuplicantPortraitProps & StateProps;
class DuplicantPortrait extends React.Component<Props> {
  render() {
    const { path, name, gender, arrivalCycle } = this.props;
    return (
      <Portrait>
        <Portrait.Header>
          {path ? (
            <SaveStructureLink intent={Intent.Primary} path={path}>
              {name}
            </SaveStructureLink>
          ) : (
            "Invalid Object"
          )}
        </Portrait.Header>
        <Portrait.Footer>
          <div>
            <Text intent={Intent.Secondary}>{gender}</Text>
          </div>
          <div>
            <Text intent={Intent.Secondary}>{arrivalCycle} cycles old</Text>
          </div>
        </Portrait.Footer>
      </Portrait>
    );
  }
}
export default connect(mapStateToProps)(DuplicantPortrait);
