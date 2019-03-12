export interface MaterialListProps {
  children(props: MaterialListRenderProps): React.ReactChild;
}
export interface MaterialListRenderProps {
  materials: MaterialListItem[];
  onDeleteLooseMaterial(): void;
}

export interface MaterialListItem {
  name: string;
  looseGrams: number;
  looseCount: number;
  storedGrams: number;
  storedCount: number;
}
