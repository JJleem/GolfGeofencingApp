import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {Text} from '../../theme/theme';
import {useNavigate} from 'react-router-native';
import {useRecoilState} from 'recoil';
import {reservationInfoState} from '../../atom/atom';
import mockupdata from '../../mock/mockupdata.json';

type isCheck = {
  isCheck?: boolean;
};

const ScheduleBox = () => {
  const [reservationInfo, setReservationInfo] =
    useRecoilState(reservationInfoState);

  const [isCheck, setIsCheck] = useState(
    mockupdata.reservationInformation.isCheck,
  );
  useEffect(() => {
    setReservationInfo(mockupdata.reservationInformation);
    setIsCheck(mockupdata.reservationInformation.isCheck);
  }, [setReservationInfo]);

  console.log('목업데이터 ', reservationInfo);

  const navigate = useNavigate();
  const goDetails = () => {
    navigate('/details');
  };

  return (
    <MiddleSection>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>예정 된 라운딩</Text>
      <MiddleSectionContainer>
        <MiddleSectionInner
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
            top: '0%', // 부모의 50% 위치
            zIndex: 3,
          }}
          onPress={() => navigate('/details')}>
          <InnerContainer>
            <MiddleSectionItem>
              <Text style={{fontWeight: 'bold', fontSize: 14, paddingTop: 4}}>
                예약 일자
              </Text>
              <MiddleText
                style={{
                  fontWeight: 'medium',
                  fontSize: 14,
                  paddingTop: 4,
                }}>
                {reservationInfo?.date}
              </MiddleText>
              <CheckIn isCheck={isCheck}>
                <CheckText
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}
                  isCheck={isCheck}>
                  {isCheck ? '체크인' : '체크인 전'}
                </CheckText>
              </CheckIn>
            </MiddleSectionItem>
            <View style={{gap: 0}}>
              <MiddleSectionItem>
                <Text style={{fontWeight: 'bold', fontSize: 14, paddingTop: 4}}>
                  코스 정보
                </Text>
                <MiddleText
                  style={{fontWeight: 'medium', fontSize: 14, paddingTop: 4}}>
                  {reservationInfo?.course}
                </MiddleText>
                <CheckIn style={{opacity: 0}}>
                  <CheckText
                    style={{
                      fontWeight: 'medium',
                      fontSize: 14,
                      color: '#c7c7c7',
                    }}>
                    내용없음
                  </CheckText>
                </CheckIn>
              </MiddleSectionItem>
              <MiddleSectionItem>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    paddingTop: 0,
                  }}>
                  락커 정보
                </Text>
                <MiddleText
                  style={{
                    fontWeight: 'medium',
                    fontSize: 14,
                    paddingTop: 0,
                  }}>
                  {reservationInfo?.locker}
                </MiddleText>
                <CheckIn style={{opacity: 0}}>
                  <CheckText
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      color: '#c7c7c7',
                    }}>
                    내용없음
                  </CheckText>
                </CheckIn>
              </MiddleSectionItem>
            </View>
          </InnerContainer>
        </MiddleSectionInner>
        <MiddleSectionInnerMock
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 7, // 0 이상의 값으로 수정
            zIndex: 2,
            top: '16%',
          }}>
          <View>
            <Text>dd</Text>
          </View>
        </MiddleSectionInnerMock>
        <MiddleSectionInnerMock
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 8, // 0 이상의 값으로 수정
            zIndex: 1,
            top: '31%',
          }}>
          <View>
            <Text>dd</Text>
          </View>
        </MiddleSectionInnerMock>
      </MiddleSectionContainer>
    </MiddleSection>
  );
};

export default ScheduleBox;

const MiddleSectionContainer = styled(View)`
  position: relative;
  width: 100%;
  height: 205px;
  margin-bottom: 41px;
`;
const MiddleSection = styled(View)`
  gap: 14px;
`;

const MiddleSectionItem = styled(View)`
  flex-direction: row;

  justify-content: space-around;
  align-items: end;
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
const MiddleSectionInnerMock = styled(View)`
  position: absolute;
  gap: 11px;
  justify-content: space-around;
  padding: 15px 26px;
  border-radius: 20px;
  background-color: #fff;
  width: 100%;
  height: 137px;
`;

const CheckIn = styled(View)<isCheck>`
  border-radius: 35px;
  justify-content: center;
  align-items: center;
`;
const CheckText = styled(Text)<isCheck>`
  border: 1px solid ${({isCheck}) => (isCheck ? '#28a745' : '#c7c7c7')};
  padding: 4px 0px;
  width: 75px;
  text-align: center;
  border-radius: 35px;
  color: ${({isCheck}) => (isCheck ? '#28a745' : '#c7c7c7')};
`;
const MiddleText = styled(Text)`
  width: 150px;
`;

const InnerContainer = styled(View)`
  width: 100%;
  flex: 1;
`;
