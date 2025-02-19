type TMessageAttachment = {
  uuid: string;
  type: "image";
  url: string;
  width: number;
  height: number;
};

type TReaction = {
  uuid: string;
  participantUuid: string;
  value: string;
};

type TParticipant = {
  uuid: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  email?: string;
  jobTitle?: string;
  createdAt: number;
  updatedAt: number;
};

type TMessage = {
  uuid: string;
  text: string;
  attachments: TMessageAttachment[];
  replyToMessage?: TMessage;
  reactions: TReaction[];
  authorUuid: string;
  sentAt: number;
  updatedAt: number;
};

interface TMention {
  id: string;
  name: string;
  startIndex: number;
  endIndex: number;
}

interface TMentionData {
  isActive: boolean;
  query: string;
  startIndex: number;
}

interface TInputPosition {
  height: number;
  maxHeight: number;
}

interface TMessageWithUI extends TMessage {
  showHeader?: boolean;
  replyParticipant?: TParticipant;
  mentions?: TMention[];
}

type TListItemBase = {
  uuid: string;
};

type TMessageItem = TMessageWithUI &
  TListItemBase & {
    type: "message";
  };

type TDateItem = {
  type: "date";
  date: number;
} & TListItemBase;

type TListItem = TMessageItem | TDateItem;

type TServerInfo = {
  sessionUuid: string;
  apiVersion: number;
};

type TMessageJSON = Omit<TMessage, "replyToMessageUuid"> & {
  replyToMessage?: Omit<TMessage, "replyToMessageUuid">;
};
