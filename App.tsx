import React from "react";
import { BottomSheetProvider } from "./src/context/BottomSheet";
import { ChatScreen } from "./src/screens/ChatScreen";

export default function App() {
  return (
    <BottomSheetProvider>
      <ChatScreen />
    </BottomSheetProvider>
  );
}
