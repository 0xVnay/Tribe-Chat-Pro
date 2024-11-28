import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageReactionsProps {
  reactions: TReaction[];
  isCurrentUser: boolean;
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions,
  isCurrentUser,
}) => {
  // Group reactions by emoji value
  const groupedReactions = React.useMemo(() => {
    return reactions.reduce<Record<string, TReaction[]>>((acc, reaction) => {
      if (!acc[reaction.value]) {
        acc[reaction.value] = [];
      }
      acc[reaction.value].push(reaction);
      return acc;
    }, {});
  }, [reactions]);

  if (reactions.length === 0) return null;

  return (
    <View style={[styles.container, isCurrentUser && styles.containerRight]}>
      {Object.entries(groupedReactions).map(([value, reactions]) => (
        <View key={value} style={styles.reactionBubble}>
          <Text style={styles.emoji}>{value}</Text>
          <Text style={styles.count}>{reactions.length}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    maxWidth: "80%",
    alignSelf: "flex-start"
  },
  containerRight: {
    alignSelf: "flex-end",
  },
  reactionBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 4,
    marginBottom: 4,
  },
  emoji: {
    fontSize: 12,
    marginRight: 4,
  },
  count: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});
