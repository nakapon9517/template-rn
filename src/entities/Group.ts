import { Timestamp } from 'firebase/firestore';
import { BaseAccount } from './Account';

export type Group = {
  id: string;
  chatId: string;
  ownerId: string;
  name: string;
  caption: string;
  color: string;
  uri?: string;
  latestMessage?: {
    id: string;
    text: string;
  };
  private: boolean;
  needApproval: boolean;
  joinAccountIds: string[];
  joinAccounts: BaseAccount[];
  dropAccounts: string[]; // 再参加不可
  updatedDate: Date;
  createdDate: Date;
};

export type SimpleGroup = Pick<Group, 'id' | 'name' | 'caption' | 'uri' | 'private' | 'needApproval'>;

export type GroupResponse = {
  id: string;
  chatId: string;
  ownerId: string;
  name: string;
  caption: string;
  color: string;
  uri?: string;
  latestMessage?: {
    id: string;
    text: string;
  };
  private: boolean;
  needApproval: boolean;
  joinAccountIds: string[];
  joinAccounts: BaseAccount[];
  dropAccounts: string[]; // 再参加不可
  updatedDate: Timestamp;
  createdDate: Timestamp;
};
