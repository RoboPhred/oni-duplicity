export interface AbstractGameObjectListProps {
  gameObjectType: string;
  children(props: AbstractGameObjectListRenderProps): React.ReactNode;
}

export interface AbstractGameObjectListRenderProps {
  gameObjectIds: number[];
}
