import { useCallback } from "react";
import { chatApi } from "../api/chatApi";
import useChatStore from "../store/chatStore";

export const useChatMessageActions = () => {
  const addMessage = useChatStore((state) => state.addMessage);

  const sendMessage = useCallback(
    async (text: string) => {
      try {
        const message = await chatApi.sendNewMessage(text);
        addMessage(message);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [addMessage]
  );

  return { sendMessage };
};
