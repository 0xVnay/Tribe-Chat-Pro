import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import { Text } from "./common/Text";
import { Avatar } from "./common/Avatar";
import { colors } from "../constants/theme";

interface MentionSuggestionsProps {
  visible: boolean;
  suggestions: Array<TParticipant>;
  onSelectMention: (participant: TParticipant) => void;
  inputPosition: TInputPosition;
}

export const MentionSuggestions: React.FC<MentionSuggestionsProps> = ({
  visible,
  suggestions,
  onSelectMention,
  inputPosition,
}) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <View style={[styles.suggestionsContainer]}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.uuid}
        keyboardShouldPersistTaps="always"
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => onSelectMention(item)}
            activeOpacity={0.7}
          >
            <Avatar url={item.avatarUrl} name={item.name} size="sm" />
            <Text variant="body" style={styles.suggestionText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: Platform.OS === "ios" ? 16 : 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.secondary,
    borderRadius: 24,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  suggestionsWrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: "100%",
    marginBottom: 4,
    zIndex: 1000,
  },
  suggestionsContainer: {
    backgroundColor: colors.background.main,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    maxHeight: 200,
  },
  list: {
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  suggestionText: {
    marginLeft: 8,
    flex: 1,
  },
});
