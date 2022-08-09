import React from 'react';
import { Colors, FontSize, Layout } from '@/constants';
import { useTheme } from '@/hooks';
import { AccountScreen, HomeScreen, NoticeScreen } from '@/screens';
import { RootTabParamList } from '@/entities';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_ICON_SIZE = Layout.isLargeDevice ? 40 : 32;
const BottomTab = createBottomTabNavigator<RootTabParamList>();
export const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const backgroundColor = Colors[theme].background;

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { height: (Layout.isLargeDevice ? 48 : 40) + top, backgroundColor },
        tabBarStyle: { height: (Layout.isLargeDevice ? 60 : 56) + bottom, backgroundColor },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors[theme].inactiveTint,
        tabBarInactiveBackgroundColor: backgroundColor,
        tabBarActiveTintColor: Colors[theme].icon,
        tabBarActiveBackgroundColor: backgroundColor,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ホーム',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons size={BOTTOM_ICON_SIZE} name="home" color={color} style={{ width: BOTTOM_ICON_SIZE }} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notice"
        component={NoticeScreen}
        options={{
          title: 'お知らせ',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              size={BOTTOM_ICON_SIZE}
              name="notifications"
              color={color}
              style={{ width: BOTTOM_ICON_SIZE }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'アカウント',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={BOTTOM_ICON_SIZE}
              name="account"
              color={color}
              style={{ width: BOTTOM_ICON_SIZE }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
