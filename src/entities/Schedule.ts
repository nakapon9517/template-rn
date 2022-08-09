import { Timestamp } from 'firebase/firestore';

export type Schedule = {
  id: string;
  groupId: string;
  ownerId: string;
  title: string;
  description: string;
  date: {
    from: Date;
    to: Date;
    isAllDay: boolean;
  };
  place: string;
  isNeedAnswer: boolean;
  answer: {
    joins: string[];
    notJoins: string[];
    pendings: string[];
  };
  updatedDate: Date;
  createdDate: Date;
};

export enum JoinType {
  Join = 'join',
  NotJoin = 'notJoin',
  Pending = 'pending',
}

export type ScheduleResponse = {
  id: string;
  groupId: string;
  ownerId: string;
  title: string;
  description: string;
  date: {
    from: Timestamp;
    to: Timestamp;
    isAllDay: boolean;
  };
  place: string;
  isNeedAnswer: boolean;
  answer: {
    joins: string[];
    notJoins: string[];
    pendings: string[];
  };
  updatedDate: Timestamp;
  createdDate: Timestamp;
};
