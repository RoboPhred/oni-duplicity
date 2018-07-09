import * as React from "react";

import { autobind } from "core-decorators";

import { DraggableCore, DraggableData } from "react-draggable";

import ResizeHandleVisual from "./ResizeHandleVisual";

export interface ResizeHandleProps {
  onResize(delta: number): void;
}

type Props = ResizeHandleProps;
interface State {
  isResizing: boolean;
}
class ResizeHandle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isResizing: false
    };
  }

  render() {
    return (
      <DraggableCore
        onStart={this._onStart}
        onStop={this._onStop}
        onDrag={this._onDrag}
      >
        <ResizeHandleVisual isResizing={this.state.isResizing} />
      </DraggableCore>
    );
  }

  @autobind()
  private _onDrag(e: MouseEvent, d: DraggableData) {
    const { onResize } = this.props;
    onResize(d.deltaX);
  }

  @autobind()
  private _onStart() {
    this.setState({
      isResizing: true
    });
  }

  @autobind()
  private _onStop() {
    this.setState({
      isResizing: false
    });
  }
}
export default ResizeHandle;
