import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChatMessageActions } from "../hooks/useChatActions";

export const ChatInput = () => {
  const { sendMessage } = useChatMessageActions();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        multiline
        maxLength={1000}
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Ionicons
          name="send"
          size={24}
          color={message.trim() ? "#0084FF" : "#999"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    maxHeight: 100,
  },
  sendButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
});
