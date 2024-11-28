import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MessageHeader } from "./MessageHeader";
import { MessageReactions } from "./MessageReactions";

interface MessageProps {
  message: TMessage;
  participant: TParticipant;
  showHeader: boolean | undefined;
}

export const Message: React.FC<MessageProps> = ({
  message,
  participant,
  showHeader,
}) => {
  return (
    <View style={styles.container}>
      <MessageHeader
        participant={participant}
        timestamp={message.sentAt}
        showHeader={showHeader}
      />

      <View style={styles.bubble}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
      <MessageReactions reactions={message.reactions} />
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
