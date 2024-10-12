import React, {useRef, useState} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  SafeAreaView,
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
import HomeCalendar from './HomeCalendar';
import {useRecoilState} from 'recoil';
import {DateSelected, ModalCalendar} from '../../atom/atom';
import HomeSlider from '../sliderComponent/HomeSlider';

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

  const [isClick, setIsClick] = useRecoilState(ModalCalendar);
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
  console.log(selectedDate);
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
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              {selectedDate}
            </Text>
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
            <HomeSlider />
          </SliderContainer>
          <ReservationBTN
            activeOpacity={0.1}
            onPress={() => navigate('/reservation')}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
              예약하기
            </Text>
          </ReservationBTN>
        </MiddleSectionInner>
        <Modal
          transparent={true}
          visible={isClick}
          animationType="slide"
          onRequestClose={() => {
            setIsClick(false);
          }}>
          <ModalCenterView onPress={() => setIsClick(false)}>
            <ModalView
              onTouchStart={e => {
                e.stopPropagation(); // 모달 내부 클릭 시 이벤트 전파 방지
              }}
              style={{
                zIndex: 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <HomeCalendar />
            </ModalView>
          </ModalCenterView>
        </Modal>
      </MiddleSectionContainer>
    </MiddleSection>
  );
};

export default ReservationBox;

const ModalCenterView = styled(Pressable)`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background-color: transparent;
`;
const ModalView = styled(View)`
  background-color: #fff;
  border-radius: 20px;
  width: 80%;
  height: 50%;
  justify-content: center;
  align-items: center;
`;

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

const SliderContainer = styled(View)``;
