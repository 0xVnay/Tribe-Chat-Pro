import { useState } from "react";

export const useImagePreview = () => {
  const [selectedImage, setSelectedImage] = useState<TMessageAttachment | null>(
    null
  );
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleImagePress = (image: TMessageAttachment) => {
    setSelectedImage(image);
    setIsPreviewVisible(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewVisible(false);
    setSelectedImage(null);
  };

  return {
    selectedImage,
    isPreviewVisible,
    handleImagePress,
    handlePreviewClose,
  };
};
