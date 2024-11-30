import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { format } from "date-fns";
import { ParticipantDetails } from "../BottomSheets/ParticipantDetails";
import { useBottomSheet } from "../../hooks/useBottomSheet";

interface MessageHeaderProps {
  participant: TParticipant;
  timestamp: number;
  showHeader: boolean | undefined;
  isCurrentUser: boolean;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({
  participant,
  timestamp,
  showHeader,
  isCurrentUser,
}) => {
  const { showWithContent } = useBottomSheet();

  const handleParticipantPress = useCallback(() => {
    showWithContent(<ParticipantDetails participant={participant} />, 1);
  }, [participant, showWithContent]);

  if (!showHeader) return null;

  return (
    <View style={[styles.header, isCurrentUser && styles.headerRight]}>
      <Image source={{ uri: participant.avatarUrl }} style={styles.avatar} />
      <TouchableOpacity onPress={handleParticipantPress}>
        <Text style={styles.name}>{participant.name}</Text>
      </TouchableOpacity>
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
  headerRight: {
    justifyContent: "flex-end",
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
    marginRight: 8,
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
});
