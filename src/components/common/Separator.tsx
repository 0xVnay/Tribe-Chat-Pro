import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

interface SeparatorProps {
  vertical?: boolean;
  spacing?: number | string;
}

export const Separator = ({ vertical, spacing = 16 }: SeparatorProps) => (
  <View
    style={[
      styles.separator,
      vertical ? styles.vertical : styles.horizontal,
      { [vertical ? "height" : "width"]: spacing },
    ]}
  />
);

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.border,
  },
  horizontal: {
    height: 1,
    width: "100%",
  },
  vertical: {
    width: 1,
  },
});
