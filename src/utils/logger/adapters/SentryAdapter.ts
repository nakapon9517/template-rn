import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Updates from 'expo-updates';
import { User } from 'firebase/auth';
import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';
import { Adapter } from './';
import { AppEnv } from '@/entities';

const isNotDevelop = process.env.APP_ENV == AppEnv.Stag || process.env.APP_ENV == AppEnv.Prod;

Sentry.init({
  dsn: Constants.manifest?.web?.config?.sentry.dsn,
  environment: Constants.manifest?.web?.config?.sentry.environment,
  enabled: Device.isDevice && !__DEV__,
  release: Constants.manifest?.revisionId,
  enableNative: isNotDevelop && Device.isDevice && (Platform.OS === 'ios' || Platform.OS === 'android'),
  enableInExpoDevelopment: true,
  debug: false,
});

const sentry = Platform.OS === 'web' ? Sentry.Browser : Sentry.Native;

class SentryAdapter implements Adapter {
  currentScreen = 'Launch';

  async set(user: User | undefined): Promise<void> {
    if (__DEV__) return;
    if (user) {
      await sentry.setUser({
        id: user.uid,
        email: user.email ?? undefined,
        username: user.displayName ?? '',
        revisionId: (Updates.manifest as Record<string, unknown>)?.revisionId,
      });
    } else {
      await sentry.setUser({});
    }
  }

  screen(name: string): void {
    if (__DEV__) return;
    this.currentScreen = name;
    sentry.addBreadcrumb({
      category: 'SCREEN',
      message: name,
    });
  }

  action(name: string, id?: string): void {
    if (__DEV__) return;
    sentry.addBreadcrumb({
      category: 'ACTION',
      message: name,
      data: {
        id,
        screen: this.currentScreen,
      },
    });
  }

  error(error: Error): void {
    if (__DEV__) return;
    sentry.captureException(error);
  }
}

export { SentryAdapter };
