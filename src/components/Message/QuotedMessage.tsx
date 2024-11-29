import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
        <Text style={[styles.authorName, isCurrentUser && styles.textLight]}>
          {participant.name}
        </Text>
        <Text 
          style={[styles.text, isCurrentUser && styles.textLight]}
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
  authorName: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#666",
    marginBottom: 2,
  },
  text: {
    fontSize: 13.5,
    color: "#666",
  },
  textLight: {
    color: "rgba(255, 255, 255, 0.9)",
  },
});