import React, { useMemo } from 'react';
import { useTheme } from '@/hooks';
import * as Formatter from '@/utils/Formatter';
import { Colors, FontSize } from '@/constants';
import { Calendar as DefaultCalendar } from 'react-native-calendars';
import { Theme as CalendarTheme } from 'react-native-calendars/src/types';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

type MarkedProps = {
  [key: string]: MarkingProps;
};

type CalendarProps = {
  selectedDate: Date;
  marked: MarkedProps;
  onChangeMonth: (_: number) => void;
  onPressDay: (_: Date) => void;
};

const MIN_DATE = '2020-01-01';
const MAX_DATE = '2030-12-31';

export const Calendar = ({ selectedDate, marked, onChangeMonth, onPressDay }: CalendarProps) => {
  const { theme } = useTheme();
  const currentDate = useMemo(() => Formatter.dateHyphen(selectedDate), [selectedDate]);

  const calendarTheme: CalendarTheme = useMemo(
    () => ({
      backgroundColor: Colors[theme].background,
      calendarBackground: Colors[theme].background,
      textSectionTitleDisabledColor: Colors[theme].inactiveTint,
      todayTextColor: Colors[theme].text,
      todayButtonFontWeight: '900',
      todayBackgroundColor: Colors[theme].primary + '33',
      textDisabledColor: Colors[theme].text + '33',
      dotColor: Colors[theme].text,
      arrowColor: Colors[theme].description,
      disabledArrowColor: Colors[theme].inactiveTint,
      monthTextColor: Colors[theme].text,
      indicatorColor: Colors[theme].shadowColor,
      textMonthFontWeight: 'bold',
      textDayHeaderFontWeight: 'bold',
      textMonthFontSize: FontSize.small,
      textDayHeaderFontSize: FontSize.small,
      textDayStyle: { fontSize: FontSize.small, color: Colors[theme].text },
      selectedDayTextColor: Colors[theme].background,
      selectedDayBackgroundColor: Colors[theme].description,
    }),
    [theme],
  );

  return (
    <DefaultCalendar
      markingType="multi-period"
      markedDates={marked}
      // markedDates={{ ...marked, [currentDate]: { selected: true, disableTouchEvent: true } }}
      current={currentDate}
      minDate={MIN_DATE}
      maxDate={MAX_DATE}
      monthFormat={'yyyy年MM月'}
      disableMonthChange={true}
      firstDay={1}
      onMonthChange={(date) => onChangeMonth(date.month - 1)}
      disableArrowLeft={false}
      disableArrowRight={false}
      enableSwipeMonths={true}
      disableAllTouchEventsForDisabledDays={true}
      disableAllTouchEventsForInactiveDays={true}
      theme={calendarTheme}
      onDayPress={(date) => onPressDay(new Date(date.year, date.month - 1, date.day))}
    />
  );
};
