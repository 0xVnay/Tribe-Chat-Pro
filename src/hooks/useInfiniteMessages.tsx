import { useCallback } from "react";
import { chatApi } from "../api/chatApi";
import useChatStore from "../store/chatStore";
import { useMessageListItems } from "./useChatSelectors";

export const useInfiniteMessages = () => {
  const listItems = useMessageListItems();
  const { appendOlderMessages, isLoadingMore, setIsLoadingMore } =
    useChatStore();

  const loadMoreMessages = useCallback(async () => {
    if (isLoadingMore || listItems.length === 0) return;

    const lastMessageItem = listItems
      .filter((item) => item.type === "message")
      .pop();
    if (!lastMessageItem || lastMessageItem.type !== "message") return;

    setIsLoadingMore(true);
    try {
      const olderMessages = await chatApi.getOlderMessages(
        lastMessageItem.uuid
      );
      if (olderMessages.length > 0) {
        appendOlderMessages(olderMessages);
      }
    } catch (error) {
      console.error("Failed to load older messages:", error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, listItems, appendOlderMessages, setIsLoadingMore]);

  return {
    loadMoreMessages,
    isLoadingMore,
  };
};
