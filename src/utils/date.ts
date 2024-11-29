import { format, isToday, isYesterday } from "date-fns";

export const formatMessageDate = (timestamp: number): string => {
  if (isToday(timestamp)) return "Today";
  if (isYesterday(timestamp)) return "Yesterday";
  return format(timestamp, "d MMM yyyy");
};
