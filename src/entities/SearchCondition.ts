export enum SearchConditionType {
  Task = 'search_condition_task',
}

export type SearchConditionSchedule = {
  groupId: string | undefined;
  showAlreadyRead: boolean | undefined;
};
