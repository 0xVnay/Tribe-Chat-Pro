import React from "react";
import { View, StyleSheet } from "react-native";
import { format } from "date-fns";
import { MessageHeader } from "./MessageHeader";
import { MessageReactions } from "./MessageReactions";
import { MessageAttachments } from "./MessageAttachments";
import { QuotedMessage } from "./QuotedMessage";
import { Text } from "../common";
import { colors } from "../../constants/theme";

interface MessageProps {
  message: TMessageWithUI;
  participant: TParticipant;
  showHeader: boolean | undefined;
  onImagePress: (image: TMessageAttachment) => void;
}

export const Message: React.FC<MessageProps> = ({
  message,
  participant,
  showHeader,
  onImagePress,
}) => {
  const isEdited = message.updatedAt > message.sentAt;
  const isCurrentUser = participant.uuid === "you";

  return (
    <View style={[styles.container, isCurrentUser && styles.containerRight]}>
      <MessageHeader
        participant={participant}
        showHeader={showHeader}
        isCurrentUser={isCurrentUser}
      />

      <View style={styles.messageContent}>
        <View
          style={[
            styles.bubble,
            isCurrentUser ? styles.sender : styles.recipient,
          ]}
        >
          {message.replyToMessage && message.replyParticipant && (
            <QuotedMessage
              message={message.replyToMessage}
              participant={message.replyParticipant}
              isCurrentUser={isCurrentUser}
            />
          )}
          <Text variant="body" color={isCurrentUser ? "light" : "dark"}>
            {message.text}
          </Text>
          <View style={styles.bottomRow}>
            <Text
              variant="caption"
              color={isCurrentUser ? "light" : "secondary"}
              style={styles.editedText}
            >
              {isEdited ? "(edited)" : ""}
            </Text>
            <Text
              variant="caption"
              color={isCurrentUser ? "light" : "secondary"}
              style={styles.timestamp}
            >
              {format(message.sentAt, "h:mm a")}
            </Text>
          </View>
        </View>

        <MessageAttachments
          attachments={message.attachments}
          isCurrentUser={isCurrentUser}
          onImagePress={onImagePress}
        />

        <MessageReactions
          reactions={message.reactions}
          isCurrentUser={isCurrentUser}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    paddingHorizontal: 16,
  },
  containerRight: {
    alignItems: "flex-end",
  },
  messageContent: {
    maxWidth: "75%",
  },
  bubble: {
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 12,
    margin: 1,
  },
  sender: {
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    borderRadius: 12,
  },
  recipient: {
    backgroundColor: colors.secondary,
    alignSelf: "flex-start",
    borderRadius: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    marginTop: 4,
  },
  editedText: {
    fontSize: 11,
  },
  timestamp: {
    fontSize: 10,
  },
});
