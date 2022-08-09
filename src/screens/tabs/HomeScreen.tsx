import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppText, AppView } from '@/appComponents';
import { Colors } from '@/constants';
import { RootTabScreenProps } from '@/entities';
import { useTheme } from '@/hooks';

export const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>): JSX.Element => {
  const { theme } = useTheme();
  return (
    <AppView style={styles.container}>
      <ScrollView>
        <AppText style={{ color: Colors[theme].text }}>HomeScreen</AppText>
      </ScrollView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
