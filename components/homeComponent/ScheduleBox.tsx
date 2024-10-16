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
import {
  GetReservationInfo,
  reservationInfoState,
  userReservation,
} from '../../atom/atom';
import mockupdata from '../../mock/mockupdata.json';
import {
  CheckIn,
  CheckText,
  InnerContainer,
  MiddleSection,
  MiddleSectionContainer,
  MiddleSectionInner,
  MiddleSectionInnerMock,
  MiddleSectionItem,
  MiddleText,
} from './HomeScreenStyle';
import axios from 'axios';
import {
  GetReservationResponse,
  GetReservationType,
} from '../../interface/interface';

const ScheduleBox = ({isCheck}: any) => {
  const [getReservationInfo, setGetReservationInfo] =
    useRecoilState(GetReservationInfo);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGetReservation = async () => {
      try {
        const response = await axios.get<GetReservationResponse>(
          // 에뮬레이터 IP
          'http://10.0.2.2:8080/api/reservations/kim01',
          // local IP
          // 'http://192.168.0.68:8080/api/reservations/kim01',
        );
        console.log('response', response.data);
        const lastReservation = response.data[response.data.length - 1];
        setGetReservationInfo(lastReservation);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGetReservation();
  }, [setGetReservationInfo]);

  console.log('getData', getReservationInfo);

  const [reservationData, setReservationData] = useRecoilState(userReservation);

  const navigate = useNavigate();

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
          {getReservationInfo?.course_info &&
          getReservationInfo?.persons &&
          getReservationInfo?.date ? (
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
                  {getReservationInfo?.date}
                </MiddleText>
                <CheckIn isCheck={reservationData?.isCheck}>
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
                  <Text
                    style={{fontWeight: 'bold', fontSize: 14, paddingTop: 4}}>
                    코스 정보
                  </Text>
                  <MiddleText
                    style={{fontWeight: 'medium', fontSize: 14, paddingTop: 4}}>
                    {getReservationInfo?.course_info}
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

                  <>
                    <MiddleText
                      style={{
                        fontWeight: 'medium',
                        fontSize: 14,
                        paddingTop: 0,
                      }}>
                      {isCheck ? getReservationInfo?.locker_info : '미배정'}
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
                  </>
                </MiddleSectionItem>
              </View>
            </InnerContainer>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text>예정 된 라운딩이 없습니다.</Text>
              <Text>라운딩 예약 하시겠습니까?</Text>
            </View>
          )}
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
