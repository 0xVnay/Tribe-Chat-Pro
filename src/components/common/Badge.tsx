import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "./Text";
import { colors } from "../../constants/theme";

interface BadgeProps {
  label: string;
  variant?: "default" | "outline" | "subtle";
}

export const Badge = ({ label, variant = "default" }: BadgeProps) => (
  <View style={[styles.badge, styles[variant]]}>
    <Text variant="paragraph" color={variant === "default" ? "light" : "primary"}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  default: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  subtle: {
    backgroundColor: colors.background.accent,
  },
});
