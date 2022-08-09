import AsyncStorage from '@react-native-async-storage/async-storage';
import { stringify, parse } from 'telejson';

export enum StorageName {
  Theme = '@theme',
  Settings = '@settings',
  Introduction = '@introduction',
  Favorites = '@favorites',
  ReadNotices = '@read_notices',
}
export class Storage<T> {
  async save(key: string, value: T): Promise<void> {
    const jsonValue = stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  }

  async get(key: string): Promise<any> {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? parse(jsonValue) : undefined;
  }

  async delete(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}
