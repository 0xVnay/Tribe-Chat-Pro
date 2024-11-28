import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const chatApi = {
  // Server Info
  getServerInfo: async (): Promise<TServerInfo> => {
    const { data } = await api.get<TServerInfo>(ENDPOINTS.INFO);
    return data;
  },

  // Messages
  getAllMessages: async (): Promise<TMessage[]> => {
    const { data } = await api.get<TMessage[]>(ENDPOINTS.ALL_MESSAGES);
    return data;
  },

  getLatestMessages: async (): Promise<TMessage[]> => {
    const { data } = await api.get<TMessage[]>(ENDPOINTS.LATEST_MESSAGES);
    return data;
  },

  getOlderMessages: async (refMessageUuid: string): Promise<TMessage[]> => {
    const { data } = await api.get<TMessage[]>(
      ENDPOINTS.OLDER_MESSAGES(refMessageUuid)
    );
    return data;
  },

  getMessageUpdates: async (timestamp: number): Promise<TMessage[]> => {
    const { data } = await api.get<TMessage[]>(
      ENDPOINTS.MESSAGE_UPDATES(timestamp)
    );
    return data;
  },

  sendNewMessage: async (text: string): Promise<TMessage> => {
    const { data } = await api.post<TMessage>(ENDPOINTS.NEW_MESSAGE, { text });
    return data;
  },

  // Participants
  getAllParticipants: async (): Promise<TParticipant[]> => {
    const { data } = await api.get<TParticipant[]>(ENDPOINTS.ALL_PARTICIPANTS);
    return data;
  },

  getParticipantUpdates: async (timestamp: number): Promise<TParticipant[]> => {
    const { data } = await api.get<TParticipant[]>(
      ENDPOINTS.PARTICIPANT_UPDATES(timestamp)
    );
    return data;
  },
};
