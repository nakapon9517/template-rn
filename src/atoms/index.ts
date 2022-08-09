import { SettingConfig } from '@/entities';
import { ColorSchemeName } from 'react-native';
import { atom } from 'recoil';

export const themeState = atom<NonNullable<ColorSchemeName>>({
  key: 'theme',
  default: 'light',
});

export const settingsState = atom<SettingConfig>({
  key: 'settings',
  default: { isDefaultTheme: true },
});

export const introductionState = atom<boolean>({
  key: 'introduction',
  default: false,
});
