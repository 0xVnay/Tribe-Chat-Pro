import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MessageHeader } from "./MessageHeader";
import { MessageReactions } from "./MessageReactions";
import { MessageAttachments } from "./MessageAttachments";
import { QuotedMessage } from "./QuotedMessage";

interface MessageProps {
  message: TMessageWithUI;
  participant: TParticipant;
  showHeader: boolean | undefined;
}

export const Message: React.FC<MessageProps> = ({
  message,
  participant,
  showHeader,
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

      <View>
        {(message.text || message.replyToMessage) && (
          <View style={[styles.bubble, isCurrentUser && styles.bubbleRight]}>
            {message.replyToMessage && message.replyParticipant && (
              <QuotedMessage
                message={message.replyToMessage}
                participant={message.replyParticipant}
                isCurrentUser={isCurrentUser}
              />
            )}

            {message.text && (
              <Text style={[styles.text, isCurrentUser && styles.textRight]}>
                {message.text}
              </Text>
            )}

            {isEdited && (
              <Text
                style={[
                  styles.editedText,
                  isCurrentUser && styles.editedTextRight,
                ]}
              >
                (edited)
              </Text>
            )}
          </View>
        )}

        <MessageAttachments
          attachments={message.attachments}
          isCurrentUser={isCurrentUser}
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
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  containerRight: {
    alignItems: "flex-end",
  },
  bubble: {
    backgroundColor: "#E8E8E8",
    borderRadius: 16,
    padding: 12,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  bubbleRight: {
    backgroundColor: "#0084FF",
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  textRight: {
    color: "#FFF",
  },
  editedText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  editedTextRight: {
    color: "#E0E0E0",
  },
});
