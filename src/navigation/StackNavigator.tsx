import React from 'react';
import { useNotification, useOta } from '@/hooks';
import { ExampleScreen } from '@/screens';
import { RootStackParamList } from '@/entities';
import { BottomTabNavigator } from './BottomTabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const StackNavigator = () => {
  useOta();
  useNotification();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Example" component={ExampleScreen} />
    </Stack.Navigator>
  );
};
