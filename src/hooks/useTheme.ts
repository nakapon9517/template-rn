import { ColorSchemeName, useColorScheme } from 'react-native';
import { Storage, StorageName } from '@/utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { settingsState, themeState } from '@/atoms';
import { useCallback, useMemo } from 'react';

const storage = new Storage<ColorSchemeName>();
export const useTheme = () => {
  const defaultTheme = useColorScheme() as NonNullable<ColorSchemeName>;
  const [theme, setTheme] = useRecoilState(themeState);
  const settings = useRecoilValue(settingsState);

  const saveTheme = useCallback((theme: 'light' | 'dark') => {
    if (theme) {
      storage.save(StorageName.Theme, theme);
    } else {
      storage.delete(StorageName.Theme);
    }
    setTheme(theme);
  }, []);

  const showTheme = useMemo(
    () => (settings?.isDefaultTheme ? defaultTheme : theme ?? defaultTheme),
    [settings, defaultTheme, theme],
  );

  return {
    theme: showTheme,
    setTheme,
    saveTheme,
  };
};
