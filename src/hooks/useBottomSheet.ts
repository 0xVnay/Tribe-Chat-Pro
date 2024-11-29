import { useContext } from "react";
import { BottomSheetContext } from "../context/BottomSheet";

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }

  return {
    ...context,
    showWithContent: (content: React.ReactNode, snapIndex: number) => {
      context.setContent(content);
      context.setSnapIndex(snapIndex);
      context.showBottomSheet();
    },
  };
};
