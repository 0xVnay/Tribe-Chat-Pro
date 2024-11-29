import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useChat } from "../hooks/useChat";
import { Message } from "./Message";

export const MessageList: React.FC = () => {
  const { messages, participants } = useChat();

  const groupedMessages = useMemo(() => {
    return messages.map((message, index) => {
      const prevMessage = messages[index + 1];
      const showHeader =
        !prevMessage || prevMessage.authorUuid !== message.authorUuid;

      // For reply messages, find the participant
      let replyParticipant;
      if (message.replyToMessage) {
        replyParticipant = participants.find(
          (p) => p.uuid === message.replyToMessage?.authorUuid
        );
      }

      return {
        ...message,
        showHeader,
        replyParticipant,
      };
    });
  }, [messages]);

  const renderMessage = ({ item: message }: { item: TMessageWithUI }) => {
    const participant = participants.find((p) => p.uuid === message.authorUuid);

    if (!participant) return null;

    return (
      <Message
        message={message}
        participant={participant}
        showHeader={message.showHeader}
      />
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={groupedMessages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.uuid}
      inverted
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});
