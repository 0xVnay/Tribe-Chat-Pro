import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Icon, Text } from "../components/common";
import { MessageList } from "../components/MessageList";
import { ChatInput } from "../components/ChatInput";

export const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "height" : undefined}
      >
        <View style={styles.header}>
          <Text variant="subheading" style={styles.headerTitle}>
            Tribe Chat Pro
          </Text>

          <View style={styles.headerRight}>
            <Icon name="call-outline" size={24} color="primary" />
            <Icon name="videocam-outline" size={24} color="primary" />
          </View>
        </View>

        <MessageList />
        <ChatInput />

        <StatusBar style="dark" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerLeft: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
    width: 90,
    justifyContent: "flex-end",
  },
});
