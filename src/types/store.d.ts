interface ChatState {
  messages: TMessage[];
  participants: TParticipant[];
  sessionUuid: string | null;
  lastSync: number;

  setMessages: (messages: TMessage[]) => void;
  addMessage: (message: TMessage) => void;
  updateMessage: (message: TMessage) => void;
  setParticipants: (participants: TParticipant[]) => void;
  setSessionUuid: (uuid: string) => void;
  setLastSync: (timestamp: number) => void;
}
