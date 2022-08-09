import { Timestamp } from 'firebase/firestore';

export type PublicInfo = {
  groupAllCount: number;
  publicGroupAllCount: number;
  privateGroupAllCount: number;
  accountAllCount: number;
  sehcduleAllCount: number;
  noticeAllCount: number;
  updatedDate: Timestamp;
};
