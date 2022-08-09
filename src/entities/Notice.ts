import { Timestamp } from 'firebase/firestore';

export type Notice = {
  id: string;
  accountId: string;
  groupId?: string;
  title: string;
  description: string;
  action:
    | ActionText
    | ActionDeepLinkInvite
    | ActionDeepLinkRequestJoin
    | ActionDeepLinkApproval
    | ActionDeepLinkSchedule;
  updatedDate: Timestamp;
};

export enum DeepLinkHost {
  GroupJoin = 'group/join',
  GroupApproval = 'group/approval',
  GroupChat = 'group/chat',
  GroupSchedule = 'group/schedule',
}

export enum ActionType {
  Text = 'text',
  DeepLink = 'deep_link',
  DeepLinkJoin = 'deep_link_join',
  DeepLinkApproval = 'deep_link_approval',
  DeepLinkQuestion = 'deep_link_question',
  DeepLinkSchedule = 'deep_link_schedule',
}

export type ActionText = {
  type: ActionType.Text;
  data: null;
};

export type ActionDeepLinkInvite = {
  type: ActionType.DeepLinkJoin;
  data: {
    link: DeepLinkHost.GroupJoin;
    groupId: string;
  };
};

// xxさんから承認依頼が届いています
export type ActionDeepLinkRequestJoin = {
  type: ActionType.DeepLink;
  data: {
    link: DeepLinkHost.GroupApproval;
    groupId: string;
    noticeId: string;
    approvalAccount: {
      id: string;
      name: string;
      uri: string;
    };
  };
};

// 参加承認依頼が許可されました
export type ActionDeepLinkApproval = {
  type: ActionType.DeepLinkApproval;
  data: {
    link: DeepLinkHost.GroupChat;
    groupId: string;
    chatId: string;
  };
};

// yyが作成されました
// export type ActionDeepLinkQuestion = {
//   type: ActionType.DEEP_LINK_QUESTION;
//   data: {
//     link: DeepLinkHost.GroupQuestion;
//     groupId: string;
//     questionId: string;
//   };
// };

// yyが作成されました
export type ActionDeepLinkSchedule = {
  type: ActionType.DeepLinkSchedule;
  data: {
    link: DeepLinkHost.GroupSchedule;
    groupId: string;
    scheduleId: string;
  };
};
