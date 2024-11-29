import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";

interface ImagePreviewProps {
  visible: boolean;
  image: TMessageAttachment | null;
  onClose: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  visible,
  image,
  onClose,
}) => {
  if (!image) return null;

  const aspectRatio = image.width / image.height;
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth;
  const imageHeight = imageWidth / aspectRatio;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeArea} onPress={onClose} />
        <Image
          source={{ uri: image.url }}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
          contentFit="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeArea: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  image: {
    zIndex: 2,
  },
});
