import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Message } from "./Message";
import { DateSeparator } from "./DateSeparator";
import { ImagePreview } from "./ImagePreview";
import {
  useMessageListItems,
  useParticipantMap,
} from "../hooks/useChatSelectors";
import { useChatSync } from "../hooks/useChatSync";
import useChatStore from "../store/chatStore";
import { chatApi } from "../api/chatApi";

export const MessageList: React.FC = () => {
  const { isInitialized } = useChatSync();
  const listItems = useMessageListItems();
  const participantMap = useParticipantMap();
  const [selectedImage, setSelectedImage] = useState<TMessageAttachment | null>(
    null
  );
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const { appendOlderMessages, isLoadingMore, setIsLoadingMore } =
    useChatStore();

  const handleImagePress = (image: TMessageAttachment) => {
    setSelectedImage(image);
    setIsPreviewVisible(true);
  };

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || listItems.length === 0) return;

    const lastMessageItem = listItems
      .filter((item) => item.type === "message")
      .pop();
    if (!lastMessageItem || lastMessageItem.type !== "message") return;

    setIsLoadingMore(true);
    try {
      const olderMessages = await chatApi.getOlderMessages(
        lastMessageItem.uuid
      );
      if (olderMessages.length > 0) {
        appendOlderMessages(olderMessages);
      }
    } catch (error) {
      console.error("Failed to load older messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, listItems, appendOlderMessages, setIsLoadingMore]);

  const renderItem = ({ item }: { item: TListItem }) => {
    switch (item.type) {
      case "date":
        return <DateSeparator date={item.date} />;
      case "message":
        const participant = participantMap[item.authorUuid];
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

  const renderFooter = () =>
    isLoadingMore ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" />
      </View>
    ) : null;

  if (!isInitialized) {
    return (
      <View style={{ backgroundClip: "red", flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <FlatList
        style={styles.container}
        data={listItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        inverted
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
  loaderContainer: {
    padding: 16,
    alignItems: "center",
  },
});
