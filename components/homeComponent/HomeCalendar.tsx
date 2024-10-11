import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useRecoilState} from 'recoil';

import styled from 'styled-components/native';
import {DateSelected, ModalCalendar} from '../../atom/atom';
import Day from 'react-native-calendars/src/calendar/day';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};

LocaleConfig.defaultLocale = 'ko';

const HomeCalendar = () => {
  const [isClick, setIsClick] = useRecoilState(ModalCalendar);
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);

  return (
    <>
      <CalendarView>
        <Calendar
          current={selectedDate}
          onDayPress={(day: any) => {
            setSelectedDate(day.dateString);
            console.log('day', day);
            setIsClick(false);
          }}
          monthFormat={'yyyy MM'}
          hideExtraDays={true}
          firstDay={1}
        />
      </CalendarView>
    </>
  );
};

export default HomeCalendar;
const CalendarView = styled(View)`
  width: 80%;
  justify-content: center;
`;
