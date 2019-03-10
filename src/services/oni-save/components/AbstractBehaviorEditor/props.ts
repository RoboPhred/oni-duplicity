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
  extraData: T["extraData"];
  onTemplateDataModify(templateData: DeepPartial<T["templateData"]>): void;
  onExtraDataModify(extraData: DeepPartial<T["extraData"]>): void;
}
