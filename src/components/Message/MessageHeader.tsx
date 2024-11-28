import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { format } from "date-fns";

interface MessageHeaderProps {
  participant: TParticipant;
  timestamp: number;
  showHeader: boolean | undefined;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({
  participant,
  timestamp,
  showHeader,
}) => {
  if (!showHeader) return null;

  return (
    <View style={styles.header}>
      <Image source={{ uri: participant.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{participant.name}</Text>
      <Text style={styles.time}>{format(timestamp, "h:mm a")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
