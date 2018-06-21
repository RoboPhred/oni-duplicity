import * as React from "react";

import { DraggableCore, DraggableData } from "react-draggable";

import ResizeHandleVisual from "./ResizeHandleVisual";

export interface ResizeHandleProps {
  onResize(delta: number): void;
}

type Props = ResizeHandleProps;
class ResizeHandle extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this._onDrag = this._onDrag.bind(this);
  }

  render() {
    return (
      <DraggableCore onDrag={this._onDrag}>
        <ResizeHandleVisual />
      </DraggableCore>
    );
  }

  private _onDrag(e: MouseEvent, d: DraggableData) {
    const { onResize } = this.props;
    onResize(d.deltaX);
  }
}
export default ResizeHandle;
