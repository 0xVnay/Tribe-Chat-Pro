import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useChatStore = create(
  persist<ChatState>(
    (set, get) => ({
      messages: [],
      participants: [],
      sessionUuid: null,
      lastSync: 0,
      isInitialized: false,
      isLoadingMore: false,

      setMessages: (messages) => set({ messages }),

      addMessage: (message) =>
        set((state) => ({
          messages: [message, ...state.messages],
        })),

      updateMessage: (message) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.uuid === message.uuid ? message : m
          ),
        })),

      updateMessages: (updatedMessages) =>
        set((state) => {
          const messageMap = new Map(state.messages.map((m) => [m.uuid, m]));
          updatedMessages.forEach((message) =>
            messageMap.set(message.uuid, message)
          );
          return {
            messages: Array.from(messageMap.values()).sort(
              (a, b) => b.sentAt - a.sentAt
            ),
          };
        }),

      appendOlderMessages: (olderMessages) =>
        set((state) => {
          const messageMap = new Map(state.messages.map((m) => [m.uuid, m]));
          olderMessages.forEach((message) => {
            if (!messageMap.has(message.uuid)) {
              messageMap.set(message.uuid, message);
            }
          });
          return {
            messages: Array.from(messageMap.values()).sort(
              (a, b) => b.sentAt - a.sentAt
            ),
          };
        }),

      setParticipants: (participants) => set({ participants }),

      updateParticipants: (updatedParticipants) =>
        set((state) => {
          const participantMap = new Map(
            state.participants.map((p) => [p.uuid, p])
          );
          updatedParticipants.forEach((participant) =>
            participantMap.set(participant.uuid, participant)
          );
          return {
            participants: Array.from(participantMap.values()),
          };
        }),

      setSessionUuid: (uuid) => set({ sessionUuid: uuid }),
      setLastSync: (timestamp) => set({ lastSync: timestamp }),
      setIsLoadingMore: (loading) => set({ isLoadingMore: loading }),
      setIsInitialized: (initialized) => set({ isInitialized: initialized }),

      clearLocalData: () =>
        set({
          messages: [],
          participants: [],
          lastSync: 0,
          isInitialized: false,
        }),
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        // Reset isInitialized on rehydration
        state?.setIsInitialized(false);
      },
    }
  )
);

export default useChatStore;
