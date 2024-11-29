import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useChat } from "../../hooks/useChat";
import { ReactionsList } from "../BottomSheets/ReactionsList";
import { useBottomSheet } from "../../hooks/useBottomSheet";

interface MessageReactionsProps {
  reactions: TReaction[];
  isCurrentUser: boolean;
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions,
  isCurrentUser,
}) => {
  const { participants } = useChat();
  const { showWithContent } = useBottomSheet();

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

  const handleReactionsPress = () => {
    showWithContent(
      <ReactionsList reactions={reactions} participants={participants} />,
      1
    );
  };

  if (reactions.length === 0) return null;

  return (
    <Pressable
      onPress={handleReactionsPress}
      style={[styles.container, isCurrentUser && styles.containerRight]}
    >
      {Object.entries(groupedReactions).map(([emoji, reactions]) => (
        <View key={emoji} style={styles.reaction}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.count}>{reactions.length}</Text>
        </View>
      ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  containerRight: {
    alignSelf: "flex-end",
  },
  reaction: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  emoji: {
    fontSize: 14,
    marginRight: 4,
  },
  count: {
    fontSize: 12,
    color: "#666",
  },
});
