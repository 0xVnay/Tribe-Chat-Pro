import { useCallback, useContext } from "react";
import { BottomSheetContext } from "../context/BottomSheet";

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }

  const showWithContent = useCallback(
    (content: React.ReactNode, snapIndex: number) => {
      context.setContent(content);
      context.setSnapIndex(snapIndex);
      context.showBottomSheet();
    },
    [context]
  );

  return {
    ...context,
    showWithContent,
  };
};
