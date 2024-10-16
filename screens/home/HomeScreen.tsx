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
import {LocationData, UserDetailType} from '../../interface/interface';
import {useRecoilState} from 'recoil';
import {locationState, UserDetail} from '../../atom/atom';
import Icon from 'react-native-vector-icons/Ionicons';
import ScheduleBox from '../../components/homeComponent/ScheduleBox';
import ReservationBox from '../../components/homeComponent/ReservationBox';
import {
  MainView,
  MockupImg,
  TopSection,
} from '../../components/homeComponent/HomeScreenStyle';
import axios from 'axios';

const HomeScreen: React.FC = () => {
  const [userDetail, setUserDetail] = useRecoilState<UserDetailType | null>(
    UserDetail,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get<UserDetailType>(
          // 에뮬레이터 IP
          'http://10.0.2.2:8080/api/user/detail/1',
          // local IP
          // 'http://192.168.0.68:8080/api/user/detail/1',
        );
        setUserDetail(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetail();
  }, [setUserDetail]);

  console.log('userDetail', userDetail);

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
        } catch (error) {
          console.error('위치 정보 파싱 오류:', error);
        }
      },
    );

    return () => {
      locationListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationInfo]);

  /////////////////////////
  useEffect(() => {
    // locationInfo가 변경될 때마다 실행됨
    console.log(locationInfo);
  }, [locationInfo]); // locationInfo가 변경될 때마다 콘솔 출력

  return (
    <MainView>
      <TopSection>
        <MockupImg />
        <Text style={{fontWeight: 'bold', fontSize: 20}}>
          안녕하세요, {userDetail?.name}님.
        </Text>
      </TopSection>
      <ScheduleBox isCheck={locationInfo?.isCheck} />
      <ReservationBox />
    </MainView>
  );
};

export default HomeScreen;
