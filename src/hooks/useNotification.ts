import { useEffect } from 'react';

const useMount = (func: Function) => useEffect(() => func(), []);

export const useNotification = () => {
  // const navigation = useNavigation();
  // useMount(() => {
  //   // ユーザーが通知を操作（通知タップなど）するたびに呼び出される
  //   const responseReceivedListener = Notifications.addNotificationResponseReceivedListener(async (response) => {
  //     const content = response.notification.request.content.data as Notice['action']['data'];
  //     await handleLinking(content);
  //   });
  //   // アプリ実行中に通知を受信するたびに呼び出される
  //   // const receivedListener = Notifications.addNotificationReceivedListener(async (notification) => {
  //   // const content = notification.request.content.data as Notice['action']['data'];
  //   // await handleLinking(content);
  //   // });
  //   return () => {
  //     Notifications.removeNotificationSubscription(responseReceivedListener);
  //     // Notifications.removeNotificationSubscription(receivedListener);
  //   };
  // });
  // const handleLinking = useCallback(async (data: Notice['action']['data']) => {
  //   const group = await fetchGroup(data?.groupId ?? '');
  //   switch (data?.link) {
  //     // case DeepLinkHost.GroupApproval: // 参加申請が来た場合
  //     //   if (!group) return;
  //     //   navigation.navigate('JoinApproval', { noticeId: data.noticeId, group, approvalAccount: data.approvalAccount });
  //     //   break;
  //     // case DeepLinkHost.GroupChat: // 参加申請が承認された場合
  //     //   if (!group) return;
  //     //   navigation.navigate('Chat', { group, title: group.name });
  //     //   break;
  //     // case DeepLinkHost.GroupSchedule: // スケジュールが作成された場合
  //     //   if (!group) return;
  //     //   const schedule = await fetchSchedule(data.groupId, data.scheduleId);
  //     //   if (schedule) navigation.navigate('SchedulePreview', { group, schedule });
  //     //   break;
  //     // case DeepLinkHost.GroupJoin: // 招待リンクをクリックした場合
  //     //   const simpleGroup = await fetchSimpleGroup(data.groupId);
  //     //   if (simpleGroup) navigation.navigate('RequestJoin', { simpleGroup });
  //     //   break;
  //     default:
  //       break;
  //   }
  // }, []);
};
