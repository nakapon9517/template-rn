import { Timestamp } from 'firebase/firestore';

export type Account = {
  id: string;
  name?: string;
  expoToken: string | null;
  uri?: string;
  joinGroupIds: string[];
  requestedGroupIds: string[];
  isSubscriber: boolean;
  updatedDate: Timestamp;
  createdDate: Timestamp;
};

export type BaseAccount = { id: Account['id']; name: Account['name']; uri: string };
