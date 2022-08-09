import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseAccount } from './Account';
import { Group, SimpleGroup } from './Group';
import { Schedule } from './Schedule';
import { SearchConditionType } from './SearchCondition';
import { Station } from './Station';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  // modal
  JoinApproval: { noticeId: string; group: Group; approvalAccount: BaseAccount };
  RequestJoin: { simpleGroup: SimpleGroup };
  SearchCondition: { type: SearchConditionType };
  StationPreview: { station: Station };

  // child
  Example: undefined;

  // root
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Home: undefined;
  Schedule: undefined;
  Notice: undefined;
  Account: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
