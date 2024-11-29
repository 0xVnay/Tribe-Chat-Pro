import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useChat } from "../hooks/useChat";
import { Message } from "./Message";
import { isSameDay } from "date-fns";
import { DateSeparator } from "./DateSeparator";
import { ImagePreview } from "./ImagePreview";

export const MessageList: React.FC = () => {
  const { messages, participants } = useChat();
  const [selectedImage, setSelectedImage] = useState<TMessageAttachment | null>(
    null
  );
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleImagePress = (image: TMessageAttachment) => {
    setSelectedImage(image);
    setIsPreviewVisible(true);
  };

  const listItems = useMemo(() => {
    const items: TListItem[] = [];

    messages.forEach((message, index) => {
      const prevMessage = messages[index + 1];

      if (!prevMessage || !isSameDay(message.sentAt, prevMessage.sentAt)) {
        items.push({
          type: "date",
          date: message.sentAt,
          uuid: `date-${message.sentAt}`,
        });
      }

      items.push({
        ...message,
        type: "message",
        showHeader:
          !prevMessage || prevMessage.authorUuid !== message.authorUuid,
        replyParticipant: message.replyToMessage
          ? participants.find(
              (p) => p.uuid === message.replyToMessage?.authorUuid
            )
          : undefined,
      });
    });

    return items;
  }, [messages, participants]);

  const renderItem = ({ item }: { item: TListItem }) => {
    switch (item.type) {
      case "date":
        return <DateSeparator date={item.date} />;
      case "message":
        const participant = participants.find(
          (p) => p.uuid === item.authorUuid
        );
        if (!participant) return null;
        return (
          <Message
            message={item}
            participant={participant}
            showHeader={item.showHeader}
            onImagePress={handleImagePress}
          />
        );
    }
  };

  return (
    <>
      <FlatList
        style={styles.container}
        data={listItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        inverted
      />
      <ImagePreview
        visible={isPreviewVisible}
        image={selectedImage}
        onClose={() => {
          setIsPreviewVisible(false);
          setSelectedImage(null);
        }}
      />
    </>
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
