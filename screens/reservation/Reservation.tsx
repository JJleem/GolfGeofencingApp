import React, {useState} from 'react';
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../../theme/theme';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRecoilState} from 'recoil';
import {DateSelected, userReservation} from '../../atom/atom';
import mockupdata from '../../mock/mockupdata.json';
import HomeCalendar from '../../components/homeComponent/HomeCalendar';
import {useNavigate} from 'react-router-native';
import {UserReservationType} from '../../interface/interface';
const Reservation = () => {
  const [selectedDate, setSelectedDate] = useRecoilState(DateSelected);
  const [selectedTime, setSelectedTime] = useState('');
  const [ischangeDate, setIsChangeDate] = useState(false);
  const [reservationData, setReservationData] = useRecoilState(userReservation);
  const [memberNum, setMemberNum] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [isCourse, setIsCourse] = useState(false);
  const [selectCourse, setSelectCourse] = useState('');
  const navigate = useNavigate();
  console.log(reservationData);
  const handleNumberPlus = () => {
    if (memberNum < 4) {
      setMemberNum(memberNum + 1);
    }
  };

  const handleNumberMinus = () => {
    if (memberNum > 0) {
      setMemberNum(memberNum - 1);
    }
  };
  const handleTimePress = (time: string) => {
    setSelectedTime(time); // 선택된 시간 업데이트
  };
  const handleSelectCourse = (item: string) => {
    setSelectCourse(item);
    setIsCourse(false);
  };
  const handleReservationArray = ({
    date,
    course_info,
    tee_info,
    memberNum,
  }: UserReservationType) => {
    setIsClick(!isClick);
    setReservationData({
      date: date,
      course_info: course_info,
      tee_info: tee_info,
      memberNum: memberNum,
    });
  };
  console.log(selectedTime);
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
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              예약할 날짜 : {selectedDate}
            </Text>
            <TouchableOpacity onPress={() => setIsChangeDate(true)}>
              <Icon
                name={isCourse ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={20}
                color="#1e1e1e"
              />
            </TouchableOpacity>
            <Modal
              transparent={true}
              visible={ischangeDate}
              animationType="slide"
              onRequestClose={() => {
                setIsChangeDate(!ischangeDate);
              }}>
              <ModalCenterView onPress={() => setIsChangeDate(!ischangeDate)}>
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
            <TeeTimeInnerView style={{gap: 16}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>티타임</Text>
              <TeeTimeView>
                {mockupdata.reservationInformation.tee_info.map(
                  (time, index) => (
                    <TimePress
                      key={index}
                      onPress={() => handleTimePress(time)}
                      style={{
                        backgroundColor:
                          selectedTime === time ? '#8d8d8d' : 'transparent',
                      }}>
                      <Text
                        style={{
                          color: selectedTime === time ? '#fff' : '#8b8b8b',
                        }}>
                        {time.slice(14, 20)}
                      </Text>
                    </TimePress>
                  ),
                )}
              </TeeTimeView>
            </TeeTimeInnerView>
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
              <Text style={{fontWeight: 'bold', fontSize: 16}}>코스선택</Text>
            </View>
            <SectionItemComp>
              <MemberView>
                <Text
                  style={{
                    width: 250,

                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {selectCourse}
                </Text>
              </MemberView>
              <CourseDropDown
                onPress={() => setIsCourse(!isCourse)}
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  alignItems: 'center',
                }}>
                <Icon
                  name={
                    isCourse ? 'chevron-up-outline' : 'chevron-down-outline'
                  }
                  size={20}
                  color="#1e1e1e"
                />
                {isCourse && (
                  <Modal
                    transparent={true}
                    visible={isCourse}
                    animationType="slide"
                    onRequestClose={() => {
                      setIsCourse(false);
                    }}>
                    <ModalCenterView onPress={() => setIsCourse(false)}>
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
                          paddingTop: 0,
                        }}>
                        <CourseDropDownItem>
                          <CourseTitle>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: '#000',
                              }}>
                              코스를 선택해주세요.
                            </Text>
                          </CourseTitle>
                          {mockupdata.reservationInformation.course_info.map(
                            (item, index) => (
                              <CourseItem
                                style={({pressed}) => [
                                  {
                                    backgroundColor: pressed
                                      ? '#d9d9d9'
                                      : 'transparent',
                                    color: pressed ? '#8a8a8a' : 'transparent',
                                  },
                                ]}
                                key={index}
                                onPress={() => handleSelectCourse(item)}>
                                <Text>{item}</Text>
                              </CourseItem>
                            ),
                          )}
                        </CourseDropDownItem>
                        <ReservationBTN
                          activeOpacity={0.1}
                          onPress={() => setIsCourse(!isCourse)}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: '#fff',
                            }}>
                            확인
                          </Text>
                        </ReservationBTN>
                      </ModalView>
                    </ModalCenterView>
                  </Modal>
                )}
              </CourseDropDown>
            </SectionItemComp>
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
              <Text style={{fontWeight: 'bold', fontSize: 16}}>예약 인원</Text>
            </View>
            <SectionItemComp>
              <TouchableOpacity
                onPress={handleNumberMinus}
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
                  {memberNum} 인
                </Text>
              </MemberView>
              <TouchableOpacity
                onPress={handleNumberPlus}
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

        <ReservationBTN
          activeOpacity={0.1}
          onPress={() =>
            handleReservationArray({
              date: selectedDate,
              course_info: selectCourse,
              tee_info: selectedTime,
              memberNum: memberNum,
              isCheck: false,
            })
          }>
          <Text style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
            예약하기
          </Text>
        </ReservationBTN>

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
              {selectedTime && memberNum !== 0 && selectCourse !== '' ? (
                <>
                  <Text>예약완료</Text>
                  <Text>
                    {selectedDate} , {selectedTime}
                  </Text>
                  <Text>코스명 : {selectCourse}</Text>
                  <Text>예약이 완료되었습니다.</Text>
                  <ReservationBTN
                    activeOpacity={0.1}
                    onPress={() => navigate('/')}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                      확인
                    </Text>
                  </ReservationBTN>
                </>
              ) : (
                <>
                  <AlarmView>
                    {!selectedTime && <Text>티타임을 선택해주세요.</Text>}
                    {memberNum === 0 && (
                      <Text>인원을 선택해주세요.(1명이상)</Text>
                    )}
                    {selectCourse === '' && <Text>코스를 선택해주세요.</Text>}
                  </AlarmView>
                  <ReservationBTN
                    activeOpacity={0.1}
                    onPress={() => setIsClick(false)}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 14, color: '#fff'}}>
                      확인
                    </Text>
                  </ReservationBTN>
                </>
              )}
            </ModalView>
          </ModalCenterView>
        </Modal>
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
  justify-content: center;
  align-items: center;
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
  width: 100%;
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
  width: 50px;
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

const TeeTimeView = styled(View)`
  flex-direction: row;

  width: 100%;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;
const TimePress = styled(Pressable)`
  justify-content: center;
  align-items: center;
  border: 1px solid #8b8b8b;
  white-space: nowrap;

  padding: 4px 8px;
  border-radius: 10px;
`;
const TeeTimeInnerView = styled(View)`
  width: 100%;
`;

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
  padding: 30px 0px;
  justify-content: space-around;
  align-items: center;
`;
export const ReservationBTN = styled(TouchableOpacity)`
  border-radius: 15px;
  margin-top: 40px;
  background-color: #6d7582;
  width: 90%;

  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const AlarmView = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 8px;
`;
const CourseDropDown = styled(TouchableOpacity)``;
const CourseDropDownItem = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const CourseTitle = styled(View)`
  width: 100%;
  padding: 20px;
  border-bottom-color: #9a9a9a;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding-left: 16px;
`;
const CourseItem = styled(Pressable)`
  padding: 10px;
  border-bottom-color: #9a9a9a;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
