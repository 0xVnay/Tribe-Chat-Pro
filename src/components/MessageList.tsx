import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Message } from "./Message";
import { DateSeparator } from "./DateSeparator";
import { ImagePreview } from "./ImagePreview";
import {
  useMessageListItems,
  useParticipantMap,
} from "../hooks/useChatSelectors";
import { useChatInitializer } from "../hooks/useChatInitializer";

export const MessageList: React.FC = () => {
  useChatInitializer();
  const listItems = useMessageListItems();
  const participantMap = useParticipantMap();
  const [selectedImage, setSelectedImage] = useState<TMessageAttachment | null>(
    null
  );
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleImagePress = (image: TMessageAttachment) => {
    setSelectedImage(image);
    setIsPreviewVisible(true);
  };

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
