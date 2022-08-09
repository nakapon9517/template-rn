import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';

export * from './hooks/useCallable';
export * from './logger/Logger';
export * from './Coloring';
export * from './FirebaseStorage';
export * from './Formatter';
export * from './Storage';
export * from './StoreReview';
export * from './UrlParser';

export const REGEX_EMAIL = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

export const chunk = <T>(array: T[], size: number): T[][] => {
  return array.reduce(
    (acc, _, index) => (index % size ? acc : [...acc, array.slice(index, index + size)]),
    [] as T[][],
  );
};

export const getRandomNumber = (max: number, min?: number) => {
  return Math.floor(Math.random() * (max - (min ?? 0))) + (min ?? 0);
};

export const getUUIDV4 = () => {
  return uuidv4();
};

export const getRandomColor = (opacity?: number) => {
  return `rgba(${getRandomNumber(255)},${getRandomNumber(255)},${getRandomNumber(255)},${opacity ?? 1})`;
};

export const clearDateTime = (date: Date): Dayjs => dayjs(date).second(0).millisecond(0);
export const clearDateHourTime = (date: Date): Dayjs => dayjs(date).hour(0).second(0).millisecond(0);

export const diffDate = (a?: Date, b?: Date): number => {
  if (!a || !b) return 0;
  const aDate = dayjs(a);
  const bDate = dayjs(b);
  const beforeDate = dayjs(new Date(aDate.year(), aDate.month(), aDate.date()));
  const afterDate = dayjs(new Date(bDate.year(), bDate.month(), bDate.date()));
  return beforeDate.diff(afterDate, 'day');
};
