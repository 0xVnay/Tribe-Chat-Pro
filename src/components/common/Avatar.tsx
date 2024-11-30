import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "./Text";
import { colors } from "../../constants/theme";

interface AvatarProps {
  url?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  border?: boolean;
}

const SIZES = {
  sm: 28,
  md: 40,
  lg: 80,
};

export const Avatar = ({ url, name, size = "md", border }: AvatarProps) => {
  const dimension = SIZES[size];

  if (!url) {
    return (
      <View
        style={[
          styles.placeholder,
          { width: dimension, height: dimension, borderRadius: dimension / 2 },
          border && styles.border,
        ]}
      >
        <Text variant="body" color="secondary">
          {name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: url }}
      style={[
        { width: dimension, height: dimension, borderRadius: dimension / 2 },
        border && styles.border,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});
