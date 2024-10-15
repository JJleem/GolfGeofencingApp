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
import {
  MiddleSection,
  MiddleSectionContainer,
  MiddleSectionInner,
  ModalCenterView,
  ModalView,
  ReservationBTN,
  SliderContainer,
} from './HomeScreenStyle';

const ReservationBox = () => {
  const navigate = useNavigate();

  const [isClick, setIsClick] = useRecoilState(ModalCalendar);
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
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
