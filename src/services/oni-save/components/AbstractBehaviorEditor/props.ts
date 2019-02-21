import { GameObjectBehavior } from "oni-save-parser";

export interface AbstractBehaviorEditorProps<T extends GameObjectBehavior> {
  gameObjectId: number;
  gameObjectBehavior: T["name"];
  children(props: AbstractBehaviorEditorRenderProps<T>): React.ReactChild;
}
export interface AbstractBehaviorEditorRenderProps<
  T extends GameObjectBehavior
> {
  templateData: T["templateData"];
}
