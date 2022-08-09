import React, { useRef } from 'react';
import { ColorSchemeName } from 'react-native';
import { logger } from '@/utils';
import { Color, FontSize } from '@/constants';
import { StackNavigator } from './StackNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const { top, bottom } = useSafeAreaInsets();
  const navigationRef = useRef<any>();
  const routeNameRef = useRef();

  return (
    <ToastProvider
      placement="top"
      duration={2000}
      animationType="zoom-in"
      animationDuration={250}
      successColor={Color.green}
      dangerColor={Color.red50}
      warningColor={Color.pink10}
      normalColor={Color.gray50}
      offsetTop={top}
      offsetBottom={bottom + 48}
      swipeEnabled={true}
      textStyle={{ fontSize: FontSize.small }}
      style={{ zIndex: 9999 }}
    >
      <NavigationContainer
        ref={navigationRef}
        onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          if (previousRouteName !== currentRouteName) logger.screen(currentRouteName);
          routeNameRef.current = currentRouteName;
        }}
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      >
        <StackNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
};
