import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChatMessageActions } from "../hooks/useChatActions";
import { colors } from "../constants/theme";
import { Button, Card, Icon, Text } from "./common";

export const ChatInput = () => {
  const { sendMessage } = useChatMessageActions();
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
  };

  return (
    <Card variant="flat" padding={12}>
      <View style={styles.container}>
        <Text.Input
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
          maxLength={1000}
        />

        <Button
          variant="primary"
          icon={<Icon name="send" color="light" size={20} />}
          onPress={handleSend}
          disabled={!message.trim()}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: Platform.OS === "ios" ? 16 : 0,
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.background.accent,
    borderRadius: 24,
    fontSize: 16,
  },
});
