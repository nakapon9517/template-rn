import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

const clearDate = (date: Date) => dayjs(date).set('hours', 0).set('minute', 0).set('seconds', 0).set('milliseconds', 0);
const now = clearDate(new Date());

/** Change -> ¥999,999 */
export const price = (money: number | undefined): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(money ?? 0);
};

/** Change -> YYYY-MM-DD */
export const dateHyphen = (date: Date): string => {
  return dayjs(date).locale(ja).format('YYYY-MM-DD');
};
/** Change -> YYYY/MM */
export const dateSlashYearMonth = (date: Date): string => {
  return dayjs(date).locale(ja).format('YYYY/M');
};
/** Change -> MM/DD */
export const dateSlashMonthDate = (date: Date): string => {
  return dayjs(date).locale(ja).format('MM/DD');
};
/** Change -> YYYY/MM/DD */
export const dateSlash = (date: Date): string => {
  return dayjs(date).locale(ja).format('YYYY/MM/DD');
};
/** Change -> YYYY/MM/DD H:mm*/
export const dateFullSlash = (date: Date): string => {
  return dayjs(date).locale(ja).format('YYYY/MM/DD H:mm');
};
/** Change -> YYYY/M/D */
export const dateShortSlash = (date: Date): string => {
  return dayjs(date).locale(ja).format('YYYY/M/D');
};

/** Change -> YYYY月M月D日 */
export const dateJapanease = (date?: Date): string | undefined => {
  return date && dayjs(date).locale(ja).format('YYYY年M月D日');
};
export const dateJapaneaseWithWeek = (date?: Date): string | undefined => {
  return date && dayjs(date).locale(ja).format('YYYY年M月D日(ddd)');
};
/** Change -> YYYY月M月D日 H:mm */
export const dateFullJapanease = (date?: Date): string | undefined => {
  return date && dayjs(date).locale(ja).format('YYYY年M月D日 H:mm');
};
/** Change -> M月D日 */
export const dateJapaneaseMonthDay = (date?: Date): string | undefined => {
  return date && dayjs(date).locale(ja).format('M月D日(ddd)');
};
/** Change -> M月D日 H:mm */
export const dateJapaneaseMonthDayWidhTime = (date?: Date): string | undefined => {
  return date && dayjs(date).locale(ja).format('M月D日(ddd)H:mm');
};

/** Change -> HH:mm */
export const dateTime = (date?: Date): string | undefined => {
  return date && dayjs(date).locale(ja).format('HH:mm');
};
/** Change -> H:m */
export const dateShortTime = (date?: Date): string | undefined => {
  return date && dayjs(date).locale(ja).format('H:mm');
};

/** Change -> Time only -> 2021/01/01 XX:XX:XX */
export const getDateTimeOnly = (date: Date) => {
  return dayjs(date).set('year', 2021).set('month', 1).set('day', 1).set('millisecond', 0).toDate();
};

export const generateDateDiff = (a: Date, b: Date, isAllDay: boolean): { day?: string; times: string[] } => {
  const diff = dateShortSlash(a) == dateShortSlash(b);
  if (diff) {
    return { day: dateJapaneaseMonthDay(a), times: [dateTime(a)!, dateTime(b)!] };
  }

  return { times: [dateJapaneaseMonthDayWidhTime(a)!, dateJapaneaseMonthDayWidhTime(b)!] };
};

/** Change -> Id */
export const getId = (array: any[] | undefined): string => {
  if (Array.isArray(array)) {
    return array.length > 0 ? (Math.max(...array.map((_) => Number(_.id))) + 1).toString() : '0';
  } else {
    return '0';
  }
};

export const dateDiffDays = (date: Date) => {
  return dayjs(now).diff(clearDate(date), 'days');
};

/** Change -> X年Yヶ月 */
export const getPeriodJapanease = (month: number) => {
  if (!isFinite(month)) return '';
  if (month === 0) return '0年';
  const yearPeriod = Math.floor(month / 12);
  const monthPeriod = Math.floor(month % 12);
  return `${yearPeriod ? yearPeriod + '年' : ''}${monthPeriod !== 0 ? monthPeriod + 'ヶ月' : ''}`;
};
