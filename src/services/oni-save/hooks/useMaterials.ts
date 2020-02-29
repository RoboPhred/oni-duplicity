import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SimHashName } from "oni-save-parser";

import { MaterialListItem, materialsSelector } from "../selectors/material";
import { deleteLooseMaterial } from "../actions/delete-loose-material";

export interface UseMaterials {
  materials: MaterialListItem[];
}

export function useMaterialList(): MaterialListItem[] {
  const materials = useSelector(materialsSelector);
  return materials;
}

export function useDeleteMaterials() {
  const dispatch = useDispatch();
  const deleteMaterial = React.useCallback(
    (materialType?: SimHashName) => {
      dispatch(deleteLooseMaterial(materialType));
    },
    [dispatch]
  );
  return deleteMaterial;
}
