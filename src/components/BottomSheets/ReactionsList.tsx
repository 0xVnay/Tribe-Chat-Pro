import React from "react";
import { View, StyleSheet } from "react-native";
import { useParticipantMap } from "../../hooks/useChatSelectors";
import { Avatar, Card, Text } from "../common";
import { Separator } from "../common/Separator";

interface ReactionsListProps {
  reactions: TReaction[];
}

export const ReactionsList: React.FC<ReactionsListProps> = ({ reactions }) => {
  const participantMap = useParticipantMap();

  const renderReactionItem = (reaction: TReaction) => {
    const participant = participantMap[reaction.participantUuid];
    if (!participant) return null;

    return (
      <React.Fragment key={`${reaction.value}-${reaction.participantUuid}`}>
        <View style={styles.reactionItem}>
          <Text variant="heading" style={styles.emoji}>
            {reaction.value}
          </Text>
          <View style={styles.participantInfo}>
            <Avatar
              url={participant.avatarUrl}
              name={participant.name}
              size="sm"
            />
            <Text variant="body">{participant.name}</Text>
          </View>
        </View>
        <Separator spacing={"100%"} />
      </React.Fragment>
    );
  };

  return (
    <Card variant="flat">
      <Text variant="heading">Reactions</Text>
      <View style={styles.list}>{reactions.map(renderReactionItem)}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginTop: 16,
    // backgroundColor:"red"
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emoji: {
    fontSize: 24,
  },
  participantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
