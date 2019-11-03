import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { MaterialListItem, materialsSelector } from "../selectors/material";
import { deleteLooseMaterial } from "../actions/delete-loose-material";

export interface UseMaterials {
  materials: MaterialListItem[];
  onDeleteLooseMaterial(): void;
}

export default function useMaterials(): UseMaterials {
  const dispatch = useDispatch();
  const materials = useSelector(materialsSelector);

  const onDeleteLooseMaterial = React.useCallback(() => {
    dispatch(deleteLooseMaterial());
  }, [dispatch]);

  return {
    materials,
    onDeleteLooseMaterial
  }
}