import { useMemo } from "react";
import useChatStore from "../store/chatStore";
import { selectMessages, selectParticipants } from "../store/chatSelectors";
import { isSameDay } from "date-fns";

export const useChatData = () => {
  return useChatStore((state) => ({
    messages: state.messages,
    participants: state.participants,
    isInitialized: state.isInitialized,
    sessionUuid: state.sessionUuid,
    lastSync: state.lastSync,
  }));
};

export const useChatActions = () => {
  return useChatStore((state) => ({
    setMessages: state.setMessages,
    addMessage: state.addMessage,
    updateMessage: state.updateMessage,
    setParticipants: state.setParticipants,
    setSessionUuid: state.setSessionUuid,
    setLastSync: state.setLastSync,
    setIsInitialized: state.setIsInitialized,
  }));
};

export const useParticipantMap = () => {
  const participants = useChatStore(selectParticipants);

  return useMemo(
    () =>
      participants.reduce((acc, participant) => {
        acc[participant.uuid] = participant;
        return acc;
      }, {} as Record<string, TParticipant>),
    [participants]
  );
};

export const useMessageListItems = () => {
  const messages = useChatStore(selectMessages);
  const participants = useChatStore(selectParticipants);

  return useMemo(() => {
    const items: TListItem[] = [];

    messages.forEach((message, index) => {
      const prevMessage = messages[index + 1];

      if (!prevMessage || !isSameDay(message.sentAt, prevMessage.sentAt)) {
        items.push({
          type: "date",
          date: message.sentAt,
          uuid: `date-${message.sentAt}`,
        });
      }

      const showHeader =
        !prevMessage || prevMessage.authorUuid !== message.authorUuid;

      const replyParticipant = message.replyToMessage
        ? participants.find(
            (p) => p.uuid === message.replyToMessage?.authorUuid
          )
        : undefined;

      items.push({
        ...message,
        type: "message",
        showHeader,
        replyParticipant,
      });
    });

    return items;
  }, [messages, participants]);
};

export const useGroupedReactions = (reactions: TReaction[]) => {
  return useMemo(() => {
    return reactions.reduce<Record<string, TReaction[]>>((acc, reaction) => {
      (acc[reaction.value] ??= []).push(reaction);
      return acc;
    }, {});
  }, [reactions.length, reactions[0]?.uuid]); // Only recalculates if length or first reaction changes
};
