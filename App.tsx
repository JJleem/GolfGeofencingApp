import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
} from 'react-native';

// 위치 정보 타입 정의
interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  bearing: number;
  provider: string;
  time: number; // timestamp가 숫자형
}

const App: React.FC = () => {
  const [locationInfo, setLocationInfo] = useState<string>(
    '현재 위치를 가져오는 중입니다...',
  );

  useEffect(() => {
    const locationEventEmitter = new NativeEventEmitter(
      NativeModules.LocationModule,
    );

    const locationListener = locationEventEmitter.addListener(
      'LocationUpdate',
      (data: string) => {
        try {
          // JSON 문자열을 파싱하여 LocationData로 변환
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
          } = parsedData;

          // time 값을 숫자형으로 변환 후, 날짜 형식으로 변환
          const formattedTime = new Date(Number(time)).toLocaleString();

          setLocationInfo(
            `위도: ${latitude}\n` +
              `경도: ${longitude}\n` +
              `정확도: ${accuracy} m\n` +
              `고도: ${altitude} m\n` +
              `속도: ${speed} m/s\n` +
              `방위각: ${bearing} 도\n` +
              `제공자: ${provider}\n` +
              `시간: ${formattedTime}`,
          );
        } catch (error) {
          console.error('위치 정보 파싱 오류:', error);
        }
      },
    );

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      locationListener.remove();
    };
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{locationInfo}</Text>
    </ScrollView>
  );
};

export default App;
