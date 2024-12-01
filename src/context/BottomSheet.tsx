import React, {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface BottomSheetProviderProps {
  children: React.ReactNode;
}

interface BottomSheetContextProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal> | null;
  showBottomSheet: () => void;
  hideBottomSheet: () => void;
  setContent: (content: React.ReactNode) => void;
  setSnapIndex: (index: number) => void;
  onDismissHandler: (callback: () => void) => void;
}

export const BottomSheetContext = createContext<BottomSheetContextProps>({
  bottomSheetModalRef: null,
  showBottomSheet: () => {},
  hideBottomSheet: () => {},
  setContent: () => {},
  setSnapIndex: () => {},
  onDismissHandler: () => {},
});

export const BottomSheetProvider = ({ children }: BottomSheetProviderProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [snapIndex, setSnapIndex] = useState<number>(0);
  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const [dismissCallback, setDismissCallback] = useState<() => void>(() => {});
  const [Content, setContent] = useState<React.ReactNode | null>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    bottomSheetModalRef.current?.snapToIndex(snapIndex);
  }, [snapIndex]);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSetContent = useCallback((content: React.ReactNode) => {
    setContent(content);
  }, []);

  const handleSetSnapIndex = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);

  const handleOnDismiss = useCallback(() => {
    if (dismissCallback) {
      dismissCallback();
    }
  }, [dismissCallback]);

  const handleOnDismissHandler = useCallback((callback: () => void) => {
    setDismissCallback(() => callback);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <BottomSheetContext.Provider
          value={{
            bottomSheetModalRef,
            showBottomSheet: handlePresentModalPress,
            hideBottomSheet: handleDismissModalPress,
            setContent: handleSetContent,
            setSnapIndex: handleSetSnapIndex,
            onDismissHandler: handleOnDismissHandler,
          }}
        >
          <>
            {children}
            <BottomSheetModal
              index={snapIndex}
              ref={bottomSheetModalRef}
              keyboardBehavior="interactive"
              keyboardBlurBehavior="restore"
              enableContentPanningGesture={false}
              onDismiss={handleOnDismiss}
              backdropComponent={(backdropProps) => (
                <BottomSheetBackdrop
                  {...backdropProps}
                  opacity={0.7}
                  enableTouchThrough={true}
                />
              )}
              snapPoints={snapPoints}
            >
              <BottomSheetView style={{ flex: 1 }}>{Content}</BottomSheetView>
            </BottomSheetModal>
          </>
        </BottomSheetContext.Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};
