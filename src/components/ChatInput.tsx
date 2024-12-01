// ChatInput.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useChatMessageActions } from "../hooks/useChatActions";
import { colors } from "../constants/theme";
import { Icon, Text } from "./common";
import { MentionSuggestions } from "./MentionSuggestions";
import { useParticipantMap } from "../hooks/useChatSelectors";

interface ChatInputProps {
  participantMap: Record<string, TParticipant>;
}

export const ChatInput: React.FC<ChatInputProps> = () => {
  const participantMap = useParticipantMap();
  const { sendMessage } = useChatMessageActions();
  const [message, setMessage] = useState("");
  const inputRef = useRef<TextInput>(null);
  const [mentionData, setMentionData] = useState<TMentionData>({
    isActive: false,
    query: "",
    startIndex: 0,
  });
  const [inputPosition, setInputPosition] = useState<TInputPosition>({
    height: 0,
    maxHeight: 0,
  });

  // Close suggestions on blur or keyboard dismiss
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      closeSuggestions
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const closeSuggestions = () => {
    setMentionData({
      isActive: false,
      query: "",
      startIndex: 0,
    });
  };

  const handleTextChange = (newText: string) => {
    setMessage(newText);

    const lastTypedChar = newText.slice(-1);
    const prevChar = newText.slice(-2, -1);

    // Close suggestions if @ is deleted
    if (mentionData.isActive && newText.length <= mentionData.startIndex) {
      closeSuggestions();
      return;
    }

    if (lastTypedChar === "@" && (!prevChar || prevChar === " ")) {
      setMentionData({
        isActive: true,
        query: "",
        startIndex: newText.length - 1,
      });
    } else if (mentionData.isActive) {
      const textAfterMention = newText.slice(mentionData.startIndex);
      if (
        textAfterMention.includes(" ") ||
        newText.length < mentionData.startIndex
      ) {
        closeSuggestions();
      } else {
        const newQuery = textAfterMention.slice(1);
        setMentionData({
          ...mentionData,
          query: newQuery,
        });
      }
    }
  };

  const handleMentionSelect = (participant: TParticipant) => {
    const beforeMention = message.slice(0, mentionData.startIndex);
    const afterMention = message.slice(
      mentionData.startIndex + mentionData.query.length + 1
    );
    const newText = `${beforeMention}@${participant.name} ${afterMention}`;

    setMessage(newText);
    closeSuggestions();
    inputRef.current?.focus();
  };

  const getSuggestions = () => {
    if (!mentionData.isActive || !participantMap) return [];

    return Object.values(participantMap)
      .filter((participant) =>
        participant?.name
          ?.toLowerCase()
          .includes(mentionData.query.toLowerCase())
      )
      .slice(0, 5);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage("");
    closeSuggestions();
  };

  const handleBlur = () => {
    setTimeout(closeSuggestions, 100); // Small delay to allow for suggestion selection
  };

  const handlePressOutside = () => {
    closeSuggestions();
    Keyboard.dismiss();
  };

  const renderSuggestions = () => {
    if (!mentionData.isActive) return null;

    const suggestions = getSuggestions();
    if (suggestions.length === 0) return null;

    return (
      <View style={styles.suggestionsWrapper}>
        <MentionSuggestions
          visible={true}
          suggestions={suggestions}
          onSelectMention={handleMentionSelect}
          inputPosition={inputPosition}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={styles.container}>
        {renderSuggestions()}
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={message}
          onChangeText={handleTextChange}
          placeholder="Type a message... Use @ to mention"
          placeholderTextColor={colors.text.secondary}
          multiline
          maxLength={1000}
          onBlur={handleBlur}
          onLayout={() => {
            inputRef.current?.measureInWindow((x, y, width, height) => {
              setInputPosition({
                height,
                maxHeight: height,
              });
            });
          }}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Icon name="send" color="light" size={20} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    backgroundColor: colors.background.main,
  },
  input: {
    flex: 1,
    padding: 12,
    backgroundColor: colors.secondary,
    borderRadius: 24,
    fontSize: 16,
    color: colors.text.primary,
    maxHeight: 100,
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
    right: 64,
    bottom: "100%",
    marginBottom: 4,
    zIndex: 1000,
  },
});
