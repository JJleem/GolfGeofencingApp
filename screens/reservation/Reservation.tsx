import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from '../../theme/theme';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Reservation = () => {
  return (
    <MainView>
      <TitleHeader>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>라운딩 예약하기</Text>
      </TitleHeader>
      <SectionView>
        <SectionItemBox
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
          }}>
          <SectionItemInner>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>2024년 8월</Text>
            <CheckIn>
              <CheckText
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                }}>
                다음달
              </CheckText>
            </CheckIn>
          </SectionItemInner>
        </SectionItemBox>
        <SectionItemBox
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
          }}>
          <SectionItemInner>
            <View style={{gap: 8}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>티타임</Text>
            </View>
          </SectionItemInner>
        </SectionItemBox>
        <SectionItemBox
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 5, // 0 이상의 값으로 수정
            marginBottom: 101,
          }}>
          <SectionItemInner>
            <View style={{gap: 8}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>예약 인원</Text>
            </View>
            <SectionItemComp>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  alignItems: 'center',
                }}>
                <Icon name="remove-circle-outline" size={24} color="#7d7d7d" />
              </TouchableOpacity>
              <MemberView>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    letterSpacing: -2,
                  }}>
                  0 인
                </Text>
              </MemberView>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  alignItems: 'center',
                }}>
                <Icon name="add-circle-outline" size={24} color="#7d7d7d" />
              </TouchableOpacity>
            </SectionItemComp>
          </SectionItemInner>
        </SectionItemBox>
      </SectionView>
    </MainView>
  );
};

export default Reservation;
const MainView = styled(ScrollView)`
  align-content: center;
  background-color: #f2f4f6;
  height: 100%;
  flex: 1;
  position: relative;
`;
const TitleHeader = styled(View)`
  justify-content: center;
  height: 72px;
  align-items: center;
  margin-bottom: 101px;
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
`;
const SectionView = styled(View)`
  margin-top: 103px;
  padding: 0px 16px;
  gap: 12px;
`;
const SectionItemBox = styled(View)`
  padding: 32px 21px;
  background: #fff;
  border-radius: 20px;
  gap: 40px;
`;
const SectionItemInner = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SectionItemComp = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 14px;
  justify-content: center;
`;
const MemberView = styled(View)`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 26px;
`;
const CheckIn = styled(TouchableOpacity)`
  border-radius: 35px;
  justify-content: center;
  align-items: center;
`;
const CheckText = styled(Text)`
  border: 1px solid #c7c7c7;
  padding: 4px 0px;
  width: 75px;
  text-align: center;
  border-radius: 35px;
  color: #c7c7c7;
`;
