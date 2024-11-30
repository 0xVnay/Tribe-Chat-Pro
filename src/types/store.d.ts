interface ChatState {
  messages: TMessage[];
  participants: TParticipant[];
  sessionUuid: string | null;
  lastSync: number;
  isLoadingMore: boolean;
  isInitialized: boolean;

  setMessages: (messages: TMessage[]) => void;
  addMessage: (message: TMessage) => void;
  updateMessage: (message: TMessage) => void;
  updateMessages: (updatedMessages: TMessage[]) => void;
  appendOlderMessages: (messages: TMessage[]) => void;
  setIsLoadingMore: (loading: boolean) => void;
  setParticipants: (participants: TParticipant[]) => void;
  updateParticipants: (updatedParticipants: TParticipant[]) => void;
  setSessionUuid: (uuid: string) => void;
  setLastSync: (timestamp: number) => void;
  setIsInitialized: (initialized: boolean) => void;
  clearLocalData: () => void;
}
