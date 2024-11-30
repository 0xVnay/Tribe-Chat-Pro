import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "./Text";
import { colors } from "../../constants/theme";

interface ButtonProps {
  onPress: () => void;
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const Button = ({
  onPress,
  label,
  variant = "primary",
  size = "md",
  icon,
  disabled,
}: ButtonProps) => (
  <TouchableOpacity
    style={[
      styles.button,
      styles[variant],
      styles[size],
      disabled && styles.disabled,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    {icon}
    {label && (
      <Text
        variant="button"
        color={variant === "primary" ? "light" : "primary"}
      >
        {label}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 8,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  sm: {
    padding: 8,
  },
  md: {
    padding: 12,
  },
  lg: {
    padding: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
