import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MessageHeader } from "./MessageHeader";

interface MessageProps {
  message: TMessage;
  participant: TParticipant;
}

export const Message: React.FC<MessageProps> = ({ message, participant }) => {
  return (
    <View style={styles.container}>
      <MessageHeader participant={participant} timestamp={message.sentAt} />

      <View style={styles.bubble}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  bubble: {
    backgroundColor: "#E8E8E8",
    borderRadius: 16,
    padding: 12,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});
