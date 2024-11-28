import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { format } from "date-fns";

interface MessageProps {
  message: TMessage;
  participant: TParticipant;
}

export const Message: React.FC<MessageProps> = ({ message, participant }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={participant.avatarUrl}
          style={styles.avatar}
          contentFit="cover"
        />
        <Text style={styles.name}>{participant.name}</Text>
        <Text style={styles.time}>{format(message.sentAt, "h:mm a")}</Text>
      </View>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },
  time: {
    marginLeft: 8,
    fontSize: 12,
    color: "#666",
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
