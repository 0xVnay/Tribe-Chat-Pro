import React, { useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { Message } from "./Message";
import { DateSeparator } from "./DateSeparator";
import { ImagePreview } from "./ImagePreview";
import {
  useMessageListItems,
  useParticipantMap,
} from "../hooks/useChatSelectors";
import { useChatSync } from "../hooks/useChatSync";
import { useInfiniteMessages } from "../hooks/useInfiniteMessages";
import { useImagePreview } from "../hooks/useImagePreview";
import { Loading } from "./common";

export const MessageList: React.FC = () => {
  const { isInitialized } = useChatSync();
  const listItems = useMessageListItems();
  const participantMap = useParticipantMap();
  const { loadMoreMessages, isLoadingMore } = useInfiniteMessages();
  const {
    selectedImage,
    isPreviewVisible,
    handleImagePress,
    handlePreviewClose,
  } = useImagePreview();

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

  const renderFooter = useCallback(
    () =>
      isLoadingMore ? (
        <Loading size="small" message="Loading more messages..." />
      ) : null,
    [isLoadingMore]
  );

  const renderEmptyComponent = useCallback(
    () => <Loading size="large" message="No messages yet" />,
    []
  );

  if (!isInitialized) {
    return <Loading fullscreen size="large" message="Loading messages..." />;
  }

  return (
    <>
      <FlatList
        style={styles.container}
        data={listItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.uuid}
        inverted
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
      />
      <ImagePreview
        visible={isPreviewVisible}
        image={selectedImage}
        onClose={handlePreviewClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
