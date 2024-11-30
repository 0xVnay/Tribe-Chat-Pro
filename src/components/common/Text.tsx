import React from "react";
import { Text as RNText, TextStyle, StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

type TextVariant =
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "button"
  | "label";

interface TextProps {
  variant?: TextVariant;
  color?: keyof typeof colors.text;
  children: React.ReactNode;
  style?: TextStyle;
}

export const Text = ({
  variant = "body",
  color = "primary",
  style,
  children,
}: TextProps) => (
  <RNText style={[styles[variant], { color: colors.text[color] }, style]}>
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "600",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
});
