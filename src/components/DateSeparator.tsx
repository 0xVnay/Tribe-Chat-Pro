import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatMessageDate } from "../utils/date";

interface DateSeparatorProps {
  date: number;
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{formatMessageDate(date)}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E8E8E8",
  },
  text: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 8,
  },
});
