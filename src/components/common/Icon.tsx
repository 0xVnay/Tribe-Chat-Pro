import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/theme";

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: keyof typeof colors.text;
}

export const Icon = ({ name, size = 24, color = "primary" }: IconProps) => (
  <Ionicons name={name} size={size} color={colors.text[color]} />
);
