import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageReactionsProps {
  reactions: TReaction[];
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions,
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
    <View style={styles.container}>
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
    marginLeft: 4,
    gap: 4,
  },
  reactionBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
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
