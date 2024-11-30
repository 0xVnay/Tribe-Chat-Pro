import React from "react";
import { View, StyleSheet } from "react-native";
import { MessageHeader } from "./MessageHeader";
import { MessageReactions } from "./MessageReactions";
import { MessageAttachments } from "./MessageAttachments";
import { QuotedMessage } from "./QuotedMessage";
import { colors } from "../../constants/theme";
import { Text } from "../common";

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
        timestamp={message.sentAt}
        showHeader={showHeader}
        isCurrentUser={isCurrentUser}
      />

      <View style={styles.messageContent}>
        <View style={[styles.bubble, isCurrentUser && styles.bubbleRight]}>
          {message.replyToMessage && message.replyParticipant && (
            <QuotedMessage
              message={message.replyToMessage}
              participant={message.replyParticipant}
              isCurrentUser={isCurrentUser}
            />
          )}
          <Text variant="body" color={isCurrentUser ? "light" : "primary"}>
            {message.text}
          </Text>

          {isEdited && (
            <Text
              variant="caption"
              color={isCurrentUser ? "light" : "secondary"}
              style={styles.editedText}
            >
              (edited)
            </Text>
          )}
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
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  containerRight: {
    alignItems: "flex-end",
  },
  messageContent: {
    maxWidth: "80%",
  },
  bubble: {
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: 12,
    paddingHorizontal: 16,
  },
  bubbleRight: {
    backgroundColor: colors.primary,
  },
  editedText: {
    marginTop: 4,
  },
});
