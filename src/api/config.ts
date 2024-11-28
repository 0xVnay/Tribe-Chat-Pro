export const API_BASE_URL = "http://dummy-chat-server.tribechat.pro/api";

export const ENDPOINTS = {
  INFO: "/info",
  ALL_MESSAGES: "/messages/all",
  LATEST_MESSAGES: "/messages/latest",
  OLDER_MESSAGES: (refMessageUuid: string) =>
    `/messages/older/${refMessageUuid}`,
  MESSAGE_UPDATES: (timestamp: number) => `/messages/updates/${timestamp}`,
  NEW_MESSAGE: "/messages/new",
  ALL_PARTICIPANTS: "/participants/all",
  PARTICIPANT_UPDATES: (timestamp: number) =>
    `/participants/updates/${timestamp}`,
} as const;
