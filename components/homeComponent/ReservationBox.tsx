import React, {useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigate} from 'react-router-native';
const ReservationBox = () => {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ]);

  const offset = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0); // 마지막 오프셋을 저장
  const boxWidth = 50; // 각 숫자의 너비
  const totalWidth = boxWidth * 12; // 전체 너비 (1부터 12까지)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20; // 드래그 시작 감지
      },
      onPanResponderMove: (evt, gestureState) => {
        // 현재 offset 값에 드래그한 거리 추가
        offset.setValue(lastOffset.current + gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // 드래그가 끝났을 때 마지막 오프셋 업데이트
        lastOffset.current += gestureState.dx;

        // 드래그가 끝까지 넘어갔는지 확인
        if (
          lastOffset.current < 0 ||
          lastOffset.current > totalWidth - boxWidth
        ) {
          // 처음으로 돌아가는 애니메이션
          Animated.timing(offset, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            lastOffset.current = 0; // 마지막 오프셋 초기화
          });
        } else {
          // 부드러운 애니메이션으로 마지막 위치로 이동
          Animated.timing(offset, {
            toValue: lastOffset.current,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const [isClick, setIsClick] = useState(false);
  return (
    <MiddleSection style={{paddingBottom: 100}}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>라운딩 예약하기</Text>
      <MiddleSectionContainer>
        <MiddleSectionInner
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
            top: '0%', // 부모의 50% 위치
            height: 189,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 9,
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>2024년 8월</Text>
            <TouchableWithoutFeedback
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}
              onPress={() => setIsClick(!isClick)}>
              <Icon
                name={isClick ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={20}
                color="#1e1e1e"
              />
            </TouchableWithoutFeedback>
          </View>
          <SliderContainer>
            <Animated.View
              style={{
                flexDirection: 'row',
                transform: [{translateX: offset}], // 드래그한 위치에서 멈춤
              }}
              {...panResponder.panHandlers}>
              {numbers.map(number => (
                <View key={number} style={styles.numberContainer}>
                  <Text style={styles.numberText}>{number}</Text>
                </View>
              ))}
            </Animated.View>
          </SliderContainer>
          <ReservationBTN
            activeOpacity={0.1}
            onPress={() => navigate('/reservation')}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
              예약하기
            </Text>
          </ReservationBTN>
        </MiddleSectionInner>
      </MiddleSectionContainer>
    </MiddleSection>
  );
};

export default ReservationBox;

const MiddleSectionContainer = styled(View)`
  position: relative;
  width: 100%;
  height: 205px;
  margin-bottom: 41px;
`;
const MiddleSection = styled(View)`
  gap: 14px;
`;

const MiddleSectionInner = styled(Pressable)`
  position: absolute;
  gap: 11px;
  justify-content: space-around;
  padding: 15px 26px;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  height: 137px;
`;

const ReservationBTN = styled(TouchableOpacity)`
  border-radius: 15px;

  background-color: #6d7582;
  width: 100%;

  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const SliderContainer = styled(View)`
  flex: 1;
  overflow: hidden;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  numberText: {
    fontSize: 20,
  },
});
