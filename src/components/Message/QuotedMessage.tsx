import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../common";

interface QuotedMessageProps {
  message: TMessage;
  participant: TParticipant;
  isCurrentUser: boolean;
}

export const QuotedMessage: React.FC<QuotedMessageProps> = ({
  message,
  participant,
  isCurrentUser,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.quoteBar, isCurrentUser && styles.quoteBarLight]} />
      <View style={styles.content}>
        <Text
          variant="caption"
          color={isCurrentUser ? "light" : "secondary"}
          style={styles.name}
        >
          {participant.name}
        </Text>
        <Text
          variant="label"
          color={isCurrentUser ? "light" : "secondary"}
          numberOfLines={2}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 6,
  },
  quoteBar: {
    width: 4,
    backgroundColor: "#666",
    borderRadius: 2,
    marginRight: 8,
  },
  quoteBarLight: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  content: {
    flex: 1,
  },
  name: {
    marginBottom: 4
  }
});
