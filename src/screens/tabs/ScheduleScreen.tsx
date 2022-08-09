import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppText, AppView } from '@/appComponents';
import { RootTabScreenProps } from '@/entities';

export const ScheduleeScreen = ({ navigation }: RootTabScreenProps<'Schedule'>): JSX.Element => {
  return (
    <AppView style={styles.container}>
      <ScrollView>
        <AppText>ScheduleScreen</AppText>
      </ScrollView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
