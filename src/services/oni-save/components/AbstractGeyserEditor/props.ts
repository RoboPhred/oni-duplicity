export interface AbstractGeyserEditorProps {
  gameObjectId: number;
  children(props: AbstractGeyserEditorRenderProps): React.ReactChild;
}
export interface AbstractGeyserEditorRenderProps {
  geyserType: string | null;
  emitRate: number | null;
  onChangeEmitRate(value: number): void;
  onChangeGeyserType(type: string): void;
}
