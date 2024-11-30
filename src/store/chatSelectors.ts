export const selectMessages = (state: ChatState) => state.messages;
export const selectParticipants = (state: ChatState) => state.participants;
export const selectSessionUuid = (state: ChatState) => state.sessionUuid;
export const selectIsInitialized = (state: ChatState) => state.isInitialized;
export const selectLastSync = (state: ChatState) => state.lastSync;
