import { useCallback, useEffect } from 'react';
import * as Updates from 'expo-updates';
import { Alert, AppState } from 'react-native';
import { logger } from '@/utils';

const useMount = (func: Function) => useEffect(() => func(), []);

export const useOta = () => {
  useMount(() => {
    AppState.addEventListener('change', handleUpdate);
    return () => {
      AppState.removeEventListener('change', handleUpdate);
    };
  });

  const handleUpdate = useCallback(async () => {
    if (__DEV__) return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert('アップデートがあります', 'アプリを再起動します', [
          { text: 'OK', onPress: () => Updates.reloadAsync() },
        ]);
      }
    } catch (error: any) {
      logger.error(error);
    }
  }, []);
};
