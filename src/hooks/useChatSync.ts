import { useEffect, useRef } from "react";
import { chatApi } from "../api/chatApi";
import useChatStore from "../store/chatStore";

const SYNC_INTERVAL = 10000;

interface ChatSyncHookResult {
  isInitialized: boolean;
  syncData: () => Promise<void>;
}

export const useChatSync = (): ChatSyncHookResult => {
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializationInProgress = useRef<boolean>(false);

  const {
    sessionUuid,
    lastSync,
    isInitialized,
    setMessages,
    setParticipants,
    updateMessages,
    updateParticipants,
    setSessionUuid,
    setLastSync,
    setIsInitialized,
    clearLocalData,
  } = useChatStore();

  const syncData = async (): Promise<void> => {
    try {
      const info: TServerInfo = await chatApi.getServerInfo();
      const currentTime = Date.now();

      // If session has changed or it's first initialization
      if (sessionUuid !== info.sessionUuid || !isInitialized) {
        clearLocalData();
        const [messages, participants]: [TMessage[], TParticipant[]] =
          await Promise.all([
            chatApi.getLatestMessages(),
            chatApi.getAllParticipants(),
          ]);

        setMessages(messages);
        setParticipants(participants);
        setSessionUuid(info.sessionUuid);
        setLastSync(currentTime);
        setIsInitialized(true);
      }
      // Regular sync for updates
      else if (lastSync > 0) {
        const [messageUpdates, participantUpdates]: [
          TMessage[],
          TParticipant[]
        ] = await Promise.all([
          chatApi.getMessageUpdates(lastSync),
          chatApi.getParticipantUpdates(lastSync),
        ]);

        if (messageUpdates.length > 0) {
          updateMessages(messageUpdates);
        }
        if (participantUpdates.length > 0) {
          updateParticipants(participantUpdates);
        }
        setLastSync(currentTime);
      }
    } catch (error) {
      console.error("Failed to sync chat data:", error);
    }
  };

  const startSync = (): void => {
    if (syncTimeoutRef.current) return;

    const scheduleNextSync = (): void => {
      syncTimeoutRef.current = setTimeout(async () => {
        await syncData();
        scheduleNextSync();
      }, SYNC_INTERVAL);
    };

    scheduleNextSync();
  };

  const stopSync = (): void => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = null;
    }
  };

  // Initial load effect
  useEffect(() => {
    const initialize = async (): Promise<void> => {
      if (initializationInProgress.current || isInitialized) return;
      initializationInProgress.current = true;

      try {
        await syncData();
      } finally {
        initializationInProgress.current = false;
      }
    };

    initialize();
  }, []);

  // Start regular sync after initialization
  useEffect(() => {
    if (isInitialized) {
      startSync();
    }
    return () => stopSync();
  }, [isInitialized]);

  return { isInitialized, syncData };
};
