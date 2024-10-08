import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import {NativeRouter, Route, Link, Routes} from 'react-router-native';
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      <Link to="/details">
        <Text>상세 화면으로 이동</Text>
      </Link>
    </View>
  );
};

const Details: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>상세 화면</Text>
      <Link to="/">
        <Text>홈으로 돌아가기</Text>
      </Link>
    </View>
  );
};

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

  const Stack = createNativeStackNavigator();

  return (
    <NativeRouter>
      <Text>{locationInfo}</Text>
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </View>
    </NativeRouter>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
