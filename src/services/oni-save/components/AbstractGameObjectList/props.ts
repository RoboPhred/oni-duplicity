export interface AbstractGameObjectListProps {
  gameObjectType: string;
  children(props: AbstractGameObjectListRenderProps): React.ReactChild;
}

export interface AbstractGameObjectListRenderProps {
  gameObjectIds: number[];
}
