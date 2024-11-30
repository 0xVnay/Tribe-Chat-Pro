import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useChatStore = create(
  persist<ChatState>(
    (set) => ({
      messages: [],
      participants: [],
      sessionUuid: null,
      lastSync: 0,
      isInitialized: false,

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

      setParticipants: (participants) => set({ participants }),
      setSessionUuid: (uuid) => set({ sessionUuid: uuid }),
      setLastSync: (timestamp) => set({ lastSync: timestamp }),
      setIsInitialized: (initialized) => set({ isInitialized: initialized }),
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
