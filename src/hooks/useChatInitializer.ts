import { useEffect, useRef } from "react";
import { chatApi } from "../api/chatApi";
import useChatStore from "../store/chatStore";

export const useChatInitializer = () => {
  const {
    sessionUuid,
    isInitialized,
    setMessages,
    setParticipants,
    setSessionUuid,
    setIsInitialized,
  } = useChatStore();

  const initializationInProgress = useRef(false);

  useEffect(() => {
    const initializeChat = async () => {
      if (initializationInProgress.current || isInitialized) return;

      initializationInProgress.current = true;

      try {
        const info = await chatApi.getServerInfo();

        if (sessionUuid !== info.sessionUuid) {
          const [initialMessages, initialParticipants] = await Promise.all([
            chatApi.getLatestMessages(),
            chatApi.getAllParticipants(),
          ]);

          setMessages(initialMessages);
          setParticipants(initialParticipants);
          setSessionUuid(info.sessionUuid);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
      } finally {
        initializationInProgress.current = false;
      }
    };

    initializeChat();
  }, []);

  return { isInitialized };
};
