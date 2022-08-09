import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Storage, StorageName } from '@/utils';
import { SettingConfig } from '@/entities';
import { settingsState } from '@/atoms';

const storage = new Storage<SettingConfig>();
export const useSettingConfig = () => {
  const [settings, setSettings] = useRecoilState(settingsState);

  const saveSettings = useCallback((settings: SettingConfig) => {
    storage.save(StorageName.Settings, settings);
    setSettings(settings);
  }, []);

  return {
    settings,
    setSettings,
    saveSettings,
  };
};
