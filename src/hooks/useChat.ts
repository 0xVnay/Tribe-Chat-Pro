import { useEffect, useCallback } from "react";
import { chatApi } from "../api/chatApi";
import useChatStore from "../store/chatStore";

export const useChat = () => {
  const {
    messages,
    participants,
    sessionUuid,
    setMessages,
    setParticipants,
    setSessionUuid,
    setLastSync,
    addMessage,
  } = useChatStore();

  const initializeChat = useCallback(async () => {
    try {
      const info = await chatApi.getServerInfo();

      // Clear local data if session changed
      if (sessionUuid !== info.sessionUuid) {
        setMessages([]);
        setParticipants([]);
        setSessionUuid(info.sessionUuid);
      }

      const [initialMessages, initialParticipants] = await Promise.all([
        chatApi.getLatestMessages(),
        chatApi.getAllParticipants(),
      ]);

      setMessages(initialMessages);
      setParticipants(initialParticipants);
      setLastSync(Date.now());
    } catch (error) {
      console.error("Failed to initialize chat:", error);
    }
  }, [sessionUuid]);

  const sendMessage = async (text: string) => {
    try {
      const message = await chatApi.sendNewMessage(text);
      addMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    initializeChat();
  }, []);

  return {
    messages,
    participants,
    isInitialized: !!sessionUuid,
    sendMessage,
  };
};
