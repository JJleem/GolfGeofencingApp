import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  NativeEventEmitter,
  NativeModules,
  PanResponder,
  Pressable,
  Text as RNText,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Text} from '../../theme/theme';
import styled from 'styled-components/native';
import {LocationData} from '../../interface/interface';
import {useRecoilState} from 'recoil';
import {locationState} from '../../atom/atom';
import Icon from 'react-native-vector-icons/Ionicons';
import ScheduleBox from '../../components/homeComponent/ScheduleBox';
import ReservationBox from '../../components/homeComponent/ReservationBox';

const HomeScreen: React.FC = () => {
  const [locationInfo, setLocationInfo] = useRecoilState(locationState);

  useEffect(() => {
    const locationEventEmitter = new NativeEventEmitter(
      NativeModules.LocationModule,
    );

    const locationListener = locationEventEmitter.addListener(
      'LocationUpdate',
      (data: string) => {
        try {
          const parsedData: LocationData = JSON.parse(data);
          const {
            latitude,
            longitude,
            accuracy,
            altitude,
            speed,
            bearing,
            provider,
            time,
            requestId,
            isCheck,
          } = parsedData;

          const formattedTime = new Date(Number(time)).toLocaleString();

          // 의존성 배열에 setLocationInfo 추가
          setLocationInfo({
            latitude,
            longitude,
            accuracy,
            altitude,
            speed,
            bearing,
            provider: provider || '정보 없음',
            time: formattedTime,
            requestId,
            isCheck,
          });
          console.log(locationInfo);
        } catch (error) {
          console.error('위치 정보 파싱 오류:', error);
        }
      },
    );

    return () => {
      locationListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /////////////////////////

  return (
    <MainView nestedScrollEnabled={true}>
      <TopSection>
        <MockupImg />
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          안녕하세요, 김규리님.
        </Text>
      </TopSection>
      <ScheduleBox />
      <ReservationBox />
    </MainView>
  );
};

export default HomeScreen;

const MainView = styled(ScrollView)`
  padding: 0px 16px;
  flex: 1;
  background-color: #f2f4f6;
`;
const TopSection = styled(View)`
  margin-top: 44px;
  gap: 8px;
  margin-bottom: 41px;
`;
const MockupImg = styled(View)`
  width: 163px;
  height: 29px;
  background-color: #f00;
`;
