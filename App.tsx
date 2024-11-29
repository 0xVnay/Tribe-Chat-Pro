import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MessageList } from "./src/components/MessageList";
import { ChatInput } from "./src/components/ChatInput";
import { StatusBar } from "expo-status-bar";
import { BottomSheetProvider } from "./src/context/BottomSheet";

export default function App() {
  return (
    <BottomSheetProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <MessageList />
          <ChatInput />
        </KeyboardAvoidingView>
        <StatusBar />
      </SafeAreaView>
    </BottomSheetProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});
