import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppText, AppView } from '@/appComponents';
import { RootTabScreenProps } from '@/entities';

export const AccountScreen = ({ navigation }: RootTabScreenProps<'Account'>): JSX.Element => {
  return (
    <AppView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <AppText>AccountScreen</AppText>
      </ScrollView>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    width: '100%',
  },
});
