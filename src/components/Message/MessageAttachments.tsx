import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

interface MessageAttachmentsProps {
  attachments: TMessageAttachment[];
  isCurrentUser: boolean;
  onImagePress: (image: TMessageAttachment) => void;
}

const MAX_IMAGE_WIDTH = Dimensions.get("window").width * 0.65;

export const MessageAttachments: React.FC<MessageAttachmentsProps> = ({
  attachments,
  isCurrentUser,
  onImagePress,
}) => {
  if (attachments.length === 0) return null;

  return (
    <View style={styles.container}>
      {attachments.map((attachment) => {
        if (attachment.type !== "image") return null;

        const aspectRatio = attachment.width / attachment.height;
        const width = Math.min(MAX_IMAGE_WIDTH, attachment.width);
        const height = width / aspectRatio;

        return (
          <TouchableOpacity
            key={attachment.uuid}
            onPress={() => onImagePress(attachment)}
          >
            <Image
              key={attachment.uuid}
              source={{ uri: attachment.url }}
              style={[
                styles.image,
                { width, height },
                isCurrentUser && styles.imageRight,
              ]}
              contentFit="cover"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  image: {
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  imageRight: {
    alignSelf: "flex-end",
  },
});
