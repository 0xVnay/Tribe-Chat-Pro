import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useChat } from "../hooks/useChat";
import { Message } from "./Message";

export const MessageList: React.FC = () => {
  const { messages, participants } = useChat();

  const renderMessage = ({ item: message }: { item: TMessage }) => {
    const participant = participants.find((p) => p.uuid === message.authorUuid);

    if (!participant) return null;

    return <Message message={message} participant={participant} />;
  };

  return (
    <FlatList
      style={styles.container}
      data={messages}
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
