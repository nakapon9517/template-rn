import React, { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '@/entities';
import { useTheme } from '@/hooks';
import { AppText, AppTouchableOpacity, AppView } from '@/appComponents';
import { FlashList } from '@shopify/flash-list';

type Data = {
  title: string;
};
const DATA: Data[] = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
];

export const ExampleScreen = ({ navigation, route }: RootStackScreenProps<'Example'>) => {
  const { theme } = useTheme();

  const onPress = useCallback((title: string) => {
    Alert.alert('', `${title}がクリックされました`);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Data }) => {
      return (
        <AppTouchableOpacity name="item" onPress={() => onPress(item.title)}>
          <AppText>{item.title}</AppText>
        </AppTouchableOpacity>
      );
    },
    [theme],
  );

  return (
    <AppView style={styles.container}>
      <FlashList data={DATA} renderItem={renderItem} estimatedItemSize={200} contentContainerStyle={styles.list} />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 8,
  },
  item: {
    width: '100%',
    height: 200,
  },
});
