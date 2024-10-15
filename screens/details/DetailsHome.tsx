import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Link, useNavigate} from 'react-router-native';
import {ReservationBTN} from '../../components/homeComponent/HomeScreenStyle';
import {
  MainView,
  SectionItemBox,
  SectionItemInner,
  SectionView,
  TitleHeader,
} from '../../components/reservationComponent/ReservationStyle';
import styled from 'styled-components/native';
import {useRecoilState} from 'recoil';
import {userReservation} from '../../atom/atom';

const DetailsHome = () => {
  const [reservationData, setReservationData] = useRecoilState(userReservation);
  const navigate = useNavigate();
  console.log(reservationData);
  return (
    <MainView style={{paddingBottom: 120, paddingTop: 34}}>
      <TitleHeader>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>라운딩 예약하기</Text>
      </TitleHeader>
      <SectionView>
        {reservationData === null ? (
          <SectionItemBox
            style={{
              width: '100%',
              height: '80%',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 5,
            }}>
            <ReservationView>
              <ReservationInnerView>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  예정된 라운딩이 없습니다.
                </Text>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  라운딩을 예약 하시겠습니까?
                </Text>
              </ReservationInnerView>
              <ReservationBTN
                activeOpacity={0.1}
                onPress={() => navigate('/reservation')}>
                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                  예약하기
                </Text>
              </ReservationBTN>
            </ReservationView>
          </SectionItemBox>
        ) : (
          <View>
            <Text>hi</Text>
          </View>
        )}
      </SectionView>
    </MainView>
  );
};

export default DetailsHome;

const ReservationView = styled(View)`
  width: 100%;
  height: 90%;
  gap: 50px;
  padding: 20px 0px;
  justify-content: space-between;
`;

const ReservationInnerView = styled(View)`
  width: 100%;
  height: 80%;

  justify-content: center;
  align-items: center;
`;
