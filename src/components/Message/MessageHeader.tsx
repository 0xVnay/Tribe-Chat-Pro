import React, { useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { ParticipantDetails } from "../BottomSheets/ParticipantDetails";
import { useBottomSheet } from "../../hooks/useBottomSheet";
import { Avatar, Text } from "../common";

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
    <View style={[styles.container, isCurrentUser && styles.containerRight]}>
      <TouchableOpacity onPress={handleParticipantPress} style={styles.author}>
        <Avatar url={participant.avatarUrl} name={participant.name} size="sm" />
        <Text variant="subheading" style={styles.name}>
          {participant.name}
        </Text>
      </TouchableOpacity>
      <Text variant="caption" color="secondary">
        {format(timestamp, "h:mm a")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
  containerRight: {
    justifyContent: "flex-end",
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
});
