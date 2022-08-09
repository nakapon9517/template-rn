import { Timestamp } from 'firebase/firestore';

export type Chat = {
  id: string;
  messages: Message[];
};

export type Message = {
  id: string;
  index: number;
  groupId: string;
  chatId: string;
  accountId: string;
  type: MessageType;
  text: string | null;
  uri: string | null;
  targetId?: string | null; // scheduleId
  updatedDate: Timestamp;
  createdDate: Timestamp;
};

export type Readed = ReadedChat;

export type ReadedChat = {
  id: 'chat';
  data: {
    [chatId: string]: {
      latestMessageId: string;
    };
  };
};

export enum MessageType {
  Text = 'text',
  Image = 'image',
  Schedule = 'schedule',
  System = 'system',
}

// スケジュールが作成済みのケースも考慮する
// スケジュール作成・グループへの参加時にメッセージにも表示されるように
