import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "./Text";
import { colors } from "../../constants/theme";

interface LoadingProps {
  size?: "small" | "large";
  message?: string;
  fullscreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "large",
  message,
  fullscreen = false,
}) => {
  const containerStyle = [styles.container, fullscreen && styles.fullscreen];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message && (
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  fullscreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
