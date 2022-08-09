import React, { useEffect } from 'react';
import { ColorSchemeName, LogBox, useColorScheme } from 'react-native';
import { useTheme, useSettingConfig, useIntroduction } from '@/hooks';
import { Navigation } from '@/navigation';
import { AnimatedAppLoader } from '@/components';
import { logger } from '@/utils';
import * as Sentry from 'sentry-expo';
import { enableScreens } from 'react-native-screens';
import { LocaleConfig } from 'react-native-calendars';
import { RecoilRoot } from 'recoil';
import { StatusBar } from 'expo-status-bar';
import * as Admob from 'expo-ads-admob';
import * as Notifications from 'expo-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.',
  'Non-serializable values were found in the navigation state',
]);

enableScreens();

LocaleConfig.locales.jp = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false }),
});

const RootScreen = () => {
  const defaultTheme = useColorScheme() as NonNullable<ColorSchemeName>;
  const { theme } = useTheme();
  const { settings } = useSettingConfig();
  const { introduction, saveIntroductionDone } = useIntroduction();

  useEffect(() => {
    if (!introduction) {
      Admob.requestPermissionsAsync().then((res) => logger.action('req_permission_admob', res.status));
      Notifications.requestPermissionsAsync().then((res) => logger.action('req_permission_notification', res.status));
      saveIntroductionDone(true);
    }
  }, [introduction]);

  return (
    <AnimatedAppLoader>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <SafeAreaProvider style={{ flex: 1 }}>
            <Navigation colorScheme={settings?.isDefaultTheme ? defaultTheme : theme ?? defaultTheme} />
            <StatusBar
              style={(settings?.isDefaultTheme ? defaultTheme : theme ?? defaultTheme) === 'dark' ? 'light' : 'dark'}
            />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AnimatedAppLoader>
  );
};

export default function App() {
  return (
    <Sentry.Native.TouchEventBoundary>
      <RecoilRoot>
        <RootScreen />
      </RecoilRoot>
    </Sentry.Native.TouchEventBoundary>
  );
}
