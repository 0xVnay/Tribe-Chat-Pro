import { useEffect, useCallback, useRef } from "react";
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

  useEffect(() => {
    initializeChat();
  }, []);

  return {
    messages,
    participants,
    isInitialized: !!sessionUuid,
  };
};
