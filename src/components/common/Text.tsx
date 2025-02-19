import React from "react";
import {
  Text as RNText,
  TextStyle,
  StyleSheet,
  TextInputProps,
  TextProps as RNTextProps,
} from "react-native";
import { colors } from "../../constants/theme";
import { TextInput } from "react-native-gesture-handler";

type TextVariant =
  | "heading"
  | "subheading"
  | "body"
  | "paragraph"
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
  ...props
}: TextProps & RNTextProps) => (
  <RNText
    style={[styles[variant], { color: colors.text[color] }, style]}
    {...props}
  >
    {children}
  </RNText>
);

const Input = ({ style, ...props }: TextInputProps) => (
  <TextInput
    style={[styles.input, style]}
    placeholderTextColor={colors.text.secondary}
    {...props}
  />
);

Text.Input = Input;

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
  paragraph: {
    fontSize: 12,
    fontWeight: "500",
  },
  caption: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
  },
  input: {
    fontSize: 16,
    color: colors.text.primary,
    padding: 12,
  },
});
