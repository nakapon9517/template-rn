import { Timestamp } from 'firebase/firestore';

export type Question = {
  id: string;
  groupId: string;
  ownerId: string;
  title: string;
  description: string;
  ask: {
    date?: AskDate;
    majority?: AskMajority;
    place?: AskPlace;
  };
  limitDate: {
    from: Timestamp;
    to: Timestamp;
  };
  place: string;
  answeredAccount: string[];
  updatedDate: Timestamp;
  createdDate: Timestamp;
};

type BaseAsk = { title: string };

type AskDate = BaseAsk & {
  title: string;
  dates: {
    check: boolean;
    date: Timestamp;
  }[];
};

type AskMajority = BaseAsk & {
  title: string;
  majorities: {
    check: boolean;
    text: string;
  }[];
};

type AskPlace = BaseAsk & {
  title: string;
};
