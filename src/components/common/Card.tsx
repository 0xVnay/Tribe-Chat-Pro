import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

interface CardProps {
  children: React.ReactNode;
  padding?: number;
  variant?: "elevated" | "outlined" | "flat";
}

export const Card = ({
  children,
  padding = 16,
  variant = "flat",
}: CardProps) => (
  <View style={[styles.card, styles[variant], { padding }]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.main,
    borderRadius: 12,
  },
  elevated: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  flat: {},
});
