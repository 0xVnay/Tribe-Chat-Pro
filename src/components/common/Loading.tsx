import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Text } from "./Text";
import { colors } from "../../constants/theme";

interface LoadingProps {
  text?: string;
  size?: "small" | "large";
}

export const Loading = ({ text, size = "small" }: LoadingProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={colors.primary} />
    {text && (
      <Text variant="caption" color="secondary">
        {text}
      </Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
});
