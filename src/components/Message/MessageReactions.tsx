import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ReactionsList } from "../BottomSheets/ReactionsList";
import { useBottomSheet } from "../../hooks/useBottomSheet";
import { useGroupedReactions } from "../../hooks/useChatSelectors";
import { Badge } from "../common";

interface MessageReactionsProps {
  reactions: TReaction[];
  isCurrentUser: boolean;
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions,
  isCurrentUser,
}) => {
  const { showWithContent } = useBottomSheet();
  const groupedReactions = useGroupedReactions(reactions);

  const handleReactionsPress = () => {
    showWithContent(<ReactionsList reactions={reactions} />, 1);
  };

  if (reactions.length === 0) return null;

  return (
    <Pressable
      onPress={handleReactionsPress}
      style={[styles.container, isCurrentUser && styles.containerRight]}
    >
      {Object.entries(groupedReactions).map(([emoji, reactions]) => (
        <Badge
          key={emoji}
          variant="subtle"
          label={`${emoji} ${reactions.length}`}
        />
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
