import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

interface ReactionsListProps {
  reactions: TReaction[];
  participants: TParticipant[];
}

export const ReactionsList: React.FC<ReactionsListProps> = ({
  reactions,
  participants,
}) => {
  const renderReactionWithParticipant = (reaction: TReaction) => {
    const participant = participants.find(
      (p) => p.uuid === reaction.participantUuid
    );
    if (!participant) return null;

    return (
      <View
        key={`${reaction.value}-${reaction.participantUuid}`}
        style={styles.reactionItem}
      >
        <Text style={styles.emoji}>{reaction.value}</Text>
        <View style={styles.participantInfo}>
          <Image
            source={{ uri: participant.avatarUrl }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{participant.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reactions</Text>
      <View style={styles.reactionsList}>
        {reactions.map(renderReactionWithParticipant)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  reactionsList: {
    gap: 12,
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  participantInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    color: "#000",
  },
});
